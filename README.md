# Massage Therapy Client Portal

A comprehensive client management system for massage therapists to manage client information, appointments, and services.

## Features

- **Client Management**: Create, view, edit and manage client information
- **User Authentication**: Secure login and registration for therapists, admins, and clients
- **Role-based Access Control**: Different access levels for admins and clients

## Getting Started

### Prerequisites

- Node.js (v14+)
- MySQL (v8.0+)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd massage-therapy-client-portal
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure environment variables:
   - Create a `.env` file in the backend directory
   - Set the following variables:
     ```
     PORT=5000
     DB_HOST=localhost
     DB_USER=your_db_user
     DB_PASSWORD=your_db_password
     DB_NAME=massage_portal
     JWT_SECRET=your_secret_key
     ```

4. Initialize the database:
   ```
   cd backend
   npx sequelize-cli db:create
   npx sequelize-cli db:migrate
   ```

5. Start the development servers:
   ```
   npm run dev
   ```

## Project Structure

The application is divided into two main parts:

- **Frontend**: React application with Chakra UI for styling
- **Backend**: Node.js with Express and Sequelize ORM

### Key Directories

- `frontend/`: React frontend application
- `backend/`: Node.js backend API
- `docs/`: Project documentation including status and architecture

## Client Management

### Features

- Create clients with or without user accounts (admin feature)
- View detailed client information
- Edit client details including contact information and notes
- Track client emergency contacts

### User Types

1. **Admin**: Can manage all clients and therapists
2. **Client**: Can view and update their own information

## API Documentation

### Client Endpoints

- `GET /api/v1/clients`: Get all clients (admin only)
- `GET /api/v1/clients/:id`: Get client by ID
- `POST /api/v1/clients`: Create a new client
- `PUT /api/v1/clients/:id`: Update a client
- `DELETE /api/v1/clients/:id`: Delete a client

## Development Status

Check [docs/status.md](docs/status.md) for the current development status, including completed work, in-progress features, and planned enhancements.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

[MIT License](LICENSE)

## Acknowledgments

- [Chakra UI](https://chakra-ui.com/)
- [Sequelize](https://sequelize.org/)
- [Express](https://expressjs.com/)

## Project Status

**Current Development Stage:** MVP Implementation

The project is currently in active development with the following core features implemented:

- ✅ User Authentication (Login/Registration)
- ✅ Role-based Authorization (Admin/Client)
- ✅ User Management
- ✅ Client Management (Partial - list view implemented)
- ✅ Service Definitions
- ✅ Basic Appointment Structures
- ✅ Frontend Dashboard
- ✅ Protected Routes

**Coming Soon:**
- Client Detail View
- Appointment Booking
- Calendar Integration
- Payments
- Health Forms

## User Roles

The system has two user roles:

1. **Admin** - Full access to all system features and client management
2. **Client** - Limited access to their own profile and appointments

When a new user registers through the registration form, they are automatically:
- Created with the "client" role
- A client record is created for them
- They can immediately access the client portal

## Key Features
