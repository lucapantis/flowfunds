
export type TransactionType = "income" | "expense";

export interface Transaction {
    id: string;
    description: string;
    category: string;
    amount: number;
    type: TransactionType;
    date: string;
}

