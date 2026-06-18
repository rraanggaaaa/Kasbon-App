"use client";

import { TrendingUp, TrendingDown, Wallet } from "lucide-react";

type DebtChartViewProps = {
    chartData: {
        owed: { total: number; count: number };
        owe: { total: number; count: number };
        max: number;
    };
};

export default function DebtChartView({ chartData }: DebtChartViewProps) {
    const owedPercentage = chartData.max > 0 ? (chartData.owed.total / chartData.max) * 100 : 0;
    const owePercentage = chartData.max > 0 ? (chartData.owe.total / chartData.max) * 100 : 0;

    return (
        <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/20 bg-white/30 p-5 backdrop-blur-xl backdrop-saturate-150 dark:border-white/10 dark:bg-slate-900/40">
                    <div className="flex items-center gap-3">
                        <div className="rounded-full bg-emerald-100 p-2.5 dark:bg-emerald-900/30">
                            <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Total Piutang</p>
                            <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                                Rp {chartData.owed.total.toLocaleString("id-ID")}
                            </p>
                            <p className="text-xs text-slate-400">{chartData.owed.count} transaksi</p>
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-white/20 bg-white/30 p-5 backdrop-blur-xl backdrop-saturate-150 dark:border-white/10 dark:bg-slate-900/40">
                    <div className="flex items-center gap-3">
                        <div className="rounded-full bg-rose-100 p-2.5 dark:bg-rose-900/30">
                            <TrendingDown className="h-5 w-5 text-rose-600 dark:text-rose-400" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Total Hutang</p>
                            <p className="text-lg font-bold text-rose-600 dark:text-rose-400">
                                Rp {chartData.owe.total.toLocaleString("id-ID")}
                            </p>
                            <p className="text-xs text-slate-400">{chartData.owe.count} transaksi</p>
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-white/20 bg-white/30 p-5 backdrop-blur-xl backdrop-saturate-150 dark:border-white/10 dark:bg-slate-900/40">
                    <div className="flex items-center gap-3">
                        <div className="rounded-full bg-blue-100 p-2.5 dark:bg-blue-900/30">
                            <Wallet className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Selisih</p>
                            <p className={`text-lg font-bold ${chartData.owed.total - chartData.owe.total >= 0
                                    ? "text-emerald-600 dark:text-emerald-400"
                                    : "text-rose-600 dark:text-rose-400"
                                }`}>
                                Rp {(chartData.owed.total - chartData.owe.total).toLocaleString("id-ID")}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chart */}
            <div className="rounded-2xl border border-white/20 bg-white/30 p-6 backdrop-blur-xl backdrop-saturate-150 dark:border-white/10 dark:bg-slate-900/40">
                <h3 className="mb-6 text-center font-semibold text-slate-700 dark:text-slate-300">
                    Perbandingan Total Piutang & Hutang
                </h3>

                <div className="flex flex-col gap-6">
                    {/* Piutang Bar */}
                    <div>
                        <div className="mb-1 flex items-center justify-between">
                            <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                                Piutang (Dihutang ke Saya)
                            </span>
                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                Rp {chartData.owed.total.toLocaleString("id-ID")}
                            </span>
                        </div>
                        <div className="h-8 w-full overflow-hidden rounded-lg bg-slate-200/50 dark:bg-slate-700/50">
                            <div
                                className="h-full rounded-lg bg-linear-to-r from-emerald-400 to-emerald-500 transition-all duration-1000"
                                style={{ width: `${owedPercentage}%` }}
                            />
                        </div>
                        <p className="mt-1 text-xs text-slate-400">{chartData.owed.count} transaksi</p>
                    </div>

                    {/* Hutang Bar */}
                    <div>
                        <div className="mb-1 flex items-center justify-between">
                            <span className="text-sm font-medium text-rose-600 dark:text-rose-400">
                                Hutang (Saya Berhutang)
                            </span>
                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                                Rp {chartData.owe.total.toLocaleString("id-ID")}
                            </span>
                        </div>
                        <div className="h-8 w-full overflow-hidden rounded-lg bg-slate-200/50 dark:bg-slate-700/50">
                            <div
                                className="h-full rounded-lg bg-linear-to-r from-rose-400 to-rose-500 transition-all duration-1000"
                                style={{ width: `${owePercentage}%` }}
                            />
                        </div>
                        <p className="mt-1 text-xs text-slate-400">{chartData.owe.count} transaksi</p>
                    </div>
                </div>

                {/* Legend */}
                <div className="mt-6 flex flex-wrap items-center justify-center gap-4 border-t border-slate-200/50 pt-4 dark:border-slate-700/50">
                    <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-emerald-500" />
                        <span className="text-xs text-slate-600 dark:text-slate-400">Piutang</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-rose-500" />
                        <span className="text-xs text-slate-600 dark:text-slate-400">Hutang</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-slate-300 dark:bg-slate-600" />
                        <span className="text-xs text-slate-600 dark:text-slate-400">
                            Total: Rp {(chartData.owed.total + chartData.owe.total).toLocaleString("id-ID")}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}