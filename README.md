# Massage Therapy Client Portal

A comprehensive client management and appointment scheduling system for massage therapists.

## Project Overview

The Massage Therapy Client Portal is a full-stack web application designed to streamline the management of a massage therapy business. It enables therapists to manage their clients, schedule appointments, process payments, and track business performance through a user-friendly interface.

### Key Features

- Client management and record-keeping
- Online appointment scheduling and management
- Service catalog with customizable offerings
- Secure payment processing with deposit options
- Automated reminders and notifications
- Business analytics and reporting
- Health intake form management
- Calendar integration

## Technology Stack

### Backend
- **Runtime**: Node.js 20.x
- **Framework**: Express.js 4.18.x
- **Database**: MySQL 8.0
- **ORM**: Sequelize 6.x
- **Authentication**: JWT with bcrypt
- **API Documentation**: Swagger/OpenAPI 3.0
- **Testing**: Jest, Supertest

### Frontend
- **Framework**: React 18.x with TypeScript
- **State Management**: Redux Toolkit
- **Routing**: React Router 6.x
- **UI Components**: Chakra UI / Material UI
- **Forms**: React Hook Form with Yup validation
- **HTTP Client**: Axios
- **Calendar**: React Big Calendar
- **Testing**: React Testing Library, Jest

### DevOps
- **Containerization**: Docker
- **Version Control**: Git/GitHub
- **CI/CD**: GitHub Actions
- **Cloud Hosting Options**: AWS, Azure, or GCP
- **Monitoring**: Sentry for error tracking

## Setup Instructions

### Prerequisites
- Node.js (v20 or later)
- MySQL (v8.0 or later)
- Docker (optional, for containerized deployment)
- Git

### Local Development Setup

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/massage-therapy-portal.git
   cd massage-therapy-portal
   ```

2. Backend setup
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Update .env with your MySQL credentials
   npm run migrate
   npm run seed
   npm run dev
   ```

3. Frontend setup
   ```bash
   cd frontend
   npm install
   cp .env.example .env
   # Update .env with your backend API URL
   npm start
   ```

### Docker Setup

```bash
docker-compose up -d
```

## Project Structure

```
massage-therapy-portal/
├── backend/               # Express API server
│   ├── src/
│   │   ├── config/        # Configuration files
│   │   ├── controllers/   # API controllers
│   │   ├── middleware/    # Express middleware
│   │   ├── models/        # Sequelize models
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic
│   │   ├── utils/         # Utility functions
│   │   └── app.js         # Express application
│   ├── tests/             # Backend tests
│   └── package.json
├── frontend/              # React application
│   ├── public/            # Static files
│   ├── src/
│   │   ├── assets/        # Images, fonts, etc.
│   │   ├── components/    # Reusable components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── pages/         # Page components
│   │   ├── services/      # API service connectors
│   │   ├── store/         # Redux store configuration
│   │   ├── types/         # TypeScript type definitions
│   │   ├── utils/         # Utility functions
│   │   └── App.tsx        # Root component
│   ├── tests/             # Frontend tests
│   └── package.json
├── docs/                  # Documentation
├── .github/               # GitHub Actions workflows
├── docker-compose.yml     # Docker Compose configuration
└── README.md              # Project documentation
```

## Development Patterns

### Code Style

- We follow the Airbnb JavaScript/React Style Guide
- ESLint and Prettier are configured for code quality
- Husky pre-commit hooks ensure code standards

### API Design

- RESTful API design principles
- Versioned API endpoints (e.g., `/api/v1/clients`)
- Standardized error responses
- JWT authentication with refresh tokens

### State Management

- Redux for global state (appointments, clients)
- React Context for UI state and themes
- Local component state for form inputs

### Testing Strategy

- Unit tests for utilities and services
- Integration tests for API endpoints
- Component tests for UI elements
- End-to-end tests for critical workflows

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Full Calendar](https://fullcalendar.io/) for the calendar component
- [Chakra UI](https://chakra-ui.com/) for the component library
- [Create React App](https://create-react-app.dev/) for bootstrapping the frontend
