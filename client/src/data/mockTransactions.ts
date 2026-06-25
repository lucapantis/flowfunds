import type { Transaction } from "../types/transaction.ts";

export const mockTransactions: Transaction[] = [
    {
        id: "1",
        description: "Salariu",
        category: "Salary",
        amount: 5200,
        type: "income",
        date: "2026-06-25",
    },
    {
        id: "2",
        description: "Kaufland",
        category: "Food",
        amount: 186.4,
        type: "expense",
        date: "2026-06-24",
    },
    {
        id: "3",
        description: "Abonament internet",
        category: "Utilities",
        amount: 55,
        type: "expense",
        date: "2026-06-23",
    },
    {
        id: "4",
        description: "Uber",
        category: "Transport",
        amount: 27.5,
        type: "expense",
        date: "2026-06-22",
    },
    {
        id: "5",
        description: "Freelance website",
        category: "Freelance",
        amount: 750,
        type: "income",
        date: "2026-06-20",
    },
];