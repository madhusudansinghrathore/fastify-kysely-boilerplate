# Fastify + Kysely + Prisma Boilerplate

A production-ready backend project boilerplate using Fastify, TypeScript, Kysely, Prisma, PostgreSQL, and Redis.

## Tech Stack
- **Runtime**: Node.js v24.11.1
- **Framework**: Fastify v5.x
- **Language**: TypeScript v5.9+
- **ORM**: Prisma v7.1.0
- **Query Builder**: Kysely v0.28.8
- **Database**: PostgreSQL 18
- **Cache**: Redis 8.0

## Prerequisites
- Node.js >= 24.11.1
- Docker & Docker Compose

## Getting Started

### 1. Clone the repository
```bash
git clone <repository-url>
cd High-Performant-NodeJS-Boilerplate
```

### 2. Setup Environment Variables
Copy the example environment file:
```bash
cp .env.example .env
```
Update `.env` with your configuration if needed.

### 3. Start Infrastructure
Run the database and cache services using Docker Compose:
```bash
docker-compose up -d
```

### 4. Install Dependencies
```bash
npm install
```

### 5. Run Migrations
Apply database migrations:
```bash
npm run prisma:migrate
```
This will set up the schema in your local Postgres instance.

### 6. Run the Application
Development mode:
```bash
npm run dev
```
Production build:
```bash
npm run build
npm start
```
The server will start at `http://localhost:3000`.

## Testing
This project follows TDD. Run the test suite with:
```bash
npm test
```

## API Endpoints
- **POST /users**: Create a new user
  - Body: `{ "email": "user@example.com", "firstName": "John", "lastName": "Doe" }`
- **GET /users/:id**: Get a user by ID

## Implementation Details
- **Architecture**: SOLID principles, Service/Repository pattern.
- **Validation**: Zod + fastify-type-provider-zod.
- **Logging**: Pino (via Fastify).
