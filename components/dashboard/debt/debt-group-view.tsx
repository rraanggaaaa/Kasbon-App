"use client";

import { Debt } from "@/app/types/debt";
import {
    User,
    ArrowDownCircle,
    ArrowUpCircle,
    CheckCircle2,
    Calendar,
    Clock,
    ChevronDown,
    ChevronUp,
    XCircle,
} from "lucide-react";
import { useState } from "react";

type DebtGroupViewProps = {
    groupedDebts: Record<string, { debts: Debt[]; total: number; count: number }>;
};

export default function DebtGroupView({ groupedDebts }: DebtGroupViewProps) {
    const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

    const toggleGroup = (name: string) => {
        setExpandedGroups((prev) => ({
            ...prev,
            [name]: !prev[name],
        }));
    };

    return (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {Object.entries(groupedDebts).map(([name, group]) => {
                const isExpanded = expandedGroups[name] || false;
                const displayDebts = isExpanded ? group.debts : group.debts.slice(0, 3);
                const hasMore = group.debts.length > 3;
                const unsettledCount = group.debts.filter((d) => !d.settled_at).length;

                return (
                    <div
                        key={name}
                        className="overflow-hidden rounded-2xl border border-white/20 bg-white/30 backdrop-blur-xl backdrop-saturate-150 transition-all hover:shadow-xl dark:border-white/10 dark:bg-slate-900/40"
                    >
                        {/* Header */}
                        <div
                            className="cursor-pointer p-4 transition-colors hover:bg-white/20 dark:hover:bg-white/5"
                            onClick={() => toggleGroup(name)}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-full bg-emerald-100 p-2 dark:bg-emerald-900/30">
                                        <User className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900 dark:text-white">
                                            {name}
                                        </h3>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">
                                            {group.count} transaksi • Total Rp {group.total.toLocaleString("id-ID")}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {unsettledCount > 0 && (
                                        <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                                            {unsettledCount} belum lunas
                                        </span>
                                    )}
                                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                                        {group.count} kasbon
                                    </span>
                                    {hasMore && (
                                        <button className="rounded-lg p-1 hover:bg-slate-100 dark:hover:bg-slate-800">
                                            {isExpanded ? (
                                                <ChevronUp className="h-4 w-4 text-slate-500" />
                                            ) : (
                                                <ChevronDown className="h-4 w-4 text-slate-500" />
                                            )}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Debt Items */}
                        <div className="divide-y divide-slate-200/50 dark:divide-slate-700/50">
                            {displayDebts.map((debt) => (
                                <div key={debt.id} className="flex items-center justify-between px-4 py-3 transition-colors hover:bg-white/20 dark:hover:bg-white/5">
                                    <div className="flex items-center gap-3">
                                        <span className="text-slate-600 dark:text-slate-400">
                                            {debt.type === "owed_to_me" ? (
                                                <ArrowDownCircle className="h-4 w-4 text-emerald-500" />
                                            ) : (
                                                <ArrowUpCircle className="h-4 w-4 text-rose-500" />
                                            )}
                                        </span>
                                        <div>
                                            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                                Rp {debt.amount.toLocaleString("id-ID")}
                                            </p>
                                            <div className="flex items-center gap-2 flex-wrap">
                                                {debt.settled_at ? (
                                                    <span className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                                                        <CheckCircle2 className="h-3 w-3" />
                                                        Lunas
                                                    </span>
                                                ) : (
                                                    <span className="flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400">
                                                        <XCircle className="h-3 w-3" />
                                                        Belum Lunas
                                                    </span>
                                                )}
                                                {debt.due_date && (
                                                    <span className="flex items-center gap-1 text-xs text-purple-600 dark:text-purple-400">
                                                        <Clock className="h-3 w-3" />
                                                        {new Date(debt.due_date).toLocaleDateString("id-ID")}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <span className="text-xs text-slate-400">
                                        <Calendar className="inline h-3 w-3" />{" "}
                                        {new Date(debt.created_at).toLocaleDateString("id-ID")}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Show more/less */}
                        {hasMore && (
                            <button
                                onClick={() => toggleGroup(name)}
                                className="w-full py-2 text-center text-sm font-medium text-emerald-600 transition-colors hover:bg-white/20 dark:text-emerald-400 dark:hover:bg-white/5"
                            >
                                {isExpanded ? "Tampilkan lebih sedikit" : `Tampilkan ${group.debts.length - 3} lainnya`}
                            </button>
                        )}
                    </div>
                );
            })}
        </div>
    );
}