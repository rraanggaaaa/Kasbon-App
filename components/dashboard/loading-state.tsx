"use client";

import { Loader2 } from "lucide-react";

export default function LoadingState() {
    return (
        <div className="flex h-64 flex-col items-center justify-center gap-4">
            <Loader2 className="h-12 w-12 animate-spin text-emerald-500" />
            <p className="text-sm text-slate-500 dark:text-slate-400">Memuat data kasbon...</p>
        </div>
    );
}