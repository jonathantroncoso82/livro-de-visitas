# Museum Visitor Book

A full-stack web application for managing museum visitor signatures and comments.

## Architecture

- **Frontend**: React 18 + Vite (SPA)
- **Backend**: Node.js 18 + Express.js (REST API)
- **Database**: PostgreSQL 15
- **Containerization**: Docker + Docker Compose

## Quick Start

### Prerequisites
- Docker and Docker Compose installed

### Running the Application

```bash
docker compose up --build
```

The application will be available at:
- **Frontend**: http://localhost
- **Backend API**: http://localhost:3000
- **Database**: localhost:5432

### Stopping the Application

```bash
docker compose down
```

## Project Structure

```
.
├── docker-compose.yml          # Docker Compose configuration
├── backend/
│   ├── Dockerfile              # Backend container image
│   ├── package.json            # Node.js dependencies
│   ├── src/
│   │   └── index.js            # Express server entry point
│   └── init.sql                # Database schema initialization
├── frontend/
│   ├── Dockerfile              # Frontend container image
│   ├── package.json            # React dependencies
│   ├── vite.config.js          # Vite configuration
│   ├── index.html              # HTML entry point
│   ├── nginx.conf              # Nginx configuration
│   └── src/
│       ├── main.jsx            # React entry point
│       ├── App.jsx             # Main React component
│       └── App.css             # Styles
└── README.md                   # This file
```

## API Endpoints

### Visitors

- `GET /api/visitors` - Get all visitors
- `GET /api/visitors/:id` - Get visitor by ID
- `POST /api/visitors` - Create new visitor
- `PUT /api/visitors/:id` - Update visitor
- `DELETE /api/visitors/:id` - Delete visitor

### Health Check

- `GET /health` - API health status

## Database Schema

### visitors table

```sql
CREATE TABLE visitors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  visit_date TIMESTAMP DEFAULT NOW(),
  comments TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Environment Variables

### Backend

- `NODE_ENV` - Environment (production/development)
- `DB_HOST` - PostgreSQL host
- `DB_PORT` - PostgreSQL port
- `DB_USER` - PostgreSQL user
- `DB_PASSWORD` - PostgreSQL password
- `DB_NAME` - PostgreSQL database name
- `API_PORT` - API server port

### Frontend

- `VITE_API_URL` - Backend API URL (build-time variable)

## Development

### Backend Development

```bash
cd backend
npm install
npm run dev
```

### Frontend Development

```bash
cd frontend
npm install
npm run dev
```

## Features

- ✅ Add visitor signatures with name, email, and comments
- ✅ View all visitor entries with timestamps
- ✅ Edit existing visitor information
- ✅ Delete visitor entries
- ✅ Responsive design for mobile and desktop
- ✅ Real-time API communication
- ✅ Database persistence
- ✅ Docker containerization for easy deployment

## License

MIT
