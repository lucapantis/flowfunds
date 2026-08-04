# FlowFunds

FlowFunds is a fullstack personal finance tracker built with React, TypeScript, Express, Prisma, and SQLite.

The goal of this project was to build a clean finance dashboard where users can track income, expenses, and their available balance, while also practicing real fullstack concepts such as API routes, database persistence, and client-server communication.

## Live Demo

Frontend demo:

https://flowfunds-two.vercel.app

> Note: The deployed version currently includes the frontend only. The backend API and SQLite database are configured to run locally.

## Overview

FlowFunds allows users to manage personal transactions through a simple dashboard and transaction management interface.

Users can add income or expense transactions, delete transactions, search by description or category, and filter transactions by type or category. The dashboard automatically updates based on the current transaction data.

The backend is built with Express and TypeScript, and transaction data is stored locally using Prisma with SQLite.

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
- Local database persistence with Prisma and SQLite
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
- SQLite

### Tools

- Git
- GitHub
- Postman
- Vercel
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

### 4. Set up the database

Inside the `server` folder, create a `.env` file:

```env
DATABASE_URL="file:./dev.db"
```

Then run the Prisma migration:

```bash
npx prisma migrate dev
```

This creates the local SQLite database and the required tables.

### 5. Start the backend server

From the `server` folder:

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:3001
```

### 6. Start the frontend

Open a second terminal.

From the `client` folder:

```bash
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

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
- Working with SQLite for local persistence
- Managing project structure in a fullstack application
- Using Git and GitHub for version control

## Current Status

FlowFunds is currently a local fullstack application.

The frontend is deployed on Vercel, while the backend API and SQLite database are designed to run locally. Transactions are persisted in the local SQLite database, so data remains available after refreshing the frontend or restarting the backend server.

## Future Improvements

Some possible improvements for the future:

- Deploy the backend API
- Move from SQLite to PostgreSQL for production
- Add user authentication
- Add user-specific transactions
- Add edit transaction functionality
- Improve the Budgets page
- Add charts and more advanced analytics
- Improve backend validation and error handling

## Why I Built This

I built FlowFunds to practice building a real fullstack application from frontend to backend.

The project started as a React finance dashboard with local state and gradually evolved into a fullstack app with an Express API, Prisma ORM, and database persistence. This helped me understand how data flows from the frontend, through the backend, and into a database.