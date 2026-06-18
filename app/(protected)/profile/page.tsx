// app/profile/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { User, Mail, Save, Camera, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function ProfilePage() {
    const router = useRouter();
    const supabase = createClient();
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        fetchProfile();
    }, []);

    async function fetchProfile() {
        try {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (!user) {
                router.push("/login");
                return;
            }

            setUser(user);
            setEmail(user.email || "");
            setFullName(user.user_metadata?.full_name || "");
        } catch (error) {
            toast.error("Gagal memuat profil");
        } finally {
            setIsLoading(false);
        }
    }

    async function handleUpdateProfile(e: React.FormEvent) {
        e.preventDefault();
        setIsSaving(true);

        try {
            const { error } = await supabase.auth.updateUser({
                data: { full_name: fullName },
            });

            if (error) {
                toast.error(error.message);
                return;
            }

            toast.success("Profil berhasil diperbarui");
            router.refresh();
        } catch (error) {
            toast.error("Terjadi kesalahan, silakan coba lagi");
        } finally {
            setIsSaving(false);
        }
    }

    if (isLoading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
            </div>
        );
    }

    return (
        <div className="max-w-2xl">
            <div className="mb-8">
                <h1 className="bg-linear-to-r from-emerald-600 to-emerald-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent dark:from-emerald-400 dark:to-emerald-300">
                    Profile
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                    Kelola informasi akun kamu
                </p>
            </div>

            <div className="rounded-2xl border border-white/20 bg-white/30 p-6 backdrop-blur-xl backdrop-saturate-150 shadow-lg dark:border-white/10 dark:bg-slate-900/40">
                <form onSubmit={handleUpdateProfile} className="space-y-6">
                    {/* Avatar */}
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-emerald-500 to-emerald-600 text-3xl font-bold text-white">
                                {fullName.charAt(0).toUpperCase() || email.charAt(0).toUpperCase()}
                            </div>
                            <button
                                type="button"
                                className="absolute -bottom-1 -right-1 rounded-full bg-emerald-500 p-2 text-white shadow-lg transition-all hover:scale-110 hover:bg-emerald-600"
                            >
                                <Camera className="h-4 w-4" />
                            </button>
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white">
                                {fullName || "Pengguna"}
                            </h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                {email}
                            </p>
                        </div>
                    </div>

                    {/* Full Name */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Nama Lengkap
                        </label>
                        <div className="relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                <User className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                            </div>
                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="Nama lengkap kamu"
                                className="w-full rounded-xl border border-white/30 bg-white/50 py-3 pl-10 pr-4 text-slate-900 backdrop-blur-sm transition-all placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/20 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500"
                            />
                        </div>
                    </div>

                    {/* Email (Read-only) */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Email
                        </label>
                        <div className="relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                <Mail className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                            </div>
                            <input
                                type="email"
                                value={email}
                                disabled
                                className="w-full rounded-xl border border-white/30 bg-white/30 py-3 pl-10 pr-4 text-slate-500 backdrop-blur-sm dark:border-white/10 dark:bg-white/5 dark:text-slate-400"
                            />
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Email tidak dapat diubah
                        </p>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSaving}
                        className="group relative inline-flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-linear-to-r from-emerald-500 to-emerald-600 px-8 text-base font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:shadow-xl hover:shadow-emerald-500/35 disabled:opacity-70 disabled:cursor-not-allowed active:scale-95"
                    >
                        {isSaving ? (
                            <>
                                <Loader2 className="h-5 w-5 animate-spin" />
                                <span>Menyimpan...</span>
                            </>
                        ) : (
                            <>
                                <Save className="h-5 w-5" />
                                <span>Simpan Perubahan</span>
                            </>
                        )}
                        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </button>
                </form>
            </div>
        </div>
    );
}