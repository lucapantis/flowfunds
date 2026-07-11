import type { Transaction } from "../types/transaction.js";

export const transactions: Transaction[] = [
    {
        id: "1",
        description: "Salary",
        category: "Income",
        amount: 4500,
        type: "income",
        date: "2026-06-01",
    },
    {
        id: "2",
        description: "Groceries",
        category: "Food",
        amount: 268.9,
        type: "expense",
        date: "2026-06-03",
    },
    {
        id: "3",
        description: "Freelance project",
        category: "Income",
        amount: 2200,
        type: "income",
        date: "2026-06-07",
    },
    {
        id: "4",
        description: "Transport",
        category: "Transport",
        amount: 120,
        type: "expense",
        date: "2026-06-10",
    },
]