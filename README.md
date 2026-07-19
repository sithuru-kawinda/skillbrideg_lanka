# SkillBridge Lanka

A job portal platform connecting job seekers and recruiters, built with a Spring Boot microservices backend and a React frontend.

## Architecture

The backend is split into four independent Spring Boot microservices, each with its own database:

| Service | Port | Responsibility | Database |
|---|---|---|---|
| Authentication-Service | 8082 | User registration/login, JWT issuance | `skillbridgelankaauth` (MySQL) |
| Recruiter-Service | 8081 | Recruiter registration and profiles | none (auto-config excluded) |
| Job-Service | 8083 | Job postings, listing by level/recruiter | `JobService` (MySQL) |
| SeekerService | 8086 | Job seeker registration and profiles | `seekerservice` (MySQL) |

The frontend is a Create React App single-page app that talks to these services over REST.

## Tech Stack

**Backend**
- Java 17 (Authentication-Service) / Java 8 (other services)
- Spring Boot 3.2.0 (Authentication-Service) / Spring Boot 2.7.18 (other services)
- Spring Web, Spring Data JPA, Spring Security
- MySQL
- JWT (`jjwt`) for authentication
- Lombok
- Maven

**Frontend**
- React 18
- React Router
- Axios

## Prerequisites

- JDK 17 and JDK 8 (or align all services to one JDK version)
- Maven (or use the included `mvnw` wrapper)
- MySQL running locally on port 3306
- Node.js and npm

## Getting Started

### 1. Set up databases

Create the following MySQL databases before starting the services:

```sql
CREATE DATABASE skillbridgelankaauth;
CREATE DATABASE JobService;
CREATE DATABASE seekerservice;
```

Update the `spring.datasource.username` / `spring.datasource.password` values in each service's `src/main/resources/application.properties` to match your local MySQL credentials.

### 2. Run the backend services

Each service is run independently. From each service directory:

```bash
cd backend/Authentication-Service
./mvnw spring-boot:run
```

Repeat for `Recruiter-Service`, `Job-Service`, and `SeekerService`. Start all four before using the frontend.

### 3. Run the frontend

```bash
cd frontend
npm install
npm start
```

The app will be available at `http://localhost:3000`.

## API Overview

**Authentication-Service** (`/api/auth`)
- `POST /register` — register a new user
- `POST /login` — authenticate and receive a JWT
- `GET /health`, `GET /test` — service health checks

**Recruiter-Service** (`/api/recruiters`)
- `POST /register` — register a recruiter
- `GET /` — list recruiters
- `GET /health`, `GET /test` — service health checks

**Job-Service** (`/job`)
- `POST /create` — create a job posting
- `GET /all` — list all jobs
- `GET /byall` — list jobs with filters
- `GET /{level}` — list jobs by experience level
- `GET /withRecruiter/{id}` — list jobs for a given recruiter

**SeekerService** (`/seekers`)
- `POST /register` — register a job seeker
- `GET /health`, `GET /test` — service health checks

## Project Structure

```
skillbrideg_lanka/
├── backend/
│   ├── Authentication-Service/
│   ├── Job-Service/
│   ├── Recruiter-Service/
│   └── SeekerService/
└── frontend/
    ├── public/
    └── src/
        ├── components/
        ├── context/
        ├── pages/
        ├── services/
        └── utils/
```
