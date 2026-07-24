# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository layout

The actual project lives in the nested `skillbrideg_lanka/` directory (this repo has a duplicated top-level folder name):

```
skillbrideg_lanka/          <- git root
└── skillbrideg_lanka/      <- project root
    ├── backend/
    │   ├── Authentication-Service/
    │   ├── Job-Service/
    │   ├── Recruiter-Service/
    │   └── SeekerService/
    └── frontend/
```

SkillBridge Lanka is a job portal connecting job seekers and recruiters: four independent Spring Boot microservices behind a single React SPA (no API gateway — the frontend calls each service directly by port).

## Services and ports

| Service | Path | Port | DB | Notes |
|---|---|---|---|---|
| Authentication-Service | `backend/Authentication-Service` | 8082 | `skillbridgelankaauth` (MySQL) | Java 17, Spring Boot 3.2.0. Issues JWTs. |
| Recruiter-Service | `backend/Recruiter-Service` | 8081 | none | **Stub/demo mode** — `spring.autoconfigure.exclude` disables the datasource; `RecruiterController` holds an in-memory `AtomicLong` id counter, `/register` echoes back the request body without persisting anything, and `GET /api/recruiters` always returns an empty list. Don't assume recruiter data actually persists. |
| Job-Service | `backend/Job-Service` | 8083 | `JobService` (MySQL) | Java 8, Spring Boot 2.7.18. |
| SeekerService | `backend/SeekerService` | 8086 | `seekerservice` (MySQL) | Java 8, Spring Boot 2.7.18. |

Each service follows the same package layout: `Controller` / `DTO` / `Entity` / `Repo` / `Service` + `ServiceImpl` / `Security` (JWT filter, `JWTUtil`, `SecurityConfig`) / `Config` (`CorsConfig`). Note `SeekerService`'s implementation package is inconsistently cased (`Service/Impl/impl.java`, class name `impl`).

## Cross-service orchestration (no message broker — synchronous REST calls)

- **Registration**: the frontend posts directly to `SeekerService`/`Recruiter-Service` `/register`, not to `Authentication-Service`. `SeekerService.impl.createSeeker()` (`backend/SeekerService/.../Service/Impl/impl.java`) calls `Authentication-Service` at `http://localhost:8082/api/auth/register` via a hardcoded-URL `RestTemplate` to obtain an `authId`, then saves the seeker profile with that id. `Recruiter-Service` does **not** call Authentication-Service — it fakes an `authid` locally since it has no real persistence.
- **Job listing enrichment**: `Job-Service`'s `JobController` calls `Recruiter-Service` at `http://localhost:8081/api/recruiters/{id}` (hardcoded URL, `RestTemplate`) to attach recruiter info to job results.
- All inter-service URLs are hardcoded `http://localhost:<port>/...` strings — there's no service discovery or config-driven base URL. When changing a port, grep for it across every service and the frontend's `src/utils/constants.js`.
- **JWT secret mismatch**: Authentication-Service, Job-Service, and Recruiter-Service share the same `jwt.secret` in their `application.properties`. `SeekerService` has a **different** `jwt.secret`. Keep this in mind when debugging cross-service token verification.

## Frontend architecture (`frontend/`)

Create React App (react-scripts 5, React 18, React Router 6, Axios). No test files exist despite `react-scripts test` being wired up.

- `src/utils/constants.js` — hardcoded `API_ENDPOINTS` map with full `http://localhost:<port>/...` URLs per service. This is the source of truth for backend URLs from the frontend side.
- `src/services/*.js` — one file per backend service (`authService`, `jobService`, `recruiterService`, `seekerService`). **Inconsistent pattern**: `src/services/api.js` defines a shared Axios instance with request/response interceptors (auth header injection, service health tracking, error normalization), but most of the per-service files (e.g. `seekerService.js`) create their **own** independent `axios.create()` instance instead of reusing `api.js`. Some pages (e.g. `SeekerSignup.js`) bypass the service layer entirely and call `fetch()` directly against a hardcoded URL. Don't assume the shared interceptor logic in `api.js` runs for a given request — check which client is actually used.
- `src/context/AuthContext.js` — holds `user`/`token` state, persists the JWT to `localStorage` under `token`. Login/register responses are shape-sniffed (`response.token` vs `response.data.token`) since backend response shapes aren't fully consistent across services.
- Registration flow mixes real backend calls with `localStorage`-based demo data (`demoUser`, `demoSeekers` keys) — see `src/pages/SeekerSignup.js` for the pattern: register against `SeekerService`, fall back to registering against Authentication-Service if no `authId` came back, then stash a demo profile in `localStorage` regardless.
- `src/components/Common/ProtectedRoute.js` gates `/post-job` and `/profile` on `AuthContext`'s `isAuthenticated`.
- `App.js` currently renders `TestConnection` (a diagnostic component hitting all four services) unconditionally on every page — marked `// Temporary` in the source.

## Common commands

### Frontend (`frontend/`)
```bash
npm install
npm start          # dev server at http://localhost:3000
npm run build
npm test            # interactive watch mode (react-scripts) — no tests currently exist
```

### Backend (each service directory, run independently)
```bash
cd backend/<Service-Name>
./mvnw spring-boot:run     # or mvnw.cmd on Windows
./mvnw clean package
./mvnw test
./mvnw test -Dtest=ClassName#methodName   # single test
```
All four services must be running simultaneously (ports 8081–8083, 8086) for the frontend to work end-to-end. MySQL must be running on `localhost:3306` first, with the `skillbridgelankaauth`, `JobService`, and `seekerservice` databases created (`Recruiter-Service` needs no database). Each service's DB credentials live in its own `src/main/resources/application.properties`; `spring.jpa.hibernate.ddl-auto=update` means schema is auto-managed, no migration tool is used.

## API surface

- **Authentication-Service** (`/api/auth`): `POST /register`, `POST /login`, `GET /health`, `GET /test`
- **Recruiter-Service** (`/api/recruiters`): `POST /register` (non-persistent), `GET /` (always empty), `GET /health`, `GET /test`
- **Job-Service** (`/job`): `POST /create`, `GET /all`, `GET /byall`, `GET /{level}`, `GET /withRecruiter/{id}`
- **SeekerService** (`/seekers`): `POST /register` (orchestrates Authentication-Service call), `GET /health`, `GET /test`
