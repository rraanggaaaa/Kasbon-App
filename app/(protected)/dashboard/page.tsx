"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
    Plus,
    Filter,
    X,
    Edit,
    Trash2,
    Loader2,
    DollarSign,
    Wallet,
    TrendingUp,
    TrendingDown,
} from "lucide-react";
import DebtDialog from "@/components/debt/debt-dialog";
import DebtForm from "@/components/debt/debt-form";
import type { DebtInput } from "@/lib/validations/debt";
import type { Debt } from "@/app/types/debt";

export default function DashboardPage() {
    const [debts, setDebts] = useState<Debt[]>([]);
    const [filteredDebts, setFilteredDebts] = useState<Debt[]>([]);
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [statusFilter, setStatusFilter] = useState<"all" | "settled" | "unsettled">("all");
    const [typeFilter, setTypeFilter] = useState<"all" | "owed_to_me" | "i_owe">("all");
    const [editingDebt, setEditingDebt] = useState<Debt | null>(null);
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const [payModal, setPayModal] = useState<{ open: boolean; debtId: string | null }>({
        open: false,
        debtId: null,
    });
    const [payAmount, setPayAmount] = useState<number>(0);

    async function fetchDebts() {
        setIsLoading(true);
        try {
            const res = await fetch("/api/debts");
            const json = await res.json();
            const data = json.data || [];
            setDebts(data);
            setFilteredDebts(data);
        } catch (error) {
            toast.error("Gagal memuat data");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchDebts();
    }, []);

    useEffect(() => {
        let result = [...debts];

        if (statusFilter === "settled") {
            result = result.filter((d) => d.settled_at !== null);
        } else if (statusFilter === "unsettled") {
            result = result.filter((d) => d.settled_at === null);
        }

        if (typeFilter !== "all") {
            result = result.filter((d) => d.type === typeFilter);
        }

        setFilteredDebts(result);
    }, [debts, statusFilter, typeFilter]);

    async function handleCreate(values: DebtInput) {
        setIsSubmitting(true);
        try {
            const res = await fetch("/api/debts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            const json = await res.json();

            if (!res.ok) {
                toast.error(json.message || "Gagal menambahkan kasbon");
                return;
            }

            toast.success("Kasbon berhasil ditambahkan");
            setOpen(false);
            fetchDebts();
        } catch (error) {
            toast.error("Terjadi kesalahan, silakan coba lagi");
        } finally {
            setIsSubmitting(false);
        }
    }

    async function handleUpdate(values: DebtInput) {
        if (!editingDebt) return;
        setIsSubmitting(true);

        try {
            const res = await fetch(`/api/debts/${editingDebt.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            const json = await res.json();

            if (!res.ok) {
                toast.error(json.message || "Gagal mengupdate kasbon");
                return;
            }

            toast.success("Kasbon berhasil diupdate");
            setOpen(false);
            setEditingDebt(null);
            fetchDebts();
        } catch (error) {
            toast.error("Terjadi kesalahan, silakan coba lagi");
        } finally {
            setIsSubmitting(false);
        }
    }

    async function handleDelete(id: string) {
        if (!confirm("Yakin ingin menghapus kasbon ini?")) return;

        setActionLoading(id);
        try {
            const res = await fetch(`/api/debts/${id}`, {
                method: "DELETE",
            });

            const json = await res.json();

            if (!res.ok) {
                toast.error(json.message || "Gagal menghapus kasbon");
                return;
            }

            toast.success("Kasbon berhasil dihapus");
            fetchDebts();
        } catch (error) {
            toast.error("Terjadi kesalahan, silakan coba lagi");
        } finally {
            setActionLoading(null);
        }
    }

    async function handlePay() {
        if (!payModal.debtId || payAmount <= 0) {
            toast.error("Masukkan jumlah pembayaran");
            return;
        }

        setActionLoading(payModal.debtId);
        try {
            const res = await fetch(`/api/debts/${payModal.debtId}/pay`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: payAmount }),
            });

            const json = await res.json();

            if (!res.ok) {
                toast.error(json.message || "Gagal membayar");
                return;
            }

            toast.success(json.message || "Pembayaran berhasil");
            setPayModal({ open: false, debtId: null });
            setPayAmount(0);
            fetchDebts();
        } catch (error) {
            toast.error("Terjadi kesalahan, silakan coba lagi");
        } finally {
            setActionLoading(null);
        }
    }

    function openPayModal(id: string) {
        const debt = debts.find((d) => d.id === id);
        if (!debt) return;
        const remaining = debt.amount - (debt.paid_amount || 0);
        setPayModal({ open: true, debtId: id });
        setPayAmount(remaining);
    }

    const totalOwedToMe = debts
        .filter((d) => d.type === "owed_to_me" && !d.settled_at)
        .reduce((sum, d) => sum + d.amount, 0);

    const totalIOwe = debts
        .filter((d) => d.type === "i_owe" && !d.settled_at)
        .reduce((sum, d) => sum + d.amount, 0);

    const net = totalOwedToMe - totalIOwe;

    const resetFilters = () => {
        setStatusFilter("all");
        setTypeFilter("all");
    };

    const activeFiltersCount = (statusFilter !== "all" ? 1 : 0) + (typeFilter !== "all" ? 1 : 0);

    return (
        <div className="space-y-8">
            {/* Header */}
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
                    onClick={() => {
                        setEditingDebt(null);
                        setOpen(true);
                    }}
                    className="group relative inline-flex h-11 items-center justify-center gap-2 overflow-hidden rounded-xl bg-linear-to-r from-emerald-500 to-emerald-600 px-6 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:shadow-xl hover:shadow-emerald-500/35 active:scale-95"
                >
                    <Plus className="h-5 w-5" />
                    <span>Tambah Kasbon</span>
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </button>
            </div>

            {/* Summary Cards - Liquid Glass */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/20 bg-white/30 p-6 backdrop-blur-xl backdrop-saturate-150 shadow-lg shadow-emerald-500/5 transition-all hover:scale-[1.02] hover:shadow-emerald-500/10 dark:border-white/10 dark:bg-slate-900/40">
                    <div className="flex items-center gap-4">
                        <div className="rounded-xl bg-emerald-500/20 p-3 dark:bg-emerald-400/10">
                            <TrendingUp className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
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
                            <TrendingDown className="h-6 w-6 text-rose-600 dark:text-rose-400" />
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
                            <Wallet className="h-6 w-6 text-blue-600 dark:text-blue-400" />
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

            {/* Filters - Liquid Glass */}
            <div className="flex flex-col gap-3 rounded-2xl border border-white/20 bg-white/30 p-4 backdrop-blur-xl backdrop-saturate-150 dark:border-white/10 dark:bg-slate-900/40 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Filter:</span>
                    </div>

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
                        className="rounded-xl border border-white/30 bg-white/50 px-4 py-2 text-sm text-slate-700 backdrop-blur-sm transition-all focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/20 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                    >
                        <option value="all">Semua Status</option>
                        <option value="unsettled">Belum Lunas</option>
                        <option value="settled">Lunas</option>
                    </select>

                    <select
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value as typeof typeFilter)}
                        className="rounded-xl border border-white/30 bg-white/50 px-4 py-2 text-sm text-slate-700 backdrop-blur-sm transition-all focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/20 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                    >
                        <option value="all">Semua Tipe</option>
                        <option value="owed_to_me">Dihutang ke Saya</option>
                        <option value="i_owe">Saya Berhutang</option>
                    </select>

                    {activeFiltersCount > 0 && (
                        <button
                            onClick={resetFilters}
                            className="inline-flex items-center gap-1 rounded-xl px-3 py-2 text-sm text-rose-600 transition-colors hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-400/10"
                        >
                            <X className="h-4 w-4" />
                            <span>Reset</span>
                        </button>
                    )}
                </div>

                <span className="text-sm text-slate-500 dark:text-slate-400">
                    {filteredDebts.length} kasbon
                </span>
            </div>

            {/* Debt List - Liquid Glass */}
            <div className="space-y-3">
                {isLoading ? (
                    <div className="flex h-32 items-center justify-center rounded-2xl border border-white/20 bg-white/30 backdrop-blur-xl backdrop-saturate-150 dark:border-white/10 dark:bg-slate-900/40">
                        <div className="flex flex-col items-center gap-3">
                            <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
                            <p className="text-sm text-slate-500 dark:text-slate-400">Memuat data...</p>
                        </div>
                    </div>
                ) : filteredDebts.length === 0 ? (
                    <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-white/20 bg-white/30 backdrop-blur-xl backdrop-saturate-150 dark:border-white/10 dark:bg-slate-900/40">
                        <div className="rounded-full bg-emerald-500/10 p-4 dark:bg-emerald-400/5">
                            <Wallet className="h-12 w-12 text-emerald-500/50 dark:text-emerald-400/40" />
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-slate-700 dark:text-slate-300">
                            {debts.length === 0 ? "Belum ada kasbon" : "Tidak ada kasbon yang sesuai filter"}
                        </h3>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            {debts.length === 0
                                ? "Mulai catat utang piutangmu sekarang"
                                : "Coba ubah filter atau reset filter"}
                        </p>
                        {debts.length === 0 && (
                            <button
                                onClick={() => {
                                    setEditingDebt(null);
                                    setOpen(true);
                                }}
                                className="mt-4 rounded-xl bg-linear-to-r from-emerald-500 to-emerald-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:shadow-xl hover:shadow-emerald-500/35 active:scale-95"
                            >
                                Tambah Kasbon
                            </button>
                        )}
                    </div>
                ) : (
                    filteredDebts.map((debt) => {
                        const remaining = debt.amount - (debt.paid_amount || 0);
                        return (
                            <div
                                key={debt.id}
                                className="group rounded-2xl border border-white/20 bg-white/30 p-5 backdrop-blur-xl backdrop-saturate-150 transition-all hover:bg-white/40 hover:shadow-lg dark:border-white/10 dark:bg-slate-900/40 dark:hover:bg-slate-900/50"
                            >
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="flex flex-1 flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
                                        <h3 className="font-semibold text-slate-900 dark:text-white">
                                            {debt.counterpart_name}
                                        </h3>
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span
                                                className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${debt.type === "owed_to_me"
                                                        ? "bg-emerald-500/20 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-400"
                                                        : "bg-rose-500/20 text-rose-700 dark:bg-rose-400/10 dark:text-rose-400"
                                                    }`}
                                            >
                                                {debt.type === "owed_to_me" ? "Dihutang ke Saya" : "Saya Berhutang"}
                                            </span>
                                            <span
                                                className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${debt.settled_at
                                                        ? "bg-green-500/20 text-green-700 dark:bg-green-400/10 dark:text-green-400"
                                                        : "bg-amber-500/20 text-amber-700 dark:bg-amber-400/10 dark:text-amber-400"
                                                    }`}
                                            >
                                                {debt.settled_at ? "Lunas" : "Belum Lunas"}
                                            </span>
                                            {!debt.settled_at && debt.paid_amount > 0 && (
                                                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/20 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-400/10 dark:text-blue-400">
                                                    Sisa: Rp {remaining.toLocaleString("id-ID")}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <p className="text-lg font-bold text-slate-900 dark:text-white">
                                            Rp {debt.amount.toLocaleString("id-ID")}
                                        </p>

                                        <div className="flex items-center gap-1">
                                            {!debt.settled_at && (
                                                <button
                                                    onClick={() => openPayModal(debt.id)}
                                                    disabled={actionLoading === debt.id}
                                                    className="rounded-lg p-2 text-emerald-500 transition-colors hover:bg-emerald-50 dark:hover:bg-emerald-400/10 disabled:opacity-50"
                                                    title="Bayar"
                                                >
                                                    {actionLoading === debt.id ? (
                                                        <Loader2 className="h-4 w-4 animate-spin" />
                                                    ) : (
                                                        <DollarSign className="h-4 w-4" />
                                                    )}
                                                </button>
                                            )}

                                            <button
                                                onClick={() => {
                                                    setEditingDebt(debt);
                                                    setOpen(true);
                                                }}
                                                className="rounded-lg p-2 text-blue-500 transition-colors hover:bg-blue-50 dark:hover:bg-blue-400/10"
                                                title="Edit"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </button>

                                            <button
                                                onClick={() => handleDelete(debt.id)}
                                                disabled={actionLoading === debt.id}
                                                className="rounded-lg p-2 text-rose-500 transition-colors hover:bg-rose-50 dark:hover:bg-rose-400/10 disabled:opacity-50"
                                                title="Hapus"
                                            >
                                                {actionLoading === debt.id ? (
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                ) : (
                                                    <Trash2 className="h-4 w-4" />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {debt.note && (
                                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{debt.note}</p>
                                )}
                            </div>
                        );
                    })
                )}
            </div>

            {/* Debt Dialog */}
            <DebtDialog
                open={open}
                onOpenChange={(open) => {
                    setOpen(open);
                    if (!open) setEditingDebt(null);
                }}
                title={editingDebt ? "Edit Kasbon" : "Tambah Kasbon"}
            >
                <DebtForm
                    defaultValues={editingDebt || undefined}
                    onSubmit={editingDebt ? handleUpdate : handleCreate}
                    isLoading={isSubmitting}
                />
            </DebtDialog>

            {/* Pay Modal - Liquid Glass */}
            {payModal.open && (
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
                            value={payAmount}
                            onChange={(e) => setPayAmount(Number(e.target.value))}
                            placeholder="Masukkan jumlah"
                            className="mb-4 w-full rounded-xl border border-white/30 bg-white/50 px-4 py-3 text-slate-900 backdrop-blur-sm transition-all focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/20 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500"
                        />
                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    setPayModal({ open: false, debtId: null });
                                    setPayAmount(0);
                                }}
                                className="flex-1 rounded-xl border border-white/30 bg-white/50 px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-white/70 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handlePay}
                                disabled={payAmount <= 0 || actionLoading === payModal.debtId}
                                className="flex-1 rounded-xl bg-linear-to-r from-emerald-500 to-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:shadow-xl hover:shadow-emerald-500/35 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                            >
                                {actionLoading === payModal.debtId ? (
                                    <Loader2 className="mx-auto h-5 w-5 animate-spin" />
                                ) : (
                                    "Bayar"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}