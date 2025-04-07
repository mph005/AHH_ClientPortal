# Massage Therapy Client Portal

A comprehensive client management and appointment scheduling system for massage therapists.

## Project Structure

This project is organized as a monorepo with the following components:

- `/backend`: Node.js Express API with MySQL database
- `/frontend`: React SPA with TypeScript and Chakra UI
- `/docs`: Project documentation

## Getting Started

### Prerequisites

- Node.js (v20 or later)
- MySQL (v8.0 or later)
- Git

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on the `.env.example`:
   ```bash
   cp .env.example .env
   ```
   
4. Update the `.env` file with your MySQL database credentials

5. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file (if you need to customize the API URL):
   ```bash
   cp .env.example .env
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Features

- User authentication and authorization
- Client management
- Appointment scheduling and management
- Service catalog management
- Secure payment processing
- Automated reminders and notifications

## Tech Stack

### Backend
- Node.js with Express
- TypeScript
- MySQL with Sequelize ORM
- JWT for authentication
- Express-validator for input validation

### Frontend
- React with TypeScript
- Chakra UI for components
- Redux Toolkit for state management
- React Router for navigation
- React Hook Form for form handling

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Chakra UI](https://chakra-ui.com/) for the component library
- [Vite](https://vitejs.dev/) for frontend tooling
- [Sequelize](https://sequelize.org/) for database ORM
