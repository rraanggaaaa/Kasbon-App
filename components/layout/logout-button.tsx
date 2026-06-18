// components/layout/logout-button.tsx
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
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-rose-600 transition-colors hover:bg-rose-50 disabled:opacity-50 dark:text-rose-400 dark:hover:bg-rose-400/10"
        >
            {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
                <LogOut className="h-4 w-4" />
            )}
            <span>Logout</span>
        </button>
    );
}