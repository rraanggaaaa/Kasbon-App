"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
    Eye,
    EyeOff,
    Mail,
    Lock,
    ArrowRight,
    Sparkles,
    CheckCircle2,
    XCircle
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { registerSchema, type RegisterSchema } from "@/lib/validations/auth";
import { translateAuthError } from "@/lib/utils/auth-error";

export default function SignupPage() {
    const router = useRouter();
    const supabase = createClient();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [agreeTerms, setAgreeTerms] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const watchedPassword = watch("password", "");

    // Password validation checks
    const hasMinLength = watchedPassword.length >= 8;
    const hasUpperCase = /[A-Z]/.test(watchedPassword);
    const hasLowerCase = /[a-z]/.test(watchedPassword);
    const hasNumber = /[0-9]/.test(watchedPassword);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(watchedPassword);

    const onSubmit = async (values: RegisterSchema) => {
        if (!agreeTerms) {
            toast.error("Kamu harus menyetujui Syarat & Ketentuan");
            return;
        }

        setIsLoading(true);
        try {
            const { error } = await supabase.auth.signUp({
                email: values.email,
                password: values.password,
            });

            if (error) {
                toast.error(translateAuthError(error.message));
                return;
            }

            toast.success("Akun berhasil dibuat! Silakan login.");
            router.push("/login");
        } catch (error) {
            toast.error("Terjadi kesalahan, silakan coba lagi");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 px-4 py-8 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950/20">
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
                        <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-emerald-400/20 via-emerald-300/10 to-emerald-400/20 blur-2xl" />
                        <div className="relative rounded-2xl border border-white/30 bg-white/40 p-2 shadow-lg backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
                            <Image
                                className="relative dark:invert"
                                src="/kasbon.png"
                                alt="Kasbon logo"
                                width={100}
                                height={100}
                                priority
                            />
                        </div>
                    </div>
                    <h1 className="bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent dark:from-emerald-400 dark:to-emerald-300">
                        Buat Akun Baru
                    </h1>
                    <p className="text-sm text-slate-600/80 dark:text-slate-400/80">
                        Mulai kelola keuangan dengan mudah
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
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Password
                        </label>
                        <div className="relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                <Lock className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Buat password kuat"
                                className="w-full rounded-xl border border-white/30 bg-white/50 py-3 pl-10 pr-12 text-slate-900 backdrop-blur-sm transition-all placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/20 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500"
                                {...register("password")}
                                onChange={(e) => setPassword(e.target.value)}
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

                        {/* Password Requirements */}
                        {watchedPassword.length > 0 && (
                            <div className="mt-3 space-y-1.5 rounded-xl border border-white/30 bg-white/40 p-3 backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
                                <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
                                    Password harus mengandung:
                                </p>
                                <div className="grid grid-cols-2 gap-1.5 text-xs">
                                    <PasswordRequirement
                                        met={hasMinLength}
                                        text="Minimal 8 karakter"
                                    />
                                    <PasswordRequirement
                                        met={hasUpperCase}
                                        text="Huruf besar"
                                    />
                                    <PasswordRequirement
                                        met={hasLowerCase}
                                        text="Huruf kecil"
                                    />
                                    <PasswordRequirement
                                        met={hasNumber}
                                        text="Angka"
                                    />
                                    <PasswordRequirement
                                        met={hasSpecialChar}
                                        text="Simbol (!@#$...)"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Confirm Password Field */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Konfirmasi Password
                        </label>
                        <div className="relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                <Lock className="h-5 w-5 text-slate-400 dark:text-slate-500" />
                            </div>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Masukkan ulang password"
                                className="w-full rounded-xl border border-white/30 bg-white/50 py-3 pl-10 pr-12 text-slate-900 backdrop-blur-sm transition-all placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/20 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500"
                                {...register("confirmPassword")}
                                disabled={isLoading}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600 dark:hover:text-slate-300"
                                disabled={isLoading}
                            >
                                {showConfirmPassword ? (
                                    <EyeOff className="h-5 w-5" />
                                ) : (
                                    <Eye className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                        {errors.confirmPassword && (
                            <p className="text-sm text-rose-500 dark:text-rose-400">
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>

                    {/* Terms & Conditions Checkbox */}
                    <div className="flex items-start gap-3">
                        <button
                            type="button"
                            onClick={() => setAgreeTerms(!agreeTerms)}
                            className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 transition-all"
                            style={{
                                borderColor: agreeTerms ? "#10b981" : "#94a3b8",
                                backgroundColor: agreeTerms ? "#10b981" : "transparent"
                            }}
                        >
                            {agreeTerms && (
                                <CheckCircle2 className="h-4 w-4 text-white" />
                            )}
                        </button>
                        <p className="text-xs text-slate-600 dark:text-slate-400">
                            Saya menyetujui{" "}
                            <Link href="/terms" className="text-emerald-600 hover:underline dark:text-emerald-400">
                                Syarat & Ketentuan
                            </Link>{" "}
                            dan{" "}
                            <Link href="/privacy" className="text-emerald-600 hover:underline dark:text-emerald-400">
                                Kebijakan Privasi
                            </Link>
                        </p>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="group relative inline-flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-8 text-base font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:shadow-xl hover:shadow-emerald-500/35 disabled:opacity-70 disabled:cursor-not-allowed active:scale-95"
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
                                <span>Daftar</span>
                                <Sparkles className="h-4 w-4" />
                            </>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </button>
                </form>

                {/* Login Link */}
                <div className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
                    Sudah punya akun?{" "}
                    <Link
                        href="/login"
                        className="font-medium text-emerald-600 transition-colors hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
                    >
                        Masuk sekarang
                    </Link>
                </div>
            </div>
        </div>
    );
}

// Password Requirement Component
function PasswordRequirement({ met, text }: { met: boolean; text: string }) {
    return (
        <div className="flex items-center gap-1.5">
            {met ? (
                <CheckCircle2 className="h-3 w-3 text-emerald-500" />
            ) : (
                <XCircle className="h-3 w-3 text-slate-400" />
            )}
            <span className={met ? "text-emerald-600 dark:text-emerald-400" : "text-slate-500 dark:text-slate-400"}>
                {text}
            </span>
        </div>
    );
}