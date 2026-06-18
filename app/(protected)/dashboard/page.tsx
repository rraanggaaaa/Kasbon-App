"use client";

import { useEffect, useState, useMemo } from "react";
import { toast } from "sonner";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import SummaryCards from "@/components/dashboard/summary-cards";
import DebtFilters from "@/components/dashboard/debt/debt-filters";
import DebtListView from "@/components/dashboard/debt/debt-list-view";
import DebtGroupView from "@/components/dashboard/debt/debt-group-view";
import DebtChartView from "@/components/dashboard/debt/debt-chart-view";
import EmptyState from "@/components/dashboard/debt/empty-state";
import LoadingState from "@/components/dashboard/loading-state";
import PayModal from "@/components/dashboard/pay-modal";
import DebtDialog from "@/components/dashboard/debt/debt-dialog";
import DebtForm from "@/components/dashboard/debt/debt-form";
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
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState<"name" | "amount" | "date">("date");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
    const [viewMode, setViewMode] = useState<"list" | "grouped" | "chart">("list");

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

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase().trim();
            result = result.filter((d) =>
                d.counterpart_name.toLowerCase().includes(query)
            );
        }

        if (sortBy === "name") {
            result.sort((a, b) => {
                const compare = a.counterpart_name.localeCompare(b.counterpart_name);
                return sortOrder === "asc" ? compare : -compare;
            });
        } else if (sortBy === "amount") {
            result.sort((a, b) => {
                const compare = a.amount - b.amount;
                return sortOrder === "asc" ? compare : -compare;
            });
        } else if (sortBy === "date") {
            result.sort((a, b) => {
                const compare = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
                return sortOrder === "asc" ? compare : -compare;
            });
        }

        setFilteredDebts(result);
    }, [debts, statusFilter, typeFilter, searchQuery, sortBy, sortOrder]);

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
        setSearchQuery("");
        setSortBy("date");
        setSortOrder("desc");
    };

    const activeFiltersCount =
        (statusFilter !== "all" ? 1 : 0) +
        (typeFilter !== "all" ? 1 : 0) +
        (searchQuery ? 1 : 0);

    const groupedDebts = useMemo(() => {
        const groups: Record<string, { debts: Debt[]; total: number; count: number }> = {};
        filteredDebts.forEach((debt) => {
            if (!groups[debt.counterpart_name]) {
                groups[debt.counterpart_name] = { debts: [], total: 0, count: 0 };
            }
            groups[debt.counterpart_name].debts.push(debt);
            groups[debt.counterpart_name].total += debt.amount;
            groups[debt.counterpart_name].count += 1;
        });
        return groups;
    }, [filteredDebts]);

    const chartData = useMemo(() => {
        const owed = debts.filter((d) => d.type === "owed_to_me" && !d.settled_at);
        const owe = debts.filter((d) => d.type === "i_owe" && !d.settled_at);
        const owedTotal = owed.reduce((sum, d) => sum + d.amount, 0);
        const oweTotal = owe.reduce((sum, d) => sum + d.amount, 0);
        const maxTotal = Math.max(owedTotal, oweTotal, 1);
        return {
            owed: { total: owedTotal, count: owed.length },
            owe: { total: oweTotal, count: owe.length },
            max: maxTotal,
        };
    }, [debts]);

    if (isLoading) {
        return <LoadingState />;
    }

    return (
        <div className="space-y-8">
            <DashboardHeader onAddClick={() => { setEditingDebt(null); setOpen(true); }} />

            <SummaryCards
                totalOwedToMe={totalOwedToMe}
                totalIOwe={totalIOwe}
                net={net}
            />

            <DebtFilters
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                sortBy={sortBy}
                setSortBy={setSortBy}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                typeFilter={typeFilter}
                setTypeFilter={setTypeFilter}
                viewMode={viewMode}
                setViewMode={setViewMode}
                filteredCount={filteredDebts.length}
                activeFiltersCount={activeFiltersCount}
                resetFilters={resetFilters}
            />

            {filteredDebts.length === 0 ? (
                <EmptyState
                    hasDebts={debts.length > 0}
                    onAddClick={() => { setEditingDebt(null); setOpen(true); }}
                />
            ) : viewMode === "chart" ? (
                <DebtChartView chartData={chartData} />
            ) : viewMode === "grouped" ? (
                <DebtGroupView groupedDebts={groupedDebts} />
            ) : (
                <DebtListView
                    debts={filteredDebts}
                    actionLoading={actionLoading}
                    onPay={openPayModal}
                    onEdit={(debt) => { setEditingDebt(debt); setOpen(true); }}
                    onDelete={handleDelete}
                />
            )}

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

            <PayModal
                isOpen={payModal.open}
                amount={payAmount}
                setAmount={setPayAmount}
                isLoading={actionLoading === payModal.debtId}
                onConfirm={handlePay}
                onCancel={() => {
                    setPayModal({ open: false, debtId: null });
                    setPayAmount(0);
                }}
            />
        </div>
    );
}