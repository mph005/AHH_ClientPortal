# Massage Therapy Client Portal - System Architecture

## 1. Architecture Overview

The Massage Therapy Client Portal follows a client-server architecture with a clear separation between the frontend and backend components. This document outlines the high-level system architecture, the relationships between components, and the data flow through the system.

```
+------------------+        +-------------------+        +------------------+
|                  |        |                   |        |                  |
|  React Frontend  | <----> |  Express Backend  | <----> |  MySQL Database  |
|                  |        |                   |        |                  |
+------------------+        +-------------------+        +------------------+
                                    ^
                                    |
                                    v
                            +-------------------+
                            |  External Services |
                            |  - Email          |
                            |  - SMS            |
                            |  - Payment        |
                            +-------------------+
```

## 2. Component Architecture

### 2.1 Frontend Architecture

The frontend follows a component-based architecture using React with TypeScript:

```
Frontend Architecture
├── App Container
│   ├── Authentication (Context/Redux)
│   ├── Global State Management (Redux)
│   └── Routing (React Router)
│       ├── Public Routes
│       │   ├── Landing Page
│       │   ├── Login/Registration
│       │   └── Public Booking Portal
│       └── Protected Routes
│           ├── Therapist Dashboard
│           │   ├── Calendar View
│           │   ├── Client Management
│           │   ├── Appointment Details
│           │   └── Reports
│           └── Client Portal
│               ├── Book Appointments
│               ├── Manage Profile
│               ├── View History
│               └── Payments
├── Shared Components
│   ├── UI Components
│   ├── Form Elements
│   └── Layout Components
└── Services
    ├── API Client
    ├── Authentication
    └── Utilities
```

Key frontend design principles:
- Container/Component pattern for separation of concerns
- Custom hooks for shared logic
- Lazy loading for performance optimization
- Responsive design using CSS frameworks

### 2.2 Backend Architecture

The backend follows a layered architecture using Node.js with Express:

```
Backend Architecture
├── API Layer (Express Routes)
│   ├── Public Endpoints
│   └── Protected Endpoints
├── Middleware Layer
│   ├── Authentication/Authorization
│   ├── Validation
│   ├── Error Handling
│   └── Logging
├── Service Layer (Business Logic)
│   ├── User Service
│   ├── Appointment Service
│   ├── Client Service
│   ├── Payment Service
│   └── Notification Service
├── Data Access Layer
│   ├── Sequelize Models
│   ├── Query Building
│   └── Transactions
└── External Service Integrations
    ├── Email Provider
    ├── SMS Gateway
    ├── Payment Processor
    └── Calendar API
```

Key backend design principles:
- RESTful API design
- Dependency injection for testability
- Repository pattern for data access
- Service-oriented architecture

### 2.3 Database Architecture

```
Database Schema
├── Users (admin, client roles)
├── Clients (linked to user accounts)
├── Services
├── Appointments
├── Health_Forms
├── Payments
├── Availability
├── Settings
└── Notifications
```

## 3. Data Flow Architecture

### 3.1 Appointment Booking Flow

```
                  ┌─────────────┐
                  │ Client UI   │
                  └─────┬───────┘
                        │
                        ▼
┌────────────────────────────────────────┐
│1. Request Available Time Slots         │
└───────────────────┬────────────────────┘
                    │
                    ▼
┌────────────────────────────────────────┐
│2. API Processes Availability Request   │
└───────────────────┬────────────────────┘
                    │
                    ▼
┌────────────────────────────────────────┐
│3. Database Query for Available Slots   │
└───────────────────┬────────────────────┘
                    │
                    ▼
┌────────────────────────────────────────┐
│4. Client Selects Time & Service        │
└───────────────────┬────────────────────┘
                    │
                    ▼
┌────────────────────────────────────────┐
│5. Process Deposit Payment (Optional)   │
└───────────────────┬────────────────────┘
                    │
                    ▼
┌────────────────────────────────────────┐
│6. Create Appointment Record            │
└───────────────────┬────────────────────┘
                    │
                    ▼
┌────────────────────────────────────────┐
│7. Send Confirmation Notifications      │
└───────────────────┬────────────────────┘
                    │
                    ▼
┌────────────────────────────────────────┐
│8. Sync with External Calendar          │
└────────────────────────────────────────┘
```

### 3.2 Authentication Flow

```
┌────────────────┐    ┌─────────────┐    ┌────────────────┐
│                │    │             │    │                │
│  Client        │───►│  API Server │───►│  Database      │
│                │    │             │    │                │
└────────────────┘    └─────────────┘    └────────────────┘
        │                    │                   │
        │  Login Request     │                   │
        │ ─────────────────► │                   │
        │                    │  Verify User      │
        │                    │ ─────────────────►│
        │                    │                   │
        │                    │  User Data        │
        │                    │ ◄─────────────────│
        │                    │                   │
        │                    │  Generate JWT     │
        │                    │                   │
        │  Return Token      │                   │
        │ ◄───────────────── │                   │
        │                    │                   │
        │  Protected Request │                   │
        │  with Token        │                   │
        │ ─────────────────► │                   │
        │                    │  Validate Token   │
        │                    │                   │
        │                    │  Process Request  │
        │  Return Data       │                   │
        │ ◄───────────────── │                   │
        │                    │                   │
```

## 4. Deployment Architecture

### 4.1 Local Development Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Developer Machine                 │
│                                                     │
│   ┌─────────────┐      ┌─────────────┐              │
│   │             │      │             │              │
│   │  React Dev  │<────>│  Express    │              │
│   │  Server     │      │  Dev Server │              │
│   │             │      │             │              │
│   └─────────────┘      └─────────────┘              │
│          ^                    ^                     │
│          │                    │                     │
│          v                    v                     │
│   ┌─────────────┐      ┌─────────────┐              │
│   │             │      │             │              │
│   │  Source     │      │  Local      │              │
│   │  Code       │      │  MySQL DB   │              │
│   │             │      │             │              │
│   └─────────────┘      └─────────────┘              │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### 4.2 Production Deployment Architecture (Cloud)

```
┌─────────────────────────────────────────────────────────────────────┐
│                      Cloud Provider (AWS/Azure/GCP)                  │
│                                                                     │
│   ┌─────────────┐      ┌─────────────┐      ┌─────────────┐         │
│   │             │      │             │      │             │         │
│   │  CDN        │<────>│  Load       │<────>│  Web Server │         │
│   │  (Static    │      │  Balancer   │      │  Containers │         │
│   │   Assets)   │      │             │      │             │         │
│   └─────────────┘      └─────────────┘      └─────────────┘         │
│                                                   ^                 │
│                                                   │                 │
│                                                   v                 │
│   ┌─────────────┐      ┌─────────────┐      ┌─────────────┐         │
│   │             │      │             │      │             │         │
│   │  Redis      │<────>│  API Server │<────>│  MySQL      │         │
│   │  Cache      │      │  Containers │      │  Database   │         │
│   │             │      │             │      │             │         │
│   └─────────────┘      └─────────────┘      └─────────────┘         │
│                              ^                                      │
│                              │                                      │
│                              v                                      │
│   ┌─────────────┐      ┌─────────────┐      ┌─────────────┐         │
│   │             │      │             │      │             │         │
│   │  Storage    │      │  Email/SMS  │      │  Payment    │         │
│   │  Service    │      │  Service    │      │  Service    │         │
│   │             │      │             │      │             │         │
│   └─────────────┘      └─────────────┘      └─────────────┘         │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## 5. Security Architecture

### 5.1 Authentication & Authorization

- JWT-based authentication
- Role-based access control (RBAC)
- Token refresh mechanism
- Password hashing using bcrypt

### 5.2 Data Security

- TLS/SSL encryption for all communications
- Data encryption at rest
- Input validation and sanitization
- Prepared statements for database queries
- XSS and CSRF protection

### 5.3 Compliance Considerations

- HIPAA compliance for health information
- Data retention policies
- Audit logging for sensitive operations
- Regular security audits

## 6. Integration Architecture

### 6.1 External System Integrations

```
┌─────────────────┐
│ Client Portal   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐    ┌─────────────────┐
│                 │    │                 │
│ API Gateway     │───►│ Payment Gateway │
│                 │    │                 │
└─────────────────┘    └─────────────────┘
         │
         ├─────────────┐
         │             │
         ▼             ▼
┌─────────────────┐    ┌─────────────────┐
│                 │    │                 │
│ Email Service   │    │ SMS Service     │
│                 │    │                 │
└─────────────────┘    └─────────────────┘
         │
         │
         ▼
┌─────────────────┐
│                 │
│ Calendar API    │
│ (Google/Apple)  │
│                 │
└─────────────────┘
```

## 7. Scaling Strategy

### 7.1 Vertical Scaling
- Increase resources for database and application servers

### 7.2 Horizontal Scaling
- Deploy multiple API server instances
- Use load balancing for request distribution
- Implement database read replicas

### 7.3 Database Scaling
- Table partitioning for large tables
- Query optimization
- Consider caching layer for frequent queries

## 8. Monitoring and Observability

### 8.1 Application Monitoring
- Performance metrics collection
- Error tracking and alerting
- User activity tracking

### 8.2 Infrastructure Monitoring
- Server health checks
- Resource utilization tracking
- Database performance monitoring

## 9. Backup and Recovery

### 9.1 Database Backups
- Regular automated backups
- Point-in-time recovery capability
- Backup integrity verification

### 9.2 Disaster Recovery
- Multi-region backup strategy
- Recovery time objective (RTO)
- Recovery point objective (RPO)

## 10. References

- Express.js Best Practices
- React Application Architecture
- MySQL Database Design Principles
- Cloud Deployment Strategies
