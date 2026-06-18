"use client";

import { Filter, X } from "lucide-react";

type Props = {
    status: string;
    type: string;
    onStatusChange: (value: string) => void;
    onTypeChange: (value: string) => void;
    onReset?: () => void;
};

export default function DebtFilter({
    status,
    type,
    onStatusChange,
    onTypeChange,
    onReset,
}: Props) {
    const isFilterActive = status !== "all" || type !== "all";

    return (
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Filter:</span>
            </div>

            <select
                value={status}
                onChange={(e) => onStatusChange(e.target.value)}
                className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 transition-all focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
                <option value="all">Semua Status</option>
                <option value="unsettled">Belum Lunas</option>
                <option value="settled">Lunas</option>
            </select>

            <select
                value={type}
                onChange={(e) => onTypeChange(e.target.value)}
                className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-black transition-all focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
                <option value="all">Semua Tipe</option>
                <option value="owed_to_me">Dihutang ke Saya</option>
                <option value="i_owe">Saya Berhutang</option>
            </select>

            {isFilterActive && onReset && (
                <button
                    onClick={onReset}
                    className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-rose-600 transition-colors hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-400/10"
                >
                    <X className="h-4 w-4" />
                    <span>Reset</span>
                </button>
            )}
        </div>
    );
}