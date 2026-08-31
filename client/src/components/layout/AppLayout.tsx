import { useEffect, useState } from "react";
import type { Transaction } from "../../types/transaction.ts";
import { NavLink, Outlet, useLocation } from "react-router";
import { apiUrl } from "../../lib/api.ts";

const navigationItems = [
    { to: "/dashboard", label: "Dashboard", icon: "▦" },
    { to: "/transactions", label: "Transactions", icon: "↕" },
    { to: "/budgets", label: "Budgets", icon: "◎" },
];

export function AppLayout() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const { pathname } = useLocation();
    const currentPage = navigationItems.find((item) =>
        pathname.startsWith(item.to),
    );

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await fetch(apiUrl("/api/transactions"));

                if (!response.ok) {
                    throw new Error("Failed to fetch transactions.");
                }

                const data: Transaction[] = await response.json();

                setTransactions(data);
                setError("");
            } catch {
                setError("Failed to load transactions.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    return (
        <div className="min-h-screen bg-slate-100 text-slate-900">
            <div className="flex min-h-screen">
                <aside className="hidden w-64 flex-col border-r border-slate-200 bg-white p-5 md:flex">
                    <div className="mb-10 flex items-center gap-3">
                        <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-600 font-bold text-white">
                            F
                        </div>

                        <div>
                            <p className="text-lg font-bold">FlowFunds</p>
                            <p className="text-xs text-slate-500">Personal finance</p>
                        </div>
                    </div>

                    <nav className="space-y-2">
                        {navigationItems.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                className={({ isActive }) =>
                                    [
                                        "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition",
                                        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600",
                                        isActive
                                            ? "bg-emerald-50 text-emerald-700"
                                            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                                    ].join(" ")
                                }
                            >
                                <span className="text-base">{item.icon}</span>
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>
                </aside>

                <main className="min-w-0 flex-1">
                    <header className="border-b border-slate-200 bg-white px-5 py-4 md:px-8">
                        <div className="flex items-center gap-3 md:hidden">
                            <div className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-600 text-sm font-bold text-white">
                                F
                            </div>
                            <span className="text-base font-bold">FlowFunds</span>
                        </div>

                        <h1 className="hidden text-lg font-bold md:block">
                            {currentPage?.label ?? "FlowFunds"}
                        </h1>

                        <nav className="mt-3 flex gap-1 md:hidden">
                            {navigationItems.map((item) => (
                                <NavLink
                                    key={item.to}
                                    to={item.to}
                                    className={({ isActive }) =>
                                        [
                                            "rounded-lg px-3 py-2 text-sm font-medium transition",
                                            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600",
                                            isActive
                                                ? "bg-emerald-50 text-emerald-700"
                                                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                                        ].join(" ")
                                    }
                                >
                                    {item.label}
                                </NavLink>
                            ))}
                        </nav>
                    </header>

                    <div className="p-5 md:p-8">
                        <Outlet context={{
                            transactions,
                            setTransactions,
                            isLoading,
                            error,
                        }} />
                    </div>
                </main>
            </div>
        </div>
    );
}
