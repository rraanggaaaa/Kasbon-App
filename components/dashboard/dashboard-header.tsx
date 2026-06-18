"use client";

import { Plus } from "lucide-react";

type DashboardHeaderProps = {
    onAddClick: () => void;
};

export default function DashboardHeader({ onAddClick }: DashboardHeaderProps) {
    return (
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
                <h1 className="bg-linear-to-r from-emerald-600 to-emerald-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent dark:from-emerald-400 dark:to-emerald-300">
                    Dashboard
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                    Kelola utang piutangmu dengan mudah
                </p>
            </div>
            <button
                onClick={onAddClick}
                className="group relative inline-flex h-11 items-center justify-center gap-2 overflow-visible rounded-xl bg-linear-to-r from-emerald-500 to-emerald-600 px-6 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:shadow-xl hover:shadow-emerald-500/35 active:scale-95"
            >
                <Plus className="h-5 w-5 relative z-10" />
                <span className="relative z-10">Tambah Kasbon</span>
</button>
        </div>
    );
}