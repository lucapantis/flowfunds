import { Link, useOutletContext } from "react-router";
import { type Transaction } from "../types/transaction.ts";

const RECENT_TRANSACTIONS_LIMIT = 5;

function formatCurrency(value: number) {
    return new Intl.NumberFormat("ro-RO", {
        style: "currency",
        currency: "RON",
        maximumFractionDigits: 2,
    }).format(value);
}

type DashboardContext = {
    transactions: Transaction[];
    isLoading: boolean;
    error: string;
};

export function DashboardPage() {
    const { transactions, isLoading, error } = useOutletContext<DashboardContext>();

    const totalIncome = transactions
        .filter((transaction) => transaction.type === "income")
        .reduce((total, transaction) => total + transaction.amount, 0);

    const totalExpenses = transactions
        .filter((transaction) => transaction.type === "expense")
        .reduce((total, transaction) => total + transaction.amount, 0);

    const balance = totalIncome - totalExpenses;

    const recentTransactions = transactions.slice(0, RECENT_TRANSACTIONS_LIMIT);

    const summaryCards = [
        {
            label: "Total income",
            value: formatCurrency(totalIncome),
            description: "Total income sources",
        },
        {
            label: "Total expenses",
            value: formatCurrency(totalExpenses),
            description: "Tracked expenses",
        },
        {
            label: "Available balance",
            value: formatCurrency(balance),
            description: "Income minus expenses",
        },
    ];

    return (
        <section>
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">
                        Financial Overview
                    </h2>

                    <p className="mt-2 text-slate-500">
                        A quick look at your income and expenses, and available balance.
                    </p>
                </div>

                <Link
                    to="/transactions"
                    className="inline-flex shrink-0 items-center justify-center rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                >
                    + Add transaction
                </Link>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
                {summaryCards.map((card) => (
                    <article
                        key={card.label}
                        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                    >
                        <p className="text-sm font-medium text-slate-500">{card.label}</p>

                        <p className="mt-3 text-2xl font-bold">
                            {isLoading || error ? "—" : card.value}
                        </p>

                        <p className="mt-2 text-xs text-slate-400">
                            {card.description}
                        </p>
                    </article>
                ))}
            </div>

            <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-bold">Recent Transactions</h3>

                        <p className="mt-1 text-sm text-slate-500">
                            Your latest income and expenses.
                        </p>
                    </div>
                    <Link
                        to="/transactions"
                        className="rounded text-sm font-medium text-emerald-600 hover:text-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                    >
                        View all
                    </Link>
                </div>

                {isLoading ? (
                    <p className="mt-6 text-sm text-slate-500">Loading transactions…</p>
                ) : error ? (
                    <p className="mt-6 rounded-md bg-rose-50 px-4 py-3 text-sm text-rose-700">
                        {error}
                    </p>
                ) : recentTransactions.length === 0 ? (
                    <p className="mt-6 text-sm text-slate-500">
                        No transactions yet. Add your first one from the Transactions page.
                    </p>
                ) : (
                    <div className="mt-6 divide-y divide-slate-100">
                        {recentTransactions.map((transaction) => {
                            const isIncome = transaction.type === "income";

                            return (
                                <div
                                    key={transaction.id}
                                    className="flex items-center justify-between gap-4 py-4"
                                >
                                    <div className="flex min-w-0 items-center gap-3">
                                        <div
                                            className={[
                                                "grid h-10 w-10 shrink-0 place-items-center rounded-full text-sm font-bold",
                                                isIncome
                                                    ? "bg-emerald-50 text-emerald-700"
                                                    : "bg-rose-50 text-rose-700",
                                            ].join(" ")}
                                        >
                                            {isIncome ? "+" : "−"}
                                        </div>

                                        <div className="min-w-0">
                                            <p className="truncate font-semibold">
                                                {transaction.description}
                                            </p>

                                            <p className="mt-1 text-sm text-slate-500">
                                                {transaction.category} · {transaction.date}
                                            </p>
                                        </div>
                                    </div>

                                    <p
                                        className={[
                                            "shrink-0 font-bold",
                                            isIncome ? "text-emerald-700" : "text-slate-900",
                                        ].join(" ")}
                                    >
                                        {isIncome ? "+" : "−"}
                                        {formatCurrency(transaction.amount)}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>
        </section>
    );
}
