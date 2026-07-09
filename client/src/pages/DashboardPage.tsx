import { Link, useOutletContext } from "react-router";
import { type Transaction} from "../types/transaction.ts";

function formatCurrency(value: number) {
    return new Intl.NumberFormat("ro-RO", {
        style: "currency",
        currency: "RON",
        maximumFractionDigits: 2,
    }).format(value);
}

type DashboardContext = {
    transactions: Transaction[];
}

export function DashboardPage() {
 const { transactions } = useOutletContext<DashboardContext>();

    const totalIncome = transactions
        .filter((transaction) => transaction.type === "income")
        .reduce((total, transaction) => total + transaction.amount, 0);

    const totalExpenses = transactions
        .filter((transaction) => transaction.type === "expense")
        .reduce((total, transaction) => total + transaction.amount, 0);

    const balance = totalIncome - totalExpenses;

    const summaryCards = [
        {
            label: "Monthly Income",
            value: formatCurrency(totalIncome),
            description: "Total income sources",
        },
        {
            label: "Monthly Expenses",
            value: formatCurrency(totalExpenses),
            description: "Tracked expenses",
        },
        {
            label: "Available Balance",
            value: formatCurrency(balance),
            description: "Income minus expenses",
        },
    ];

    return (
        <section>
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                    <p className="text-sm font-medium text-emerald-600">July 2026</p>

                    <h2 className="mt-1 text-3xl font-bold tracking-tight">
                        Financial Overview
                    </h2>

                    <p className="mt-2 text-slate-500">
                        A quick look at your income and expenses, and available balance.
                    </p>
                </div>

                <button className="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700">
                    + Add transaction
                </button>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
                {summaryCards.map((card) => (
                    <article
                        key={card.label}
                        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                    >
                        <p className="text-sm font-medium text-slate-500">{card.label}</p>

                        <p className="mt-3 text-2xl font-bold">{card.value}</p>

                        <p className="mt-2 text-xs text-slate-400">
                            {card.description}
                        </p>
                    </article>
                ))}
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-bold">Recent Transactions</h3>

                            <p className="mt-1 text-sm text-slate-500">
                                Your latest income and expenses.
                            </p>
                        </div>
                        <Link
                            to="/transactions"
                            className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
                        >
                         View all
                        </Link>
             </div>

                    <div className="mt-6 divide-y divide-slate-100">
                        {transactions.map((transaction) => {
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
                </section>

                <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <h3 className="font-bold">Monthly Goal</h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                        Keep expenses under 4.000 RON this month.
                    </p>

                    <div className="mt-6">
                        <div className="mb-2 flex justify-between text-sm">
                            <span className="font-medium">Spent</span>

                            <span className="text-slate-500">
                {formatCurrency(totalExpenses)} / 4.000 RON
              </span>
                        </div>

                        <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                            <div className="h-full w-[7%] rounded-full bg-emerald-600" />
                        </div>

                        <p className="mt-3 text-xs text-slate-500">
                            Dynamic budgets and progress tracking coming soon.
                        </p>
                    </div>
                </aside>
            </div>
        </section>
    );
}