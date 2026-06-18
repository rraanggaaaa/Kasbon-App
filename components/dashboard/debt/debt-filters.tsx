"use client";

import { Filter, X, Search, ChevronUp, ChevronDown, List, Users, PieChart } from "lucide-react";

type DebtFiltersProps = {
    searchQuery: string;
    setSearchQuery: (value: string) => void;
    sortBy: "name" | "amount" | "date";
    setSortBy: (value: "name" | "amount" | "date") => void;
    sortOrder: "asc" | "desc";
    setSortOrder: (value: "asc" | "desc") => void;
    statusFilter: "all" | "settled" | "unsettled";
    setStatusFilter: (value: "all" | "settled" | "unsettled") => void;
    typeFilter: "all" | "owed_to_me" | "i_owe";
    setTypeFilter: (value: "all" | "owed_to_me" | "i_owe") => void;
    viewMode: "list" | "grouped" | "chart";
    setViewMode: (value: "list" | "grouped" | "chart") => void;
    filteredCount: number;
    activeFiltersCount: number;
    resetFilters: () => void;
};

export default function DebtFilters({
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
    viewMode,
    setViewMode,
    filteredCount,
    activeFiltersCount,
    resetFilters,
}: DebtFiltersProps) {
    return (
        <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Filter:</span>
                </div>

                <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Cari nama..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full min-w-[150px] rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-700 transition-all placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500"
                    />
                </div>

                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                    className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 transition-all focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                >
                    <option value="date">Tanggal</option>
                    <option value="name">Nama</option>
                    <option value="amount">Jumlah</option>
                </select>

                <button
                    onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                    className="rounded-lg border border-slate-200 bg-white p-2 transition-all hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
                >
                    {sortOrder === "asc" ? (
                        <ChevronUp className="h-4 w-4 text-slate-600" />
                    ) : (
                        <ChevronDown className="h-4 w-4 text-slate-600" />
                    )}
                </button>

                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
                    className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 transition-all focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                >
                    <option value="all">Semua Status</option>
                    <option value="unsettled">Belum Lunas</option>
                    <option value="settled">Lunas</option>
                </select>

                <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value as typeof typeFilter)}
                    className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 transition-all focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                >
                    <option value="all">Semua Tipe</option>
                    <option value="owed_to_me">Dihutang ke Saya</option>
                    <option value="i_owe">Saya Berhutang</option>
                </select>

                {activeFiltersCount > 0 && (
                    <button
                        onClick={resetFilters}
                        className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-rose-600 transition-colors hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-400/10"
                    >
                        <X className="h-4 w-4" />
                        <span>Reset</span>
                    </button>
                )}
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={() => setViewMode("list")}
                    className={`rounded-lg px-3 py-1.5 text-sm transition-all ${viewMode === "list"
                            ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                            : "text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700"
                        }`}
                >
                    <List className="inline h-4 w-4" /> List
                </button>
                <button
                    onClick={() => setViewMode("grouped")}
                    className={`rounded-lg px-3 py-1.5 text-sm transition-all ${viewMode === "grouped"
                            ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                            : "text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700"
                        }`}
                >
                    <Users className="inline h-4 w-4" /> Group
                </button>
                <button
                    onClick={() => setViewMode("chart")}
                    className={`rounded-lg px-3 py-1.5 text-sm transition-all ${viewMode === "chart"
                            ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                            : "text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700"
                        }`}
                >
                    <PieChart className="inline h-4 w-4" />
                </button>
                <span className="ml-2 text-sm text-slate-500 dark:text-slate-400">
                    {filteredCount} kasbon
                </span>
            </div>
        </div>
    );
}