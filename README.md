# Random Post Application

A full-stack application with React frontend, Node.js backend, PostgreSQL database, and Redis cache.

## Architecture

- **Frontend**: React with TypeScript, Vite, and Tailwind CSS
- **Backend**: Node.js with Express and TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Cache**: Redis
- **Containerization**: Docker and Docker Compose

## Quick Start

### Prerequisites

- Docker and Docker Compose installed on your system

### Running the Application

1. Clone the repository and navigate to the project directory:

```bash
cd random-post
```

2. Start all services with a single command:

```bash
docker-compose up --build
```

This command will:

- Build and start the PostgreSQL database
- Build and start the Redis cache
- Build and start the Node.js backend server
- Build and start the React frontend

### Accessing the Application

- **Frontend**: http://localhost (port 80)
- **Backend API**: http://localhost:3000
- **PostgreSQL**: localhost:5432
- **Redis**: localhost:6379

### Services

#### Frontend (React)

- Built with Vite and served by Nginx
- Includes API proxy configuration to backend
- Accessible at http://localhost

#### Backend (Node.js)

- Express server with TypeScript
- RESTful API endpoints
- JWT authentication
- Accessible at http://localhost:3000

#### Database (PostgreSQL)

- PostgreSQL 15
- Database name: `db`
- Username: `root`
- Password: `root`

#### Cache (Redis)

- Redis 7
- Used for session management and caching

### Development

To run individual services for development:

#### Backend Development

```bash
cd server
npm install
npm run dev
```

#### Frontend Development

```bash
cd client
npm install
npm run dev
```

### Environment Variables

The application uses the following environment variables in Docker:

#### Backend

- `POSTGRES_HOST=postgres`
- `POSTGRES_USER=root`
- `POSTGRES_PASSWORD=root`
- `POSTGRES_DB=db`
- `REDIS_HOST=redis`
- `NODE_ENV=production`

#### Frontend

- `VITE_API_URL=http://localhost:3000`

### API Endpoints

The backend provides the following API endpoints:

- `GET /ping` - Health check
- `POST /api/v1/users/register` - User registration
- `POST /api/v1/users/login` - User login
- `GET /api/v1/posts` - Get all posts
- `POST /api/v1/posts` - Create a new post
- And more...

### Stopping the Application

To stop all services:

```bash
docker-compose down
```

To stop and remove all data:

```bash
docker-compose down -v
```

### Troubleshooting

1. **Port conflicts**: Make sure ports 80, 3000, 5432, and 6379 are not in use
2. **Build issues**: Try `docker-compose down` and then `docker-compose up --build --force-recreate`
3. **Database connection**: The backend waits for PostgreSQL to be healthy before starting
4. **Redis connection**: The backend waits for Redis to be healthy before starting

### Network Architecture

All services run in a custom Docker network (`app-network`) which allows:

- Frontend to proxy API requests to backend
- Backend to connect to PostgreSQL and Redis using service names
- Proper service discovery and communication

The frontend uses Nginx to serve static files and proxy API requests to the backend, eliminating CORS issues and providing a seamless user experience.
