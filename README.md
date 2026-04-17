# RBAC API Routes Documentation

### Video demo
https://drive.google.com/file/d/17iQUsZMChS4ZQGZ20ADDPtNyBhYyCV2W/view?usp=sharing

### Base URL
https://prime-rbac.vercel.app/

### live frontend - complete app
https://prime-client-chi.vercel.app/


---

### Role-Based Access Control (RBAC)

### Scalability
- Microservice architecture: Each module (auth, jobs) operates as an independent service with its own validation and error handling

---
## Authentication Routes (`/api/auth`)

### User Roles
- **user**: Can view jobs and apply for jobs
- **admin**: Can perform all user actions plus create, update, and delete jobs

### Authentication
- All protected routes require valid authentication
- Authentication is cookie-based using JWT
- User role is extracted from token
- Admin routes additionally require the user to have "admin" role

## Middleware
- `checkToken`: Validates authentication cookies
- `checkRole`: Validates user role (admin-only routes)
- `validate`: Validates request body against DTO schemas

## Error Handling
- All routes return standardized error responses
- Validation errors return 400 status
- Authentication errors return 401 status
- Authorization errors return 403 status
- Microservice architecture: Each module (auth, jobs) operates as an independent service with its own validation and error handling

---

### Public Routes
- `POST /api/auth/register`
  - Description: Register a new user
  - Body: RegisterDto (email, password, name, role)

- `POST /api/auth/login`
  - Description: Login user
  - Body: LoginDto (email, password)

- `POST /api/auth/logout`
  - Description: Logout user

## Jobs Routes (`/api/jobs`)

### User Routes (Authenticated)
- `GET /api/jobs/all`
  - Description: Get all jobs

- `GET /api/jobs/:id`
  - Description: Get job by ID

- `POST /api/jobs/apply/:id`
  - Description: Apply for a job
  - Body: ApplyJobDto

### Admin Routes (Admin Role Required)
- `POST /api/jobs/create`
  - Description: Create a new job
  - Body: CreateJobDto

- `PUT /api/jobs/update/:id`
  - Description: Update a job
  - Body: CreateJobDto

- `DELETE /api/jobs/delete/:id`
  - Description: Delete a job

## Health Check
- `GET /health`
  - Description: Check API health status

---


