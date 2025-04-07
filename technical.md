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
  role ENUM('admin', 'therapist', 'client') DEFAULT 'client',
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
