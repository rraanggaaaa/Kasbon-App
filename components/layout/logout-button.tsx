"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

export default function LogoutButton() {
    const router = useRouter();
    const supabase = createClient();
    const [isLoading, setIsLoading] = useState(false);

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
        <button
            onClick={handleLogout}
            disabled={isLoading}
            className="group relative flex w-full items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-medium text-rose-600 transition-all hover:bg-rose-50 hover:text-rose-700 disabled:opacity-60 disabled:cursor-not-allowed dark:text-rose-400 dark:hover:bg-rose-400/10 dark:hover:text-rose-300"
        >
            {isLoading ? (
                <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Logout...</span>
                </>
            ) : (
                <>
                    <LogOut className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                    <span>Logout</span>
                    <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-rose-500/10 via-rose-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </>
            )}
        </button>
    );
}