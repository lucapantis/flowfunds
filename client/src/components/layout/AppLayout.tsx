import { useState } from "react";
import { mockTransactions} from "../../data/mockTransactions.ts";
import { NavLink, Outlet } from "react-router";

const navigationItems = [
    { to: "/dashboard", label: "Dashboard", icon: "▦" },
    { to: "/transactions", label: "Tranzacții", icon: "↕" },
    { to: "/budgets", label: "Bugete", icon: "◎" },
];

export function AppLayout() {
    const [transactions, setTransactions] = useState(mockTransactions);

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

                    <div className="mt-auto rounded-xl bg-slate-50 p-4">
                        <p className="text-sm font-semibold">Demo mode</p>
                        <p className="mt-1 text-xs leading-5 text-slate-500">
                            For now, we use mock data. We connect them to an API later.
                        </p>
                    </div>
                </aside>

                <main className="min-w-0 flex-1">
                    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 md:px-8">
                        <div>
                            <p className="text-sm text-slate-500">Welcome Back</p>
                            <h1 className="text-lg font-bold">Vlad</h1>
                        </div>

                        <div className="grid h-10 w-10 place-items-center rounded-full bg-slate-900 text-sm font-bold text-white">
                            VP
                        </div>
                    </header>

                    <div className="p-5 md:p-8">
                        <Outlet context={{ transactions, setTransactions }} />
                    </div>
                </main>
            </div>
        </div>
    );
}
