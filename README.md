# Punditry 

A modern web application built with React and Vite, featuring user authentication and a clean, responsive UI.

## Overview

Punditry is a platform that provides user authentication functionality with a polished user interface. Built with modern web technologies and best practices, it offers a seamless user experience with fast performance.

## Tech Stack

### Frontend
- **Framework:** React 18.3
- **Build Tool:** Vite 6.0
- **Styling:** Tailwind CSS 3.4
- **Routing:** React Router DOM 7.1
- **Icons:** Lucide React
- **Form Validation:** Custom implementation
- **Code Quality:** ESLint with React plugins
- **State Management:** React Context API
- **HTTP Client:** Native Fetch API

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL
- **Authentication:** JWT (jsonwebtoken)
- **Password Hashing:** bcryptjs
- **Rate Limiting:** express-rate-limit
- **CORS:** cors middleware
- **Environment Variables:** dotenv

## Features

### Authentication System
- User login/signup with JWT
- Password encryption with bcrypt
- Password visibility toggle
- Comprehensive form validation
- Protected routes with React Router
- Persistent sessions using localStorage
- Rate limiting for security
- CORS configuration for API security

### Security Features
- Password strength requirements:
  - Minimum 8 characters
  - At least one uppercase letter
  - At least one lowercase letter
  - At least one number
  - At least one special character
- Token-based authentication
- Secure password storage
- Rate limiting on API endpoints
- Input validation and sanitization

### UI/UX
- Responsive design with Tailwind CSS
- Modern interface with consistent styling
- Interactive loading states
- Comprehensive error handling
- Smooth transitions and animations
- Form field validation feedback
- Password visibility toggle

### Code Architecture
- Component-based architecture
- Custom hooks for authentication
- Context-based state management
- Protected route implementation
- Utility functions for validation
- Modular component structure


## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/punditry.git
   ```

2. Set up the frontend:
   ```bash
   cd frontend
   npm install
   ```

3. Set up the backend:
   ```bash
   cd ../backend
   npm install
   ```

4. Configure environment variables:

   Frontend (.env):
   ```
   VITE_API_URL=http://localhost:5020
   ```

   Backend (.env):
   ```
   PORT=5020
   DB_USER=your_db_user
   DB_HOST=localhost
   DB_NAME=your_db_name
   DB_PASSWORD=your_db_password
   DB_PORT=5432
   JWT_SECRET=your_jwt_secret
   ```

### Database Setup

1. Create PostgreSQL database:
   ```sql
   CREATE DATABASE your_db_name;
   ```

2. Create users table:
   ```sql
   CREATE TABLE users (
     id SERIAL PRIMARY KEY,
     username VARCHAR(50) UNIQUE NOT NULL,
     password VARCHAR(255) NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

### Running the Application

1. Start the backend server:
   ```bash
   cd backend
   node app.js
   ```

2. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

3. Access the application:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5020

### Building for Production

1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```

2. The built files will be in the `dist` directory
