import { Coins, Banknote, ArrowLeftRight } from "lucide-react";

type SummaryCardsProps = {
    totalOwedToMe: number;
    totalIOwe: number;
    net: number;
};

export default function SummaryCards({ totalOwedToMe, totalIOwe, net }: SummaryCardsProps) {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/20 bg-white/30 p-6 backdrop-blur-xl backdrop-saturate-150 shadow-lg shadow-emerald-500/5 transition-all hover:scale-[1.02] hover:shadow-emerald-500/10 dark:border-white/10 dark:bg-slate-900/40">
                <div className="flex items-center gap-4">
                    <div className="rounded-xl bg-emerald-500/20 p-3 dark:bg-emerald-400/10">
                        <Coins className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                            Dihutang ke Saya
                        </p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white">
                            Rp {totalOwedToMe.toLocaleString("id-ID")}
                        </p>
                    </div>
                </div>
            </div>

            <div className="rounded-2xl border border-white/20 bg-white/30 p-6 backdrop-blur-xl backdrop-saturate-150 shadow-lg shadow-rose-500/5 transition-all hover:scale-[1.02] hover:shadow-rose-500/10 dark:border-white/10 dark:bg-slate-900/40">
                <div className="flex items-center gap-4">
                    <div className="rounded-xl bg-rose-500/20 p-3 dark:bg-rose-400/10">
                        <Banknote className="h-6 w-6 text-rose-600 dark:text-rose-400" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                            Saya Berhutang
                        </p>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white">
                            Rp {totalIOwe.toLocaleString("id-ID")}
                        </p>
                    </div>
                </div>
            </div>

            <div className="rounded-2xl border border-white/20 bg-white/30 p-6 backdrop-blur-xl backdrop-saturate-150 shadow-lg shadow-blue-500/5 transition-all hover:scale-[1.02] hover:shadow-blue-500/10 dark:border-white/10 dark:bg-slate-900/40">
                <div className="flex items-center gap-4">
                    <div className="rounded-xl bg-blue-500/20 p-3 dark:bg-blue-400/10">
                        <ArrowLeftRight className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                            Net Balance
                        </p>
                        <p
                            className={`text-2xl font-bold ${net >= 0
                                    ? "text-emerald-600 dark:text-emerald-400"
                                    : "text-rose-600 dark:text-rose-400"
                                }`}
                        >
                            Rp {net.toLocaleString("id-ID")}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}