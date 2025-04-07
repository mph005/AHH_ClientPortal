# Massage Therapy Client Portal - Technical Specifications

## 1. Development Environment

### 1.1 Local Development Setup
- **Operating System**: Windows 10/11
- **IDE**: Visual Studio Code with recommended extensions
- **Version Control**: Git with GitHub
- **Package Manager**: npm
- **Node.js Version**: 20.x LTS
- **Database**: MySQL 8.0
- **Container Platform**: Docker Desktop for Windows

### 1.2 Required Development Tools
- Node.js and npm
- MySQL Workbench or similar GUI
- Postman for API testing
- Git client
- Docker and Docker Compose
- VS Code extensions:
  - ESLint
  - Prettier
  - React Developer Tools
  - MySQL extension
  - Docker extension
  - Live Share (for pair programming)

## 2. Tech Stack Details

### 2.1 Backend Technologies

#### 2.1.1 Core Framework
- **Node.js**: v20.x LTS
- **Express.js**: v4.18.x
- **TypeScript**: v5.x

#### 2.1.2 Database
- **MySQL**: v8.0
- **ORM**: Sequelize v6.x
- **Migrations**: Sequelize CLI
- **Connection Pooling**: Built-in Sequelize pooling

#### 2.1.3 API Design
- **Style**: RESTful API
- **Format**: JSON
- **Documentation**: OpenAPI 3.0 (Swagger)
- **Versioning**: URL-based (e.g., `/api/v1`)

#### 2.1.4 Authentication & Security
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcrypt with 10 salt rounds
- **Token Storage**: HTTP-only cookies + localStorage (refresh token)
- **CORS**: Configured for frontend domains
- **Helmet.js**: HTTP headers security
- **Rate Limiting**: express-rate-limit
- **Input Validation**: express-validator

#### 2.1.5 Backend File Structure
```
backend/
├── src/
│   ├── config/               # Configuration files
│   │   ├── database.js       # Database configuration
│   │   ├── auth.js           # Authentication configuration
│   │   └── app.js            # Application configuration
│   ├── controllers/          # Request handlers
│   │   ├── auth.controller.js
│   │   ├── client.controller.js
│   │   ├── appointment.controller.js
│   │   ├── service.controller.js
│   │   └── payment.controller.js
│   ├── middleware/           # Express middleware
│   │   ├── auth.middleware.js
│   │   ├── validation.middleware.js
│   │   └── error.middleware.js
│   ├── models/               # Sequelize models
│   │   ├── user.model.js
│   │   ├── client.model.js
│   │   ├── appointment.model.js
│   │   ├── service.model.js
│   │   └── payment.model.js
│   ├── routes/               # API routes
│   │   ├── auth.routes.js
│   │   ├── client.routes.js
│   │   ├── appointment.routes.js
│   │   ├── service.routes.js
│   │   └── payment.routes.js
│   ├── services/             # Business logic
│   │   ├── auth.service.js
│   │   ├── client.service.js
│   │   ├── appointment.service.js
│   │   ├── notification.service.js
│   │   └── payment.service.js
│   ├── utils/                # Utility functions
│   │   ├── logger.js
│   │   ├── validators.js
│   │   └── helpers.js
│   ├── migrations/           # Database migrations
│   ├── seeders/              # Database seed data
│   └── app.js                # Express application entry point
├── tests/                    # Test files
│   ├── unit/
│   ├── integration/
│   └── fixtures/
├── .env.example              # Environment variables example
├── .eslintrc.js              # ESLint configuration
├── .prettierrc               # Prettier configuration
├── tsconfig.json             # TypeScript configuration
├── jest.config.js            # Jest configuration
└── package.json              # Dependencies and scripts
```

### 2.2 Frontend Technologies

#### 2.2.1 Core Framework
- **React**: v18.x
- **TypeScript**: v5.x
- **Build Tool**: Vite

#### 2.2.2 State Management
- **Redux Toolkit**: v2.x
- **Redux Persist**: For offline capabilities
- **React Context**: For UI state

#### 2.2.3 UI Components
- **UI Library**: Chakra UI v2.x
- **Calendar**: React Big Calendar
- **Forms**: React Hook Form + Yup validation
- **Icons**: React Icons
- **Data Tables**: TanStack Table v8
- **Charts**: Recharts

#### 2.2.4 Routing & Navigation
- **React Router**: v6.x
- **Route Protection**: Protected route components
- **Lazy Loading**: React.lazy() and Suspense

#### 2.2.5 API Communication
- **HTTP Client**: Axios with interceptors
- **Request Caching**: React Query
- **WebSockets**: Socket.IO client (optional for real-time features)

#### 2.2.6 Frontend File Structure
```
frontend/
├── public/                   # Static files
│   ├── favicon.ico
│   ├── logo.png
│   └── index.html
├── src/
│   ├── assets/               # Images, fonts, etc.
│   ├── components/           # Reusable components
│   │   ├── common/           # Generic UI components
│   │   ├── forms/            # Form components
│   │   ├── layout/           # Layout components
│   │   └── specific/         # Feature-specific components
│   ├── config/               # Configuration files
│   ├── context/              # React Context providers
│   ├── features/             # Feature modules
│   │   ├── auth/             # Authentication
│   │   ├── clients/          # Client management
│   │   ├── appointments/     # Appointment scheduling
│   │   ├── services/         # Service management
│   │   └── payments/         # Payment processing
│   ├── hooks/                # Custom React hooks
│   ├── pages/                # Page components
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── clients/
│   │   ├── appointments/
│   │   ├── services/
│   │   └── settings/
│   ├── routes/               # Routing configuration
│   ├── services/             # API service connectors
│   ├── store/                # Redux store configuration
│   │   ├── slices/           # Redux slices
│   │   ├── middleware/       # Redux middleware
│   │   └── index.js          # Store setup
│   ├── styles/               # Global styles
│   ├── types/                # TypeScript type definitions
│   ├── utils/                # Utility functions
│   ├── App.tsx               # Root component
│   ├── index.tsx             # Application entry point
│   └── theme.ts              # UI theme configuration
├── tests/                    # Test files
│   ├── unit/
│   ├── integration/
│   └── fixtures/
├── .env.example              # Environment variables example
├── .eslintrc.js              # ESLint configuration
├── .prettierrc               # Prettier configuration
├── tsconfig.json             # TypeScript configuration
├── vite.config.ts            # Vite configuration
└── package.json              # Dependencies and scripts
```

## 3. Database Design

### 3.1 Entity Relationship Diagram

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│ Users       │     │ Clients     │     │ Services    │
├─────────────┤     ├─────────────┤     ├─────────────┤
│ id          │1   n│ id          │     │ id          │
│ email       ├─────┤ user_id     │     │ name        │
│ password    │     │ first_name  │     │ description │
│ role        │     │ last_name   │     │ duration    │
│ created_at  │     │ phone       │     │ price       │
│ updated_at  │     │ created_at  │     │ created_at  │
└─────────────┘     │ updated_at  │     │ updated_at  │
                    └──────┬──────┘     └──────┬──────┘
                           │                   │
                           │n                 n│
                           │                   │
                    ┌──────┴──────┐     ┌─────┴──────┐
                    │ Appointments│     │ Availability│
                    ├─────────────┤     ├─────────────┤
                    │ id          │     │ id          │
                    │ client_id   │     │ day_of_week │
                    │ service_id  │     │ start_time  │
                    │ start_time  │     │ end_time    │
                    │ end_time    │     │ created_at  │
                    │ status      │     │ updated_at  │
                    │ notes       │     └─────────────┘
                    │ created_at  │
                    │ updated_at  │
                    └──────┬──────┘
                           │
                           │1
                           │
                    ┌──────┴──────┐     ┌─────────────┐
                    │ Payments    │     │ HealthForms │
                    ├─────────────┤     ├─────────────┤
                    │ id          │     │ id          │
                    │ appointment_│     │ client_id   │
                    │ amount      │     │ form_data   │
                    │ status      │     │ created_at  │
                    │ type        │     │ updated_at  │
                    │ created_at  │     └─────────────┘
                    │ updated_at  │
                    └─────────────┘
```

### 3.2 Table Definitions

#### 3.2.1 Users Table
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'client') DEFAULT 'client',
  reset_token VARCHAR(255),
  reset_token_expiry DATETIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### 3.2.2 Clients Table
```sql
CREATE TABLE clients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  address TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

#### 3.2.3 Services Table
```sql
CREATE TABLE services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  duration INT NOT NULL COMMENT 'Duration in minutes',
  price DECIMAL(10, 2) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### 3.2.4 Appointments Table
```sql
CREATE TABLE appointments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  client_id INT NOT NULL,
  service_id INT NOT NULL,
  start_time DATETIME NOT NULL,
  end_time DATETIME NOT NULL,
  status ENUM('scheduled', 'confirmed', 'completed', 'cancelled', 'no-show') DEFAULT 'scheduled',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id) REFERENCES clients(id),
  FOREIGN KEY (service_id) REFERENCES services(id)
);
```

#### 3.2.5 Payments Table
```sql
CREATE TABLE payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  appointment_id INT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  status ENUM('pending', 'completed', 'refunded', 'failed') DEFAULT 'pending',
  type ENUM('full', 'deposit', 'remainder') NOT NULL,
  transaction_id VARCHAR(255),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (appointment_id) REFERENCES appointments(id)
);
```

#### 3.2.6 Availability Table
```sql
CREATE TABLE availability (
  id INT AUTO_INCREMENT PRIMARY KEY,
  day_of_week ENUM('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday') NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### 3.2.7 Health Forms Table
```sql
CREATE TABLE health_forms (
  id INT AUTO_INCREMENT PRIMARY KEY,
  client_id INT NOT NULL,
  form_data JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
);
```

## 4. API Specifications

### 4.1 API Endpoints

#### 4.1.1 Authentication
```
POST   /api/v1/auth/register           # Register a new user
POST   /api/v1/auth/login              # Login user
POST   /api/v1/auth/logout             # Logout user
POST   /api/v1/auth/refresh-token      # Refresh JWT token
POST   /api/v1/auth/forgot-password    # Request password reset
POST   /api/v1/auth/reset-password     # Reset password with token
GET    /api/v1/auth/me                 # Get current user info
```

#### 4.1.2 Clients
```
GET    /api/v1/clients                 # Get all clients (therapist only)
POST   /api/v1/clients                 # Create a new client
GET    /api/v1/clients/:id             # Get client by ID
PUT    /api/v1/clients/:id             # Update client info
DELETE /api/v1/clients/:id             # Delete client (archive)
```

#### 4.1.3 Services
```
GET    /api/v1/services                # Get all services
POST   /api/v1/services                # Create a new service (therapist only)
GET    /api/v1/services/:id            # Get service by ID
PUT    /api/v1/services/:id            # Update service (therapist only)
DELETE /api/v1/services/:id            # Delete service (archive) (therapist only)
```

#### 4.1.4 Appointments
```
GET    /api/v1/appointments            # Get all appointments (filtered by role)
POST   /api/v1/appointments            # Create a new appointment
GET    /api/v1/appointments/:id        # Get appointment by ID
PUT    /api/v1/appointments/:id        # Update appointment
DELETE /api/v1/appointments/:id        # Cancel appointment
GET    /api/v1/appointments/availability # Get available time slots
```

#### 4.1.5 Payments
```
GET    /api/v1/payments                # Get all payments (filtered by role)
POST   /api/v1/payments                # Create a new payment
GET    /api/v1/payments/:id            # Get payment by ID
PUT    /api/v1/payments/:id            # Update payment (status only)
POST   /api/v1/payments/:id/refund     # Process refund
```

#### 4.1.6 Health Forms
```
GET    /api/v1/health-forms/:clientId  # Get health form for a client
POST   /api/v1/health-forms            # Create/update health form
```

### 4.2 Request/Response Formats

#### 4.2.1 Standard Response Format
```json
{
  "success": true|false,
  "data": { ... },
  "message": "Operation successful",
  "errors": [ ... ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "totalItems": 100,
    "totalPages": 10
  }
}
```

#### 4.2.2 Error Response Format
```json
{
  "success": false,
  "message": "Error message",
  "errors": [
    {
      "field": "email",
      "message": "Email is invalid"
    }
  ],
  "errorCode": "VALIDATION_ERROR"
}
```

### 4.3 Authentication Scheme

- JWT-based authentication
- Token format: `Bearer <token>`
- Token lifetime: Access token (15 minutes), Refresh token (7 days)
- Token storage: HTTP-only cookies (access token), localStorage (refresh token)

## 5. Frontend Patterns

### 5.1 Component Architecture

- Atomic design principles
- Container/Presentational pattern
- Custom hooks for shared logic
- HOCs for cross-cutting concerns

### 5.2 State Management

- Redux for global application state
- Form state with React Hook Form
- UI state with React Context
- API state with React Query

### 5.3 Theming and Styling

- Chakra UI theme customization
- Responsive design approach
- Mobile-first design
- Consistent spacing and typography

## 6. Testing Strategy

### 6.1 Backend Testing

- **Unit Tests**: Individual functions and utilities
- **Integration Tests**: API endpoints
- **Test Database**: SQLite in-memory database
- **Test Coverage**: Aim for 80%+ coverage
- **Testing Tools**: Jest, Supertest

### 6.2 Frontend Testing

- **Component Tests**: Individual UI components
- **Integration Tests**: Pages and workflows
- **E2E Tests**: Critical user journeys
- **Testing Tools**: React Testing Library, Jest, Cypress

## 7. Deployment Specifications

### 7.1 Local Deployment

- Docker Compose for local environment
- Development environment variables
- Hot reloading for development

### 7.2 Cloud Deployment

- Docker containers for consistency
- AWS recommended services:
  - EC2 or ECS for application hosting
  - RDS for MySQL database
  - S3 for static assets
  - CloudFront for CDN
  - Route 53 for DNS
- CI/CD pipeline with GitHub Actions

## 8. Security Considerations

### 8.1 Data Protection

- HTTPS for all communications
- Database encryption at rest
- Sensitive data encryption
- Regular security audits

### 8.2 Authentication & Authorization

- Secure password hashing
- JWT with appropriate expiration
- Role-based access control
- API rate limiting

### 8.3 Input Validation

- Server-side validation for all inputs
- Client-side validation for UX
- SQL injection prevention
- XSS protection

## 9. Performance Optimization

### 9.1 Frontend Performance

- Code splitting
- Lazy loading
- Image optimization
- Bundle size monitoring

### 9.2 Backend Performance

- Database indexing
- Query optimization
- Connection pooling
- Caching strategies

## 10. Maintenance & Monitoring

### 10.1 Logging

- Structured logging format
- Log levels (debug, info, warn, error)
- Log rotation
- Centralized log storage

### 10.2 Monitoring

- Application performance monitoring
- Error tracking
- Usage analytics
- Health checks

### 10.3 Backup Strategy

- Daily database backups
- Backup retention policy
- Backup verification

## 11. Third-Party Integrations

### 11.1 Potential Integrations

- **Payment Processing**: Stripe, PayPal
- **Email Service**: SendGrid, Mailgun
- **SMS Service**: Twilio
- **Calendar Integration**: Google Calendar, iCal
- **Storage**: AWS S3

## 12. References

- Node.js Best Practices: https://github.com/goldbergyoni/nodebestpractices
- React Best Practices: https://reactjs.org/docs/thinking-in-react.html
- MySQL Performance Optimization: https://dev.mysql.com/doc/refman/8.0/en/optimization.html

## User Authentication & Authorization

### User Roles

The application uses a simple role-based authentication system with two primary roles:

1. **Admin** - Full administrative privileges with access to all system functionality including:
   - Managing all clients
   - Managing all appointments
   - Configuring services and pricing
   - Accessing business reports and analytics
   - Managing other user accounts

2. **Client** - Limited access focused on their own information and appointments:
   - Viewing and updating their profile
   - Scheduling and managing their appointments
   - Viewing their payment history
   - Completing health forms and intake documents

When a user registers through the public registration form, they are automatically assigned the "client" role and a client record is created for them in the database. Admins can be created manually through database seeding or by an existing admin updating a user's role.

### Authentication Flow

The application uses JSON Web Tokens (JWT) for authentication:

1. User logs in with email/password
2. Server validates credentials
3. Server generates JWT containing:
   - User ID (`userId`)
   - Email
   - Role
4. Token is returned to client and stored in local storage
5. Token is sent in Authorization header for protected API calls
6. Server validates token for protected routes

### Auth Middleware

Protected routes use middleware that:
1. Extracts the JWT from the Authorization header
2. Verifies the token's validity and expiration
3. Retrieves the associated user from the database
4. Attaches the user object to the request
5. Verifies appropriate role permissions for the requested resource

# Technical Documentation

## Architecture Overview

The Massage Therapy Client Portal uses a standard client-server architecture:

- **Frontend**: React SPA with Chakra UI and Redux state management
- **Backend**: Node.js Express API server
- **Database**: MySQL with Sequelize ORM

## Backend Architecture

### Core Components

1. **Express Server**: Main API server handling HTTP requests
2. **Sequelize ORM**: Database access layer with models and migrations
3. **Authentication Middleware**: JWT-based authentication
4. **Validation Layer**: Using express-validator for input validation

### API Structure

The backend follows a layered architecture:

- **Routes**: Define API endpoints and HTTP methods
- **Controllers**: Handle business logic and request/response processing
- **Models**: Define database schema and relationships
- **Middleware**: Handle cross-cutting concerns like authentication and validation
- **Services**: (When needed) Encapsulate reusable business logic

### Database Models

#### Client Model

The `Client` model represents a client in the system:

```typescript
export interface ClientAttributes {
  id: number;
  userId: number | null;  // References User model (can be null for clients without accounts)
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  phone?: string | null;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  dateOfBirth?: Date;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
```

#### User Model

The `User` model represents users who can log into the system:

```typescript
export interface UserAttributes {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: 'admin' | 'client';
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
```

### Authentication

Authentication uses JWT tokens:

1. User logs in with email/password
2. Server generates a JWT token containing user ID and role
3. Token is included in all subsequent API requests via Authorization header
4. Server validates token and attaches user info to the request

### Validation

Request validation happens in multiple layers:

1. **Route-level validation**: Using express-validator to define validation rules
2. **validateRequest middleware**: Processes validation results and returns errors
3. **Model-level validation**: Sequelize model validations as a second line of defense

## Frontend Architecture

### Core Components

1. **React**: UI library
2. **Redux**: State management (with Redux Toolkit)
3. **React Router**: Client-side routing
4. **Chakra UI**: Component library
5. **React Hook Form**: Form handling with validation

### Data Flow

1. **API Service Layer**: Centralizes API calls through service modules
2. **Redux State**: Manages application state including auth and UI state
3. **Component State**: Local state for component-specific concerns

### Key Features Implementation

#### Client Management

The client management feature follows this pattern:

1. **List View**: Displays all clients with basic information
2. **Detail View**: Shows full client information with tabs for different sections
3. **Create/Edit Forms**: Forms for creating and editing clients

#### Form Handling

Client forms use React Hook Form with Yup validation:

```typescript
const schema = yup.object().shape({
  userId: yup.number().nullable(),
  email: yup.string().email('Invalid email').required('Email is required'),
  firstName: yup.string().optional(),
  lastName: yup.string().optional(),
  phone: yup.string().optional(),
  // Additional fields...
});
```

## Important Implementation Details

### Client-User Relationship

A key aspect of the system is that clients can exist with or without user accounts:

1. **With User Account**: Client is linked to a user via `userId` and can log in
2. **Without User Account**: Client exists only in the system (created by admin), with `userId` as null

This supports these workflows:
- Admin creates a client record without a user account
- Client registers later and gets connected to their existing client record via email

### Null Handling

Special attention is given to handling null/undefined/empty values:

1. **Database**: Fields are nullable when appropriate
2. **API**: Validation rules handle null and empty string appropriately
3. **UI**: Form fields and displays handle empty/null values with fallbacks

### Data Validation

The validation approach includes:

1. **Frontend validation**: Using Yup schemas with React Hook Form
2. **API validation**: Using express-validator with custom options
3. **Database constraints**: Including foreign keys and nullable constraints

## Technical Decisions and Patterns

### Authentication Strategy

JWT tokens were chosen for authentication because:
- They're stateless and don't require server-side storage
- They include role information for authorization
- They're easily verifiable on the server

### Error Handling

The error handling approach includes:

1. **Detailed logging**: Comprehensive logging for debugging
2. **Structured error responses**: Consistent error format in API responses
3. **Multi-layer handling**: Errors caught at different levels depending on context

### Migrations

Database changes follow a migration pattern:
1. Create a migration file using Sequelize CLI
2. Define up/down methods for applying/reverting changes
3. Apply migrations using the CLI

This ensures database schema changes are tracked and can be reliably applied across environments.
