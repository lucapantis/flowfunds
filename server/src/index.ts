import express from 'express';
import cors from 'cors';

import {transactions} from "./data/transactions.js";

type CreateTransactionBody = {
    description: string;
    category: string;
    amount: number;
    type: "income" | "expense";
    date: string;
};

const app = express();  // creates the backend app
const PORT = 3001;

app.use(cors());  // allows front and back communication
app.use(express.json());  // allows backend to read json request bodies later

// // simple test route to prove server works
app.get("/api/health", (req, res) => {
    res.json({
        status: "ok",
        message: "FlowFunds API is running",
    })
})

app.get("/api/transactions", (req, res) => {
    res.json(transactions);
})

app.post("/api/transactions", (req, res) => {
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

    const newTransaction = {
        id: crypto.randomUUID(),
        description: body.description,
        category: body.category,
        amount: body.amount,
        type: body.type,
        date: body.date,
    }

    transactions.unshift(newTransaction)

    return res.status(201).json(newTransaction)
})

// // starts backend on port 3001
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})

