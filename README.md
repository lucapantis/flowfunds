# FlowFunds

FlowFunds is a fullstack personal finance tracker built with React, TypeScript, Express, Prisma, and PostgreSQL.

The goal of this project was to build a clean finance dashboard where users can track income, expenses, and their available balance, while also practicing real fullstack concepts such as API routes, database persistence, and client-server communication.

## Live Demo

Frontend demo:

https://flowfunds-two.vercel.app

> The frontend is deployed on Vercel. It expects a deployed backend API (Render) and a
> PostgreSQL database (Neon). See [Production configuration](#production-configuration) for
> how the three pieces are wired together with environment variables.

## Overview

FlowFunds allows users to manage personal transactions through a simple dashboard and transaction management interface.

Users can add income or expense transactions, delete transactions, search by description or category, and filter transactions by type or category. The dashboard automatically updates based on the current transaction data.

The backend is built with Express and TypeScript, and transaction data is stored in a PostgreSQL database through Prisma. The database connection is provided entirely through the `DATABASE_URL` environment variable, so the same code runs against a local PostgreSQL instance in development and a hosted PostgreSQL database (Neon) in production.

## Features

- Financial dashboard with income, expenses, and available balance
- Recent transactions overview
- Add new income or expense transactions
- Delete existing transactions
- Search transactions by description or category
- Filter transactions by type: income, expense, or all
- Dynamic category filter based on existing transactions
- Clear filters functionality
- Shared transaction state between Dashboard and Transactions pages
- Backend API for reading, creating, and deleting transactions
- Database persistence with Prisma and PostgreSQL
- Responsive layout for desktop and mobile

## Tech Stack

### Frontend

- React
- TypeScript
- Tailwind CSS
- React Router
- Vite

### Backend

- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL (Neon in production)

### Tools

- Git
- GitHub
- Postman
- Vercel (frontend hosting)
- Render (backend API hosting)
- Neon (PostgreSQL hosting)
- WebStorm

## Project Structure

```bash
flowfunds/
├── client/     # React frontend
├── server/     # Express backend API
├── README.md
└── .gitignore
```

## API Endpoints

### Health Check

```http
GET /api/health
```

Returns a simple response to confirm that the backend server is running.

### Get Transactions

```http
GET /api/transactions
```

Returns all transactions from the database.

### Create Transaction

```http
POST /api/transactions
```

Creates a new transaction.

Example request body:

```json
{
  "description": "Gym membership",
  "category": "Health",
  "amount": 150,
  "type": "expense",
  "date": "2026-07-20"
}
```

The backend generates the transaction ID and stores the transaction in the database.

### Delete Transaction

```http
DELETE /api/transactions/:id
```

Deletes a transaction by ID.

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/lucapantis/flowfunds.git
cd flowfunds
```

### 2. Install frontend dependencies

```bash
cd client
npm install
```

### 3. Install backend dependencies

```bash
cd ../server
npm install
```

### 4. Configure environment variables

**Backend** — copy `server/.env.example` to `server/.env` and set the values:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/flowfunds?schema=public"
PORT=3001
NODE_ENV=development
# Optional locally; the Vite dev server (http://localhost:5173) is always allowed in development.
CLIENT_ORIGIN=""
```

You need a PostgreSQL database for `DATABASE_URL`. Either:

- run PostgreSQL locally (e.g. via Docker: `docker run --name flowfunds-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=flowfunds -p 5432:5432 -d postgres:16`), or
- create a free database on [Neon](https://neon.tech) and use a development branch connection string.

**Frontend** — `client` works with no configuration in development (it falls back to
`http://localhost:3001`). To point it elsewhere, copy `client/.env.example` to
`client/.env` and set `VITE_API_URL`.

### 5. Run the database migration

From the `server` folder:

```bash
npx prisma migrate dev
```

This applies the Prisma schema to your PostgreSQL database and generates the Prisma Client.

### 6. Start the backend server

From the `server` folder:

```bash
npm run dev
```

The backend runs on `http://localhost:3001` (health check: `GET /api/health`).

### 7. Start the frontend

Open a second terminal. From the `client` folder:

```bash
npm run dev
```

The frontend runs on `http://localhost:5173`.

## Build

### Frontend build

```bash
cd client
npm run build
```

### Backend build

```bash
cd server
npm run build
```

`npm run build` runs `prisma generate` and then compiles TypeScript to `dist/`.
`npm start` runs the compiled server (`node dist/index.js`).

## Environment variables

### Backend (`server/.env`)

| Variable        | Required            | Description                                                                                     |
| --------------- | ------------------- | --------------------------------------------------------------------------------------------------|
| `DATABASE_URL`  | yes                 | PostgreSQL connection string. Local Postgres in development, Neon in production.                 |
| `PORT`          | no                  | Port the API listens on. Defaults to `3001`. Render sets this automatically.                     |
| `NODE_ENV`      | recommended         | `development` locally, `production` on Render. Controls whether localhost origins are allowed.   |
| `CLIENT_ORIGIN` | yes (production)    | Comma-separated list of browser origins allowed by CORS. In development the local Vite dev server is always allowed. |

### Frontend (`client/.env`)

| Variable       | Required         | Description                                                                                        |
| -------------- | ---------------- | ------------------------------------------------------------------------------------------------- |
| `VITE_API_URL` | yes (production) | Base URL of the deployed API, e.g. `https://flowfunds-api.onrender.com`. In development it defaults to `http://localhost:3001`. A production build without it throws at startup. |

## Production configuration

The production setup has three pieces: **Vercel** (frontend), **Render** (backend API),
and **Neon** (PostgreSQL). Deploy them in this order.

### 1. Database — Neon

1. Create a project at [neon.tech](https://neon.tech).
2. Copy the connection string (use the **pooled** connection string) from the Neon dashboard.
   It looks like `postgresql://<user>:<password>@<host>/<db>?sslmode=require`.
3. Keep it for the Render `DATABASE_URL` variable below.

### 2. Backend API — Render

Create a new **Web Service** from this repo with:

- **Root Directory:** `server`
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm run migrate:deploy && npm start`
  (`migrate:deploy` applies pending Prisma migrations to Neon; `npm start` runs the compiled server.)
- **Environment variables:**
  - `DATABASE_URL` — the Neon pooled connection string from step 1
  - `NODE_ENV` — `production`
  - `CLIENT_ORIGIN` — your Vercel frontend URL (e.g. `https://flowfunds-two.vercel.app`)
  - `PORT` — leave unset; Render provides it and the server reads `process.env.PORT`
- **Health Check Path:** `/api/health`

After the first deploy, note the service URL (e.g. `https://flowfunds-api.onrender.com`).

### 3. Frontend — Vercel

In the Vercel project settings:

- **Root Directory:** `client`
- **Environment variable:** `VITE_API_URL` = the Render service URL from step 2
  (no trailing slash), for all environments you deploy.
- Redeploy so the build picks up `VITE_API_URL`.

### 4. Verify

- Open the Vercel URL — the transactions list should load.
- Browser Network requests should go to the Render URL, not `localhost:3001`.
- `GET https://<render-url>/api/health` should return `{ "status": "ok", ... }`.

## What I Practiced

While building FlowFunds, I practiced several important frontend and backend concepts:

- React component structure
- Controlled forms
- TypeScript types and interfaces
- React Router nested routes
- Sharing state between sibling routes with Outlet context
- Searching and filtering data
- Fetching data from a backend API
- Building REST API routes with Express
- Handling GET, POST, and DELETE requests
- Testing API endpoints with Postman
- Using Prisma as an ORM
- Creating and running database migrations
- Working with PostgreSQL for persistence
- Managing project structure in a fullstack application
- Configuring a fullstack app for deployment with environment variables
- Using Git and GitHub for version control

## Current Status

FlowFunds is a fullstack application configured for deployment.

The frontend runs on Vercel, the backend API on Render, and the PostgreSQL database on Neon.
All connections between the pieces are driven by environment variables (`VITE_API_URL`,
`DATABASE_URL`, `CLIENT_ORIGIN`), so the same code runs locally and in production.
Transactions are persisted in PostgreSQL, so data remains available after refreshing the
frontend or restarting the backend server.

## Future Improvements

Some possible improvements for the future:

- Add user authentication
- Add user-specific transactions
- Add edit transaction functionality
- Improve the Budgets page
- Add charts and more advanced analytics
- Improve backend validation and error handling

## Why I Built This

I built FlowFunds to practice building a real fullstack application from frontend to backend.

The project started as a React finance dashboard with local state and gradually evolved into a fullstack app with an Express API, Prisma ORM, and database persistence. This helped me understand how data flows from the frontend, through the backend, and into a database.