import "dotenv/config";

import express from 'express';
import cors from 'cors';

import { prisma } from './prisma.js';

type CreateTransactionBody = {
    description: string;
    category: string;
    amount: number;
    type: "income" | "expense";
    date: string;
};

const app = express();  // creates the backend app

// Render (and most hosts) inject the port to listen on via process.env.PORT.
// Fall back to 3001 for local development.
const PORT = Number(process.env.PORT) || 3001;
const isProduction = process.env.NODE_ENV === "production";

// CORS: the allowed browser origin(s) come from CLIENT_ORIGIN (comma-separated
// list supported). The local Vite dev server is only allowed in development.
const devOrigins = ["http://localhost:5173", "http://127.0.0.1:5173"];
const configuredOrigins = (process.env.CLIENT_ORIGIN ?? "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

const allowedOrigins = [
    ...configuredOrigins,
    ...(isProduction ? [] : devOrigins),
];

if (isProduction && configuredOrigins.length === 0) {
    console.warn(
        "[cors] CLIENT_ORIGIN is not set in production. Set it to your deployed frontend URL " +
            "(e.g. https://flowfunds-two.vercel.app) so the API only accepts requests from it.",
    );
}

app.use(
    cors({
        // If nothing is configured, allow any origin (keeps a misconfigured
        // deploy usable) — but the warning above makes the gap visible.
        origin: allowedOrigins.length > 0 ? allowedOrigins : true,
    }),
);  // allows front and back communication
app.use(express.json());  // allows backend to read json request bodies later

// // simple test route to prove server works
app.get("/api/health", (_req, res) => {
    res.json({
        status: "ok",
        message: "FlowFunds API is running",
    })
})

app.get("/api/transactions", async (_req, res) => {
    const transactions = await prisma.transaction.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });

    return res.json(transactions);
});

app.post("/api/transactions", async (req, res) => {
    const body = req.body as CreateTransactionBody;

    if (
        !body.description ||
        !body.category ||
        !body.amount ||
        !body.type ||
        !body.date
    ) {
        return res.status(400).json({
            message: "All fields are required",
        })
    }

    if (body.type !== "income" && body.type !== "expense") {
        return res.status(400).json({
            message: "Transaction type must be income or expense.",
        })
    }

    const newTransaction = await prisma.transaction.create({
        data: {
            description: body.description,
            category: body.category,
            amount: body.amount,
            type: body.type,
            date: body.date,
        },
    });

    return res.status(201).json(newTransaction);
})

app.delete("/api/transactions/:id", async (req, res) => {
    const { id } = req.params;

    const existingTransaction = await prisma.transaction.findUnique({
        where: {
            id,
        },
    });

    if (!existingTransaction) {
        return res.status(404).json({
            message: "Transaction not found.",
        });
    }

    await prisma.transaction.delete({
        where: {
            id,
        },
    });

    return res.status(204).send();
});

// Listen on all interfaces (0.0.0.0) so the process is reachable inside a
// deployment container as well as locally.
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
