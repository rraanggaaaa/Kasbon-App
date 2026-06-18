"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Mail,
    LogOut,
    ChevronDown,
    Settings,
    UserCircle,
} from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

type ProfileDropdownProps = {
    email: string;
    name?: string;
    avatarUrl?: string | null;
};

export default function ProfileDropdown({
    email,
    name,
    avatarUrl
}: ProfileDropdownProps) {
    const router = useRouter();
    const supabase = createClient();
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const displayName = name || email.split("@")[0];

    async function handleLogout() {
        setIsLoading(true);
        try {
            const { error } = await supabase.auth.signOut();

            if (error) {
                toast.error(error.message);
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
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 rounded-full border border-white/20 bg-white/30 px-2 py-1.5 backdrop-blur-sm transition-all hover:bg-white/50 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
            >
                {avatarUrl ? (
                    <img
                        src={avatarUrl}
                        alt={displayName}
                        className="h-8 w-8 rounded-full object-cover"
                    />
                ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-sm font-semibold text-white">
                        {displayName.charAt(0).toUpperCase()}
                    </div>
                )}
                <span className="hidden text-sm font-medium text-slate-700 dark:text-slate-300 sm:block">
                    {displayName}
                </span>
                <ChevronDown
                    className={`h-4 w-4 text-slate-500 transition-transform duration-200 dark:text-slate-400 ${isOpen ? "rotate-180" : ""
                        }`}
                />
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />

                    <div className="absolute right-0 z-50 mt-2 w-56 rounded-2xl border border-white/20 bg-white/90 p-1.5 shadow-2xl shadow-emerald-500/5 backdrop-blur-xl backdrop-saturate-150 dark:border-white/10 dark:bg-slate-900/90">
                        <div className="border-b border-white/10 px-3 py-3 dark:border-white/5">
                            <p className="text-sm font-medium text-slate-900 dark:text-white">
                                {displayName}
                            </p>
                            <p className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                                <Mail className="h-3 w-3" />
                                {email}
                            </p>
                        </div>

                        <div className="py-1">
                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    router.push("/profile");
                                }}
                                className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/50"
                            >
                                <UserCircle className="h-4 w-4" />
                                <span>Profile</span>
                            </button>
                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    router.push("/settings");
                                }}
                                className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/50"
                            >
                                <Settings className="h-4 w-4" />
                                <span>Settings</span>
                            </button>
                        </div>

                        <div className="border-t border-white/10 dark:border-white/5" />

                        <div className="py-1">
                            <button
                                onClick={handleLogout}
                                disabled={isLoading}
                                className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-rose-600 transition-colors hover:bg-rose-50 disabled:opacity-60 dark:text-rose-400 dark:hover:bg-rose-400/10"
                            >
                                {isLoading ? (
                                    <>
                                        <svg
                                            className="h-4 w-4 animate-spin"
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
                                        <LogOut className="h-4 w-4" />
                                        <span>Logout</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}