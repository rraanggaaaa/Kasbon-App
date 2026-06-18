import { Loader2 } from "lucide-react";

type PayModalProps = {
    isOpen: boolean;
    amount: number;
    setAmount: (value: number) => void;
    isLoading: boolean;
    onConfirm: () => void;
    onCancel: () => void;
};

export default function PayModal({
    isOpen,
    amount,
    setAmount,
    isLoading,
    onConfirm,
    onCancel,
}: PayModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-3xl border border-white/20 bg-white/90 p-6 shadow-2xl backdrop-blur-xl backdrop-saturate-150 dark:border-white/10 dark:bg-slate-900/90">
                <h3 className="mb-2 bg-linear-to-r from-emerald-600 to-emerald-400 bg-clip-text text-xl font-bold text-transparent dark:from-emerald-400 dark:to-emerald-300">
                    Bayar Kasbon
                </h3>
                <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
                    Masukkan jumlah pembayaran
                </p>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    placeholder="Masukkan jumlah"
                    className="mb-4 w-full rounded-xl border border-white/30 bg-white/50 px-4 py-3 text-slate-900 backdrop-blur-sm transition-all focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/20 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500"
                />
                <div className="flex gap-3">
                    <button
                        onClick={onCancel}
                        className="flex-1 rounded-xl border border-white/30 bg-white/50 px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-white/70 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
                    >
                        Batal
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={amount <= 0 || isLoading}
                        className="flex-1 rounded-xl bg-linear-to-r from-emerald-500 to-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:shadow-xl hover:shadow-emerald-500/35 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                    >
                        {isLoading ? (
                            <Loader2 className="mx-auto h-5 w-5 animate-spin" />
                        ) : (
                            "Bayar"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}