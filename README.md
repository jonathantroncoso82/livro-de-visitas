# Museum Visitor Book

A web application for managing museum visitor registrations. Visitors can sign a digital guest book and view recent visits.

## Project Structure

```
.
├── backend/              # Node.js Express API
│   ├── src/
│   │   └── index.js     # Main server file
│   ├── init.sql         # Database schema
│   ├── package.json
│   └── Dockerfile
├── frontend/            # React + Vite SPA
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── nginx.conf
│   └── Dockerfile
├── docker-compose.yml   # Orchestration
└── README.md
```

## Tech Stack


## Features


## API Endpoints

### POST /api/visits
Register a new visit.

**Request Body:**
```json
{
 "visitor_name": "John Doe",
 "visitor_email": "john@example.com",
 "comments": "Great museum!"
}
```

**Response (201):**
```json
{
 "id": 1,
 "visitor_name": "John Doe",
 "visitor_email": "john@example.com",
 "visit_date": "2024-01-15T10:30:00.000Z",
 "comments": "Great museum!",
 "created_at": "2024-01-15T10:30:00.000Z"
}
```

### GET /api/visits
Retrieve list of recent visits (max 100, ordered by date descending).

**Response (200):**
```json
[
 {
   "id": 1,
   "visitor_name": "John Doe",
   "visitor_email": "john@example.com",
   "visit_date": "2024-01-15T10:30:00.000Z",
   "comments": "Great museum!",
   "created_at": "2024-01-15T10:30:00.000Z"
 }
]
```

### GET /api/visits/:id
Retrieve a specific visit by ID.

**Response (200):**
```json
{
 "id": 1,
 "visitor_name": "John Doe",
 "visitor_email": "john@example.com",
 "visit_date": "2024-01-15T10:30:00.000Z",
 "comments": "Great museum!",
 "created_at": "2024-01-15T10:30:00.000Z"
}
```

## Getting Started

### Prerequisites

### Installation & Running

1. Clone the repository:
```bash
git clone <repository-url>
cd museum-visitor-book
```

2. Build and start the application:
```bash
docker compose up --build
```

3. Access the application:

### Environment Variables

Create a `.env` file in the project root (optional, defaults provided):

```env
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=museum_db
```

## Development

### Local Development (without Docker)

**Backend:**
```bash
cd backend
npm install
DB_HOST=localhost npm start
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

### Database

The database schema is automatically initialized from `backend/init.sql` when the container starts.

**Tables:**
 - `id` (SERIAL PRIMARY KEY)
 - `visitor_name` (VARCHAR 255, NOT NULL)
 - `visitor_email` (VARCHAR 255)
 - `visit_date` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)
 - `comments` (TEXT)
 - `created_at` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)

## Testing

### Health Checks

All services include health checks:

```bash
# Backend health
curl http://localhost:3000/health

# Frontend health
curl http://localhost/health

# Database health (via docker)
docker exec museum_db pg_isready -U postgres
```

### Manual Testing

```bash
# Register a visit
curl -X POST http://localhost/api/visits \
 -H "Content-Type: application/json" \
 -d '{
   "visitor_name": "Jane Smith",
   "visitor_email": "jane@example.com",
   "comments": "Wonderful experience!"
 }'

# Get all visits
curl http://localhost/api/visits

# Get specific visit
curl http://localhost/api/visits/1
```

## Troubleshooting

### Container won't start
```bash
# Check logs
docker compose logs -f

# Rebuild
docker compose down
docker compose up --build
```

### Database connection error

### Frontend not loading

## License

MIT
