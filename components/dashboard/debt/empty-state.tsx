"use client";

import { Receipt } from "lucide-react";

type EmptyStateProps = {
    hasDebts: boolean;
    onAddClick: () => void;
};

export default function EmptyState({ hasDebts, onAddClick }: EmptyStateProps) {
    return (
        <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-white/20 bg-white/30 backdrop-blur-xl backdrop-saturate-150 dark:border-white/10 dark:bg-slate-900/40">
            <div className="rounded-full bg-emerald-500/10 p-4 dark:bg-emerald-400/5">
                <Receipt className="h-12 w-12 text-emerald-500/50 dark:text-emerald-400/40" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-slate-700 dark:text-slate-300">
                {hasDebts ? "Tidak ada kasbon yang sesuai filter" : "Belum ada kasbon"}
            </h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {hasDebts
                    ? "Coba ubah filter atau reset filter"
                    : "Mulai catat utang piutangmu sekarang"}
            </p>
            {!hasDebts && (
                <button
                    onClick={onAddClick}
                    className="mt-4 rounded-xl bg-linear-to-r from-emerald-500 to-emerald-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:shadow-xl hover:shadow-emerald-500/35 active:scale-95"
                >
                    Tambah Kasbon
                </button>
            )}
        </div>
    );
}