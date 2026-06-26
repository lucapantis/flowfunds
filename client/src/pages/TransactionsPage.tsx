import {useState} from "react";
import {mockTransactions} from "../data/mockTransactions";

export function TransactionsPage() {
    const [transactions, setTransactions] = useState(mockTransactions);

    const handleDelete = (id: string) => {
        setTransactions((currentTransactions) =>
            currentTransactions.filter((transaction) => transaction.id !== id));

        // setTransactions(
        //   take the current list,
        //   return a new list that excludes the transaction whose id matches the clicked id
        // )
    }
        return (
            <section>
                <h2 className="text-2xl font-bold">Tranzacții</h2>

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

