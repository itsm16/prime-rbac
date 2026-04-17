# RBC API Routes Documentation

## Base URL
https://prime-rbac.vercel.app/

### Role-Based Access Control (RBAC)

### Scalability
- Microservice architecture: Each module (auth, jobs) operates as an independent service with its own validation and error handling

---
## Authentication Routes (`/api/auth`)

### User Roles
- **user**: Can view jobs and apply for jobs
- **admin**: Can perform all user actions plus create, update, and delete jobs

### Authentication
- All protected routes require a valid JWT token in the Authorization header
- Format: `Authorization: Bearer <token>`
- Admin routes additionally require the user to have "admin" role

## Middleware
- `checkToken`: Validates JWT token
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
  - Response: User object with token

- `POST /api/auth/login`
  - Description: Login user
  - Body: LoginDto (email, password)
  - Response: User object with token

- `POST /api/auth/logout`
  - Description: Logout user
  - Response: Success message

### Protected Routes
- `GET /api/auth/me`
  - Description: Get current user information
  - Headers: Authorization Bearer token
  - Response: User object

## Jobs Routes (`/api/jobs`)

### User Routes (Authenticated)
- `GET /api/jobs/all`
  - Description: Get all jobs
  - Headers: Authorization Bearer token
  - Response: Array of jobs

- `GET /api/jobs/:id`
  - Description: Get job by ID
  - Headers: Authorization Bearer token
  - Response: Job object

- `POST /api/jobs/apply/:id`
  - Description: Apply for a job
  - Headers: Authorization Bearer token
  - Body: ApplyJobDto
  - Response: Application confirmation

### Admin Routes (Admin Role Required)
- `POST /api/jobs/create`
  - Description: Create a new job
  - Headers: Authorization Bearer token
  - Body: CreateJobDto
  - Response: Created job object

- `PUT /api/jobs/update/:id`
  - Description: Update a job
  - Headers: Authorization Bearer token
  - Body: CreateJobDto
  - Response: Updated job object

- `DELETE /api/jobs/delete/:id`
  - Description: Delete a job
  - Headers: Authorization Bearer token
  - Response: Success message

## Health Check
- `GET /health`
  - Description: Check API health status
  - Response: { message: "runs" }

---


