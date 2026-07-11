import express from 'express';
import cors from 'cors';

import {transactions} from "./data/transactions.js";

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

// // starts backend on port 3001
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})

