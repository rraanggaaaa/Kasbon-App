"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export default function LogoutButton() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    async function handleLogout() {
        setIsLoading(true);
        try {
            const res = await fetch("/api/auth/logout", {
                method: "POST",
            });

            const json = await res.json();

            if (!res.ok) {
                toast.error(json.message ?? "Gagal logout");
                return;
            }

            toast.success("Logout berhasil");
            router.replace("/login");
            router.refresh();
        } catch (error) {
            toast.error("Terjadi kesalahan, silakan coba lagi");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <button
            onClick={handleLogout}
            disabled={isLoading}
            className="group relative flex w-full items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-medium text-rose-600 transition-all hover:bg-rose-50 hover:text-rose-700 disabled:opacity-70 disabled:cursor-not-allowed dark:text-rose-400 dark:hover:bg-rose-400/10 dark:hover:text-rose-300"
        >
            {isLoading ? (
                <>
                    <svg
                        className="h-4 w-4 animate-spin text-rose-600 dark:text-rose-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                    <span>Logout...</span>
                </>
            ) : (
                <>
                    <LogOut className="h-4 w-4 transition-transform group-hover:scale-110" />
                    <span>Logout</span>
                    <div className="absolute inset-0 rounded-xl bg-linear-to-r from-rose-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                </>
            )}
        </button>
    );
}