"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { loginSchema, type LoginSchema } from "@/lib/validations/auth";
import { translateAuthError } from "@/lib/utils/auth-error";

export default function LoginPage() {
    const router = useRouter();
    const supabase = createClient();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: LoginSchema) => {
        setIsLoading(true);
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email: values.email,
                password: values.password,
            });

            if (error) {
                toast.error(translateAuthError(error.message));
                return;
            }

            toast.success("Login berhasil!");
            router.push("/dashboard");
            router.refresh();
        } catch (error) {
            toast.error("Terjadi kesalahan, silakan coba lagi");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-linear-to-br from-slate-50 via-white to-emerald-50/30 px-4 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950/20">
            {/* Animated Background Orbs */}
            <div className="absolute -left-[20%] top-[-10%] h-[600px] w-[600px] rounded-full bg-emerald-400/20 blur-3xl dark:bg-emerald-500/10" />
            <div className="absolute -right-[20%] bottom-[-10%] h-[600px] w-[600px] rounded-full bg-blue-400/20 blur-3xl dark:bg-blue-500/10" />
            <div className="absolute left-[30%] top-[50%] h-[300px] w-[300px] rounded-full bg-violet-400/10 blur-3xl dark:bg-violet-500/5" />

            {/* Glass Card */}
            <div className="relative w-full max-w-md rounded-3xl border border-white/20 bg-white/30 p-8 backdrop-blur-xl backdrop-saturate-150 shadow-2xl shadow-emerald-500/10 dark:border-white/10 dark:bg-slate-900/40 dark:shadow-emerald-500/5 sm:p-10">
                {/* Back Button */}
                <Link
                    href="/"
                    className="absolute left-4 top-4 rounded-lg border border-white/30 bg-white/40 p-2 transition-all hover:scale-105 hover:bg-white/60 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 sm:left-6 sm:top-6"
                >
                    <ArrowRight className="h-4 w-4 rotate-180 text-slate-600 dark:text-slate-400" />
                </Link>

                {/* Header */}
                <div className="mb-8 flex flex-col items-center gap-2 text-center">
                    <div className="relative">
                        <div className="absolute -inset-6 rounded-full bg-linear-to-r from-emerald-400/20 via-emerald-300/10 to-emerald-400/20 blur-2xl" />
                        <div className="relative rounded-2xl border border-white/30 bg-white/40 p-2 shadow-lg backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
                            <Image
                                className="relative"
                                src="/kasbon.png"
                                alt="Kasbon logo"
                                width={100}
                                height={100}
                                priority
                            />
                        </div>
                    </div>
                    <h1 className="bg-linear-to-r from-emerald-600 to-emerald-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent dark:from-emerald-400 dark:to-emerald-300">
                        Selamat Datang
                    </h1>
                    <p className="text-sm text-slate-600/80 dark:text-slate-400/80">
                        Masuk untuk kelola keuanganmu
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Email Field */}
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
                                placeholder="Masukkan email kamu"
                                className="w-full rounded-xl border border-white/30 bg-white/50 py-3 pl-10 pr-4 text-slate-900 backdrop-blur-sm transition-all placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/20 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500"
                                {...register("email")}
                                disabled={isLoading}
                            />
                        </div>
                        {errors.email && (
                            <p className="text-sm text-rose-500 dark:text-rose-400">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                Password
                            </label>
                            <Link
                                href="/forgot-password"
                                className="text-xs text-emerald-600 transition-colors hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
                            >
                                Lupa password?
                            </Link>
                        </div>
                        <div className="relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                <Lock className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Masukkan password"
                                className="w-full rounded-xl border border-white/30 bg-white/50 py-3 pl-10 pr-12 text-slate-900 backdrop-blur-sm transition-all placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/20 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500"
                                {...register("password")}
                                disabled={isLoading}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600 dark:hover:text-slate-300"
                                disabled={isLoading}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5" />
                                ) : (
                                    <Eye className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-sm text-rose-500 dark:text-rose-400">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="group relative inline-flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-linear-to-r from-emerald-500 to-emerald-600 px-8 text-base font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:shadow-xl hover:shadow-emerald-500/35 disabled:opacity-70 disabled:cursor-not-allowed active:scale-95"
                    >
                        {isLoading ? (
                            <>
                                <svg
                                    className="h-5 w-5 animate-spin text-white"
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
                                <span>Memproses...</span>
                            </>
                        ) : (
                            <>
                                <span>Masuk</span>
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </>
                        )}
                        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </button>
                </form>

                {/* Sign Up Link */}
                <div className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
                    Belum punya akun?{" "}
                    <Link
                        href="/signup"
                        className="font-medium text-emerald-600 transition-colors hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
                    >
                        Daftar sekarang
                    </Link>
                </div>

                {/* Divider */}
                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/30 dark:border-white/10" />
                    </div>
                </div>
            </div>
        </div>
    );
}