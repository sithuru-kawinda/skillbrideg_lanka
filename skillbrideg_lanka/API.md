# SkillBridge Lanka — API Reference

Four independent Spring Boot microservices, no API gateway. The frontend calls each
service directly by port. This document reflects the actual current behavior of the
code (not the original design intent) — see the "Known limitations" note per service
where behavior is intentionally stubbed or incomplete.

| Service | Base URL | Database |
|---|---|---|
| Authentication-Service | `http://localhost:8082/api/auth` | `skillbridgelankaauth` (MySQL, Flyway-managed) |
| Recruiter-Service | `http://localhost:8081/api/recruiters` | none (stub/demo, no persistence) |
| Job-Service | `http://localhost:8083/job` | `JobService` (MySQL, Flyway-managed) |
| SeekerService | `http://localhost:8086/seekers` | `seekerservice` (MySQL, Flyway-managed) |

## Success response convention

Every success response across all four services now includes a `message`
field describing what happened, alongside whatever data the endpoint returns
(e.g. `{"message": "Job created successfully", "job": {...}}`). This makes it
obvious in Postman (or any client) that a call succeeded, without having to
infer it from the HTTP status code alone. Error responses are unaffected — see
"Error response shapes" at the bottom; they still vary by service.

## Authentication

Authentication-Service issues JWTs. All other services (except Recruiter-Service,
which has no auth enforcement at all) validate the same token via a shared
`jwt.secret`. Send it as:

```
Authorization: Bearer <token>
```

JWT claims: `sub` (email), `role` (array, e.g. `["ROLE_SEEKER"]`), `id` (the numeric
Authentication-Service user id), `iat`, `exp` (24h from issue).

Only **Job-Service's `POST /job/create`** actually enforces a role
(`hasRole("RECRUITER")`). Every other protected-looking endpoint across all
services is currently `permitAll()` — the JWT filters run and populate
`SecurityContext` when a valid token is present, but nothing else *requires* it
except that one endpoint.

---

## Authentication-Service (`:8082/api/auth`)

| Method | Path | Auth | Body | Success | Errors |
|---|---|---|---|---|---|
| GET | `/test` | none | — | `200` plain text | — |
| GET | `/health` | none | — | `200` plain text | — |
| POST | `/register` | none | `RegisterRequest` | `200` — `{message, authId}` | `400` validation failure · `409` email already taken · `500` unexpected |
| POST | `/login` | none | `LoginRequest` | `200` — `TokenResponse` | `400` validation failure · `401` bad credentials · `500` unexpected |

**RegisterRequest**
```json
{ "email": "user@example.com", "password": "min 6 chars", "role": "SEEKER | RECRUITER" }
```

**LoginRequest**
```json
{ "email": "user@example.com", "password": "..." }
```

**Register response**
```json
{ "message": "User registered successfully", "authId": 42 }
```

**TokenResponse** (login response body)
```json
{ "message": "Login successful", "token": "<jwt>", "role": "SEEKER", "id": 42 }
```

Error responses are plain strings, e.g. `"Error: Email already taken"` (register)
or `"Error: Invalid email or password"` (login), not JSON objects.

Emails are trimmed and lower-cased server-side before lookup/storage.

---

## Recruiter-Service (`:8081/api/recruiters`)

**Known limitation:** this service is a stub/demo. `spring.autoconfigure.exclude`
disables its datasource — nothing it does ever persists. It does **not** call
Authentication-Service; a recruiter's real account is created separately by the
frontend calling Authentication-Service directly. There is no security
enforcement on this service at all (any request is `permitAll`, whether or not a
token is sent).

| Method | Path | Body | Response |
|---|---|---|---|
| GET | `/health` | — | `200` — `{status, service, timestamp}` |
| GET | `/test` | — | `200` — `{message, timestamp}` |
| POST | `/register` | arbitrary JSON object (frontend sends `companyName`, `companyEmail`, `location`, `registrationNumber`, `phoneNumber`, `password`) | `201` — echoes back the fields it recognizes + `{status, message}`. **Nothing is persisted** — a second `GET /{id}` will not find this recruiter. |
| GET | `/` | — | `200` — `{recruiters: [], count: 0, message: "No recruiters in demo mode"}` (always empty) |
| GET | `/{id}` | — | `404` — `{error, message}`. There is nothing to look up (no persistence), so this is always a miss. Job-Service's `/job/withRecruiter/{id}` relies on this to report `recruiterAvailable: false`. |
| any other path | — | `200` — `{message: "Recruiter Service is RUNNING", ...}` (catch-all) |

---

## Job-Service (`:8083/job`)

| Method | Path | Auth | Body / Params | Success | Errors |
|---|---|---|---|---|---|
| POST | `/create` | **Bearer token, role `RECRUITER` required** | `JobDTO` | `201` — `{message, job}` | `400` validation / bad data |
| GET | `/{level}` | none | path param, case-insensitive | `200` — `{message, count, jobs}` |
| GET | `/byall` | none | query params `jobnames` (list), `levels` (list), both optional, case-insensitive | `200` — `{message, count, jobs}` |
| GET | `/all` | none | — | `200` — `{message, count, jobs}` (unfiltered) |
| GET | `/withRecruiter/{id}` | none | path param = job id | `200` — see below | `404` if job id doesn't exist |

**JobDTO**
```json
{
  "jobId": 1,
  "jobName": "Software Engineer",
  "jobDescription": "...",
  "jobStatus": "OPEN | CLOSED | DRAFT",
  "level": "JUNIOR | MID | SENIOR | LEAD | MANAGER",
  "durationinmonths": 12,
  "salary": 150000,
  "recruiterID": 42
}
```
All fields except `jobId` are required on create (`400` if missing/blank).
`recruiterID` should be the Authentication-Service user id of the logged-in
recruiter (see JWT `id` claim above) — it is **not** validated against
Recruiter-Service, since Recruiter-Service doesn't persist recruiters anyway.

**`GET /withRecruiter/{id}` response**
```json
{
  "message": "Job retrieved successfully",
  "job": { "...JobDTO fields..." },
  "recruiter": null,
  "recruiterAvailable": false
}
```
`recruiterAvailable` is `false` and `recruiter` is `null` whenever
Recruiter-Service can't return real data for that id — which today is
**always**, since Recruiter-Service has no persistence (see above). `/all` and
`/byall` do **not** enrich jobs with recruiter info at all; only this endpoint
attempts it.

---

## SeekerService (`:8086/seekers`)

| Method | Path | Body | Success | Errors |
|---|---|---|---|---|
| GET | `/test` | — | `200` plain text | — |
| GET | `/health` | — | `200` plain text | — |
| POST | `/register` | `SeekerDTO` | `201` — `{message, seeker}` | `400` validation · `409` duplicate email/NIC · `503` Authentication-Service unavailable · `500` unexpected |
| GET | `/` | — | `200` — `{message, count, seekers}` |
| GET | `/{id}` | — | `200` — `{message, seeker}` | `404` not found |
| GET | `/authId/{authId}` | — | `200` — `{message, seeker}` | `404` not found |
| GET | `/email/{email}` | — | `200` — `{message, seeker}` | `404` not found |
| PUT | `/{id}` | partial `SeekerDTO` (only non-null fields are applied) | `200` — `{message, seeker}` | `404` not found · `409` update collides with another seeker's email/NIC |
| DELETE | `/{id}` | — | `200` — `{message}` | `404` not found |

**SeekerDTO**
```json
{
  "id": 1,
  "fullName": "Jane Doe",
  "authID": 42,
  "email": "jane@example.com",
  "nic": "200012345678",
  "password": "min 6 chars, write-only — never returned",
  "phoneNumber": "0771234567",
  "qualification": "BACHELORS"
}
```

**`POST /register` response**
```json
{ "message": "Seeker registered successfully", "seeker": { "...SeekerDTO fields..." } }
```

`POST /register` internally calls Authentication-Service's `/api/auth/register`
to create the login account, then saves the seeker profile with the returned
`authID`. Email/NIC uniqueness is checked locally **before** calling
Authentication-Service, so a duplicate never leaves an orphaned auth account —
but a genuine race between two concurrent requests still can (there is no
cross-service rollback endpoint).

---

## Error response shapes (inconsistent across services — by design of the
existing codebase, not a documentation simplification)

- Authentication-Service: plain string bodies, e.g. `"Error: <message>"`.
- SeekerService: plain string bodies, e.g. `"Error: <message>"`.
- Job-Service: JSON object, e.g. `{"error": "<message>"}`.
- Recruiter-Service: JSON object, e.g. `{"error": "...", "message": "..."}`.

A frontend client should not assume a single error envelope shape across services.
