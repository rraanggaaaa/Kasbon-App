import { Debt } from "@/app/types/debt";
import { Edit, Trash2, CheckCircle, XCircle, User, TrendingUp, TrendingDown } from "lucide-react";

type Props = {
    debts: Debt[];
    onDelete: (id: string) => void;
    onToggle: (id: string, settled: boolean) => void;
};

export default function DebtTable({ debts, onDelete, onToggle }: Props) {
    return (
        <div className="overflow-x-auto rounded-2xl border border-white/20 bg-white/30 backdrop-blur-xl backdrop-saturate-150 shadow-lg shadow-emerald-500/5 dark:border-white/10 dark:bg-slate-900/40 dark:shadow-emerald-500/5">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-white/10 text-left text-sm font-medium text-slate-600 dark:border-white/5 dark:text-slate-400">
                        <th className="px-4 py-3">Nama</th>
                        <th className="px-4 py-3">Tipe</th>
                        <th className="px-4 py-3 text-right">Jumlah</th>
                        <th className="px-4 py-3 text-center">Status</th>
                        <th className="px-4 py-3 text-right">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {debts.map((debt) => (
                        <tr
                            key={debt.id}
                            className="border-b border-white/10 transition-colors hover:bg-white/20 dark:border-white/5 dark:hover:bg-white/5"
                        >
                            <td className="px-4 py-3 text-sm font-medium text-slate-900 dark:text-white">
                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4 text-slate-400" />
                                    {debt.counterpart_name}
                                </div>
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-700 dark:text-slate-300">
                                <span
                                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${debt.type === "owed_to_me"
                                            ? "bg-emerald-500/20 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-400"
                                            : "bg-rose-500/20 text-rose-700 dark:bg-rose-400/10 dark:text-rose-400"
                                        }`}
                                >
                                    {debt.type === "owed_to_me" ? (
                                        <TrendingDown className="h-3 w-3" />
                                    ) : (
                                        <TrendingUp className="h-3 w-3" />
                                    )}
                                    {debt.type === "owed_to_me" ? "Dihutang ke Saya" : "Saya Berhutang"}
                                </span>
                            </td>
                            <td className="px-4 py-3 text-right text-sm font-semibold text-slate-900 dark:text-white">
                                Rp {debt.amount.toLocaleString("id-ID")}
                            </td>
                            <td className="px-4 py-3 text-center">
                                <span
                                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${debt.settled_at
                                            ? "bg-green-500/20 text-green-700 dark:bg-green-400/10 dark:text-green-400"
                                            : "bg-amber-500/20 text-amber-700 dark:bg-amber-400/10 dark:text-amber-400"
                                        }`}
                                >
                                    {debt.settled_at ? (
                                        <CheckCircle className="h-3 w-3" />
                                    ) : (
                                        <XCircle className="h-3 w-3" />
                                    )}
                                    {debt.settled_at ? "Lunas" : "Belum Lunas"}
                                </span>
                            </td>
                            <td className="px-4 py-3 text-right">
                                <div className="flex items-center justify-end gap-1">
                                    {!debt.settled_at && (
                                        <button
                                            onClick={() => onToggle(debt.id, true)}
                                            className="rounded-lg p-2 text-emerald-500 transition-colors hover:bg-emerald-50 dark:hover:bg-emerald-400/10"
                                            title="Tandai Lunas"
                                        >
                                            <CheckCircle className="h-4 w-4" />
                                        </button>
                                    )}
                                    {debt.settled_at && (
                                        <button
                                            onClick={() => onToggle(debt.id, false)}
                                            className="rounded-lg p-2 text-amber-500 transition-colors hover:bg-amber-50 dark:hover:bg-amber-400/10"
                                            title="Batalkan Lunas"
                                        >
                                            <XCircle className="h-4 w-4" />
                                        </button>
                                    )}
                                    <button
                                        className="rounded-lg p-2 text-blue-500 transition-colors hover:bg-blue-50 dark:hover:bg-blue-400/10"
                                        title="Edit"
                                    >
                                        <Edit className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={() => onDelete(debt.id)}
                                        className="rounded-lg p-2 text-rose-500 transition-colors hover:bg-rose-50 dark:hover:bg-rose-400/10"
                                        title="Hapus"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}