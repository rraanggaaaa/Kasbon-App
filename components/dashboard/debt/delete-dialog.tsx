"use client";

import { Loader2, AlertTriangle, X } from "lucide-react";

type DeleteDialogProps = {
    isOpen: boolean;
    isDeleting: boolean;
    debtName: string;
    onConfirm: () => void;
    onCancel: () => void;
};

export default function DeleteDialog({
    isOpen,
    isDeleting,
    debtName,
    onConfirm,
    onCancel,
}: DeleteDialogProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-3xl border border-white/20 bg-white/90 p-6 shadow-2xl backdrop-blur-xl backdrop-saturate-150 dark:border-white/10 dark:bg-slate-900/90">
                {/* Close Button */}
                <button
                    onClick={onCancel}
                    className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                    <X className="h-5 w-5" />
                </button>

                {/* Icon */}
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 dark:bg-rose-900/30">
                    <AlertTriangle className="h-8 w-8 text-rose-600 dark:text-rose-400" />
                </div>

                {/* Title */}
                <h3 className="mb-2 text-center text-xl font-bold text-slate-900 dark:text-white">
                    Hapus Kasbon
                </h3>

                {/* Message */}
                <p className="mb-6 text-center text-sm text-slate-600 dark:text-slate-400">
                    Apakah Anda yakin ingin menghapus kasbon dari{" "}
                    <span className="font-semibold text-slate-900 dark:text-white">
                        {debtName}
                    </span>
                    ? Tindakan ini tidak dapat dibatalkan.
                </p>

                {/* Actions */}
                <div className="flex gap-3">
                    <button
                        onClick={onCancel}
                        disabled={isDeleting}
                        className="flex-1 rounded-xl border border-white/30 bg-white/50 px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-white/70 disabled:opacity-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
                    >
                        Batal
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={isDeleting}
                        className="flex-1 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-rose-500/25 transition-all hover:shadow-xl hover:shadow-rose-500/35 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                    >
                        {isDeleting ? (
                            <Loader2 className="mx-auto h-5 w-5 animate-spin" />
                        ) : (
                            "Hapus"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}