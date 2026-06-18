"use client";

import { useState } from "react";
import { Debt } from "@/app/types/debt";
import {
    User,
    UserCheck,
    UserX,
    CheckCircle,
    Clock,
    CreditCard,
    Loader2,
    DollarSign,
    Settings2,
    Trash2,
    Calendar,
} from "lucide-react";
import DeleteDialog from "./delete-dialog";

type DebtListViewProps = {
    debts: Debt[];
    actionLoading: string | null;
    onPay: (id: string) => void;
    onEdit: (debt: Debt) => void;
    onDelete: (id: string) => void;
};

export default function DebtListView({
    debts,
    actionLoading,
    onPay,
    onEdit,
    onDelete,
}: DebtListViewProps) {
    const [deleteDialog, setDeleteDialog] = useState<{
        isOpen: boolean;
        debtId: string | null;
        debtName: string;
    }>({
        isOpen: false,
        debtId: null,
        debtName: "",
    });

    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteClick = (id: string, name: string) => {
        setDeleteDialog({
            isOpen: true,
            debtId: id,
            debtName: name,
        });
    };

    const handleDeleteConfirm = async () => {
        if (!deleteDialog.debtId) return;
        setIsDeleting(true);
        await onDelete(deleteDialog.debtId);
        setIsDeleting(false);
        setDeleteDialog({
            isOpen: false,
            debtId: null,
            debtName: "",
        });
    };

    const handleDeleteCancel = () => {
        setDeleteDialog({
            isOpen: false,
            debtId: null,
            debtName: "",
        });
    };

    return (
        <>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {debts.map((debt) => {
                    const remaining = debt.amount - (debt.paid_amount || 0);
                    return (
                        <div
                            key={debt.id}
                            className="group relative overflow-hidden rounded-2xl border border-white/20 bg-white/30 p-5 backdrop-blur-xl backdrop-saturate-150 transition-all hover:scale-[1.02] hover:bg-white/40 hover:shadow-xl dark:border-white/10 dark:bg-slate-900/40 dark:hover:bg-slate-900/50"
                        >
                            {/* Gradient accent line */}
                            <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-emerald-400 to-emerald-600 opacity-0 transition-opacity group-hover:opacity-100" />

                            <div className="flex flex-col gap-3">
                                {/* Header - Nama & Tipe */}
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="rounded-full bg-slate-100 p-2 dark:bg-slate-800">
                                            <User className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-slate-900 dark:text-white">
                                                {debt.counterpart_name}
                                            </h3>
                                            <span
                                                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${debt.type === "owed_to_me"
                                                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                                                        : "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"
                                                    }`}
                                            >
                                                {debt.type === "owed_to_me" ? (
                                                    <UserCheck className="h-3 w-3" />
                                                ) : (
                                                    <UserX className="h-3 w-3" />
                                                )}
                                                {debt.type === "owed_to_me" ? "Piutang" : "Hutang"}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Status Badge */}
                                    <span
                                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${debt.settled_at
                                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                                : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                                            }`}
                                    >
                                        {debt.settled_at ? (
                                            <CheckCircle className="h-3 w-3" />
                                        ) : (
                                            <Clock className="h-3 w-3" />
                                        )}
                                        {debt.settled_at ? "Lunas" : "Belum Lunas"}
                                    </span>
                                </div>

                                {/* Amount */}
                                <div className="flex items-end justify-between">
                                    <div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">Jumlah</p>
                                        <p className="text-2xl font-bold text-slate-900 dark:text-white">
                                            Rp {debt.amount.toLocaleString("id-ID")}
                                        </p>
                                    </div>
                                    {!debt.settled_at && debt.paid_amount > 0 && (
                                        <div className="text-right">
                                            <p className="text-xs text-slate-500 dark:text-slate-400">Sisa</p>
                                            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                                                Rp {remaining.toLocaleString("id-ID")}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Details */}
                                <div className="flex flex-wrap items-center gap-3 border-t border-slate-200/50 pt-3 dark:border-slate-700/50">
                                    {debt.due_date && (
                                        <span className="flex items-center gap-1.5 text-xs text-purple-600 dark:text-purple-400">
                                            <Calendar className="h-3.5 w-3.5" />
                                            {new Date(debt.due_date).toLocaleDateString("id-ID", {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                            })}
                                        </span>
                                    )}
                                    {debt.note && (
                                        <span className="text-xs text-slate-500 dark:text-slate-400">
                                            {debt.note.length > 30 ? debt.note.slice(0, 30) + "..." : debt.note}
                                        </span>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="flex items-center justify-end gap-1 border-t border-slate-200/50 pt-3 dark:border-slate-700/50">
                                    {!debt.settled_at && (
                                        <button
                                            onClick={() => onPay(debt.id)}
                                            disabled={actionLoading === debt.id}
                                            className="rounded-lg px-3 py-1.5 text-sm font-medium text-emerald-600 transition-colors hover:bg-emerald-50 disabled:opacity-50 dark:text-emerald-400 dark:hover:bg-emerald-900/30"
                                        >
                                            {actionLoading === debt.id ? (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                            ) : (
                                                "Bayar"
                                            )}
                                        </button>
                                    )}

                                    <button
                                        onClick={() => onEdit(debt)}
                                        className="rounded-lg px-3 py-1.5 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => handleDeleteClick(debt.id, debt.counterpart_name)}
                                        disabled={actionLoading === debt.id}
                                        className="rounded-lg px-3 py-1.5 text-sm font-medium text-rose-600 transition-colors hover:bg-rose-50 disabled:opacity-50 dark:text-rose-400 dark:hover:bg-rose-900/30"
                                    >
                                        Hapus
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Delete Dialog */}
            <DeleteDialog
                isOpen={deleteDialog.isOpen}
                isDeleting={isDeleting}
                debtName={deleteDialog.debtName}
                onConfirm={handleDeleteConfirm}
                onCancel={handleDeleteCancel}
            />
        </>
    );
}