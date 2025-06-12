# Shadow share

A full-stack social media application that allows users to create accounts, log in, and share posts with others.

## 🚀 Features

- **User Authentication**: Secure signup and login functionality
- **Post Management**: Create, read, update, and delete posts
- **Responsive Design**: Built with Tailwind CSS for a mobile-friendly experience
- **Real-time Updates**: Efficient state management with Redux

## 🛠️ Tech Stack

### Frontend

- **React 19** with TypeScript
- **Redux Toolkit** for state management
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Vite** as the build tool
- **React Toastify** for notifications

### Backend

- **Express.js** with TypeScript
- **PostgreSQL** for database
- **Drizzle ORM** for database interactions
- **Redis** for caching
- **JWT** for authentication
- **Docker** for containerization

## 📋 Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- npm or yarn

## 🔧 Installation & Setup

### Clone the repository

```bash
git clone https://github.com/yourusername/random-post.git
cd random-post
```

### Using Docker (Recommended)

The easiest way to run the application is using Docker Compose:

```bash
# Start all services (PostgreSQL, Redis, and backend)
docker-compose up -d

# To stop all services
docker-compose down
```

### Manual Setup

#### Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env file with your configuration

# Run database migrations
npm run drizzle:push

# Seed the database (optional)
npm run seed

# Start the development server
npm run dev
```

#### Frontend Setup

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Start the development server
npm run dev
```

## 🏗️ Project Structure

```
random-post/
├── client/                 # Frontend React application
│   ├── public/             # Static files
│   ├── src/                # Source files
│   │   ├── api/            # API client and utilities
│   │   ├── assets/         # Images, fonts, etc.
│   │   ├── components/     # React components
│   │   ├── features/       # Redux slices
│   │   ├── types/          # TypeScript type definitions
│   │   └── util/           # Utility functions
│   ├── package.json        # Frontend dependencies
│   └── vite.config.ts      # Vite configuration
│
├── server/                 # Backend Express application
│   ├── config/             # Configuration files
│   ├── controller/         # Route controllers
│   ├── db/                 # Database models and migrations
│   ├── middlewares/        # Express middlewares
│   ├── routes/             # API routes
│   ├── util/               # Utility functions
│   ├── index.ts            # Entry point
│   └── package.json        # Backend dependencies
│
├── docker-compose.yml      # Docker Compose configuration
└── README.md               # Project documentation
```

## 🔒 Authentication Flow

1. User registers with username, email, and password
2. User logs in with credentials
3. Server validates credentials and returns a JWT token
4. Client stores the token and includes it in subsequent API requests
5. Protected routes check for valid token before granting access

## 🌐 API Endpoints

### User Endpoints

- `POST /api/v1/users/signup` - Register a new user
- `POST /api/v1/users/login` - Authenticate a user
- `GET /api/v1/users/profile` - Get user profile (protected)

### Post Endpoints

- `GET /api/v1/posts` - Get all posts
- `GET /api/v1/posts/:id` - Get a specific post
- `POST /api/v1/posts` - Create a new post (protected)
- `PUT /api/v1/posts/:id` - Update a post (protected)
- `DELETE /api/v1/posts/:id` - Delete a post (protected)

## 🧪 Testing

```bash
# Run frontend tests
cd client
npm test

# Run backend tests
cd server
npm test
```

## 🚀 Deployment

### Frontend Deployment

Build the frontend for production:

```bash
cd client
npm run build
```

The build artifacts will be stored in the `client/dist/` directory.

### Backend Deployment

Build the backend for production:

```bash
cd server
npm run build
```

The compiled JavaScript files will be stored in the `server/dist/` directory.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
