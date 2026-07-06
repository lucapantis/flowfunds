import {useState, type FormEventHandler } from "react";
import {mockTransactions} from "../data/mockTransactions";
import type {Transaction, TransactionType} from "../types/transaction";

export function TransactionsPage() {
    const [transactions, setTransactions] = useState(mockTransactions);
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    const [type, setType] = useState<TransactionType>("expense");
    const [category, setCategory] = useState("");
    const [error, setError] = useState("");

    const handleDelete = (id: string) => {
        setTransactions((currentTransactions) =>
            currentTransactions.filter((transaction) => transaction.id !== id));

        // setTransactions(
        //   take the current list,
        //   return a new list that excludes the transaction whose id matches the clicked id
        // )
    }

    const handleSubmit: FormEventHandler = (event) => {
        event.preventDefault();

        if(Number(amount) <= 0) {
            setError("Amount must be greater than 0.");
            return;
        }

        setError("");

        const newTransaction: Transaction = {
            id: crypto.randomUUID(),
            description,
            amount: Number(amount),
            type,
            date,
            category,

        }

        setTransactions((currentTransactions) => [
            newTransaction,
            ...currentTransactions,
        ])

        setDescription("");
        setAmount("");
        setType("expense");
        setDate("");
        setCategory("");


    }
        return (
            <section>
                <h2 className="text-2xl font-bold">Tranzacții</h2>

    <form onSubmit={handleSubmit}
          className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
    >
        <div className="mb-5">
            <h3 className="text-lg font-bold">Add transaction</h3>

            <p className="mt-1 text-sm text-slate-500">
                Quickly record a new income or expense.
            </p>
        </div>

        {error && (
            <p className="mt-4 rounded-md bg-rose-50 px-3 py-2 text-sm text-rose-700">
                {error}
            </p>
        )}

        <div className="grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
            <label
                htmlFor="description"
                className="mb-1.5 block text-sm font-medium text-slate-700"
            >
                Description
            </label>

            <input
                id="description"
                type="text"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="e.g. Grocery shopping"
                className="w-full rounded-md border border-slate-300 px-3 py-2"
                required
            />
        </div>
        <div>
            <label
                htmlFor="amount"
                className="mb-1.5 block text-sm font-medium text-slate-700"
            >
                Amount
            </label>

            <input
                id="amount"
                type="number"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                placeholder="e.g. 125.50"
                min="0.01"
                step="0.01"
                required
                className="w-full rounded-md border border-slate-300 px-3 py-2"
            />
        </div>

        <div>
            <label htmlFor="type"
                   className="mb-1.5 block text-sm font-medium text-slate-700"
            >
             Type
            </label>
                <select
                    id="type"
                    value={type}
                    onChange={(event) => setType(event.target.value as TransactionType)}
                    className="w-full rounded-md border border-slate-300 px-3 py-2">
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                </select>
        </div>
        <div>
            <label
                htmlFor="date"
                className="mb-1.5 block text-sm font-medium text-slate-700"
            >
                Date
            </label>

            <input
                id="date"
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                required
                className="w-full rounded-md border border-slate-300 px-3 py-2"
            />
        </div>

        <div>
            <label
                htmlFor="category"
                className="mb-1.5 block text-sm font-medium text-slate-700"
            >
                Category
            </label>

            <input
                id="category"
                type="category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                placeholder="e.g. Food"
                required
                className="w-full rounded-md border border-slate-300 px-3 py-2"
            />
        </div>
        </div>
        <div className="mt-5 flex justify-end">
            <button
                type="submit"
                className="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
                + Add transaction
            </button>
        </div>

</form>

                <div className="mt-6 space-y-3">
                    {transactions.length === 0 ? (
                        <p>No transactions yet.</p>
                    )
                        :  (transactions.map((transaction) => (
                        <article
                            key={transaction.id}
                            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                        >
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="font-semibold">{transaction.description}</p>

                                    <p className="mt-1 text-sm text-slate-500">
                                        {transaction.category} · {transaction.date}
                                    </p>
                                </div>

                                <p className="font-bold">
                                    {transaction.type === "income" ? "+" : "−"}
                                    {transaction.amount} RON
                                </p>
                                <button
                                    type="button"
                                    onClick={() => handleDelete(transaction.id)}
                                    className="rounded-md px-3 py-1.5 text-sm font-medium text-rose-600 hover:bg-rose-50"
                                >
                                    Delete
                                </button>
                            </div>
                        </article>
                    )))}
                </div>
            </section>
        );
    }


