// components/debt/debt-form.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar, User, DollarSign, FileText, Tag, Save, Loader2 } from "lucide-react";
import { debtSchema, type DebtInput } from "@/lib/validations/debt";

type DebtFormProps = {
    defaultValues?: Partial<DebtInput>;
    onSubmit: (values: DebtInput) => Promise<void>;
    isLoading?: boolean;
};

export default function DebtForm({
    defaultValues,
    onSubmit,
    isLoading = false,
}: DebtFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<DebtInput>({
        resolver: zodResolver(debtSchema),
        defaultValues: {
            type: "owed_to_me",
            counterpart_name: "",
            amount: 0,
            note: "",
            due_date: "",
            ...defaultValues,
        },
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Tipe */}
            <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Tipe <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                        <Tag className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                    </div>
                    <select
                        className="w-full appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-700 transition-all focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                        {...register("type")}
                        disabled={isLoading}
                    >
                        <option value="owed_to_me">Dihutang ke Saya</option>
                        <option value="i_owe">Saya Berhutang</option>
                    </select>
                </div>
                {errors.type && (
                    <p className="text-xs text-rose-500 dark:text-rose-400">
                        {errors.type.message}
                    </p>
                )}
            </div>

            {/* Nama */}
            <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Nama <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                        <User className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                    </div>
                    <input
                        type="text"
                        placeholder="Nama orang"
                        className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-700 transition-all placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500"
                        {...register("counterpart_name")}
                        disabled={isLoading}
                    />
                </div>
                {errors.counterpart_name && (
                    <p className="text-xs text-rose-500 dark:text-rose-400">
                        {errors.counterpart_name.message}
                    </p>
                )}
            </div>

            {/* Jumlah */}
            <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Jumlah (Rp) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                        <DollarSign className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                    </div>
                    <input
                        type="number"
                        placeholder="1000000"
                        className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-700 transition-all placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500"
                        {...register("amount", { valueAsNumber: true })}
                        disabled={isLoading}
                    />
                </div>
                {errors.amount && (
                    <p className="text-xs text-rose-500 dark:text-rose-400">
                        {errors.amount.message}
                    </p>
                )}
            </div>

            {/* Jatuh Tempo - Perbaikan untuk iOS */}
            <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Jatuh Tempo
                </label>
                <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                        <Calendar className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                    </div>
                    <input
                        type="date"
                        className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-700 transition-all focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                        style={{
                            minWidth: "140px",
                            WebkitAppearance: "none",
                            appearance: "none",
                        }}
                        {...register("due_date")}
                        disabled={isLoading}
                    />
                </div>
                {errors.due_date && (
                    <p className="text-xs text-rose-500 dark:text-rose-400">
                        {errors.due_date.message}
                    </p>
                )}
            </div>

            {/* Catatan */}
            <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Catatan
                </label>
                <div className="relative">
                    <div className="absolute left-3 top-3">
                        <FileText className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                    </div>
                    <textarea
                        placeholder="Catatan (opsional, max 200 karakter)"
                        rows={2}
                        className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-700 transition-all placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:placeholder:text-slate-500"
                        {...register("note")}
                        disabled={isLoading}
                    />
                </div>
                {errors.note && (
                    <p className="text-xs text-rose-500 dark:text-rose-400">
                        {errors.note.message}
                    </p>
                )}
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isLoading}
                className="group relative inline-flex h-10 w-full items-center justify-center gap-2 overflow-hidden rounded-lg bg-linear-to-r from-emerald-500 to-emerald-600 px-4 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:shadow-xl hover:shadow-emerald-500/35 disabled:opacity-70 disabled:cursor-not-allowed active:scale-95"
            >
                {isLoading ? (
                    <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Menyimpan...</span>
                    </>
                ) : (
                    <>
                        <Save className="h-4 w-4" />
                        <span>Simpan</span>
                    </>
                )}
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </button>
        </form>
    );
}