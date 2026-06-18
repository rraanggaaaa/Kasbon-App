"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { User, Mail, Save, Camera, Loader2, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";

export default function ProfilePage() {
    const router = useRouter();
    const supabase = createClient();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

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
            setAvatarUrl(user.user_metadata?.avatar_url || null);
        } catch (error) {
            toast.error("Gagal memuat profil");
        } finally {
            setIsLoading(false);
        }
    }

    async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast.error("File harus berupa gambar");
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            toast.error("Ukuran gambar maksimal 2MB");
            return;
        }

        setSelectedFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
    }

    async function uploadAvatar() {
        if (!selectedFile) return null;

        setIsUploading(true);
        try {
            const fileExt = selectedFile.name.split(".").pop();
            const fileName = `${user.id}-${Date.now()}.${fileExt}`;
            const filePath = `avatars/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from("avatars")
                .upload(filePath, selectedFile, {
                    cacheControl: "3600",
                    upsert: true,
                });

            if (uploadError) {
                toast.error("Gagal upload avatar");
                return null;
            }

            const { data: urlData } = supabase.storage
                .from("avatars")
                .getPublicUrl(filePath);

            return urlData.publicUrl;
        } catch (error) {
            toast.error("Gagal upload avatar");
            return null;
        } finally {
            setIsUploading(false);
        }
    }

    async function handleUpdateProfile(e: React.FormEvent) {
        e.preventDefault();
        setIsSaving(true);

        try {
            let newAvatarUrl = avatarUrl;

            if (selectedFile) {
                const uploadedUrl = await uploadAvatar();
                if (uploadedUrl) {
                    newAvatarUrl = uploadedUrl;
                    setAvatarUrl(uploadedUrl);
                }
            }

            const { error } = await supabase.auth.updateUser({
                data: {
                    full_name: fullName,
                    avatar_url: newAvatarUrl,
                },
            });

            if (error) {
                toast.error(error.message);
                return;
            }

            toast.success("Profil berhasil diperbarui");
            setSelectedFile(null);
            setPreviewUrl(null);
            router.refresh();
        } catch (error) {
            toast.error("Terjadi kesalahan, silakan coba lagi");
        } finally {
            setIsSaving(false);
        }
    }

    async function handleRemoveAvatar() {
        if (!avatarUrl) return;

        try {
            const { error } = await supabase.auth.updateUser({
                data: {
                    avatar_url: null,
                },
            });

            if (error) {
                toast.error(error.message);
                return;
            }

            setAvatarUrl(null);
            setPreviewUrl(null);
            setSelectedFile(null);
            toast.success("Avatar berhasil dihapus");
            router.refresh();
        } catch (error) {
            toast.error("Terjadi kesalahan, silakan coba lagi");
        }
    }

    const displayAvatar = previewUrl || avatarUrl;
    const displayName = fullName || "Pengguna";

    if (isLoading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-4xl">
            <div className="mb-8">
                <h1 className="bg-linear-to-r from-emerald-600 to-emerald-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent dark:from-emerald-400 dark:to-emerald-300">
                    Profile
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                    Kelola informasi akun kamu
                </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-5">
                {/* Sidebar Info */}
                <div className="lg:col-span-2">
                    <div className="rounded-2xl border border-white/20 bg-white/30 p-6 backdrop-blur-xl backdrop-saturate-150 shadow-lg dark:border-white/10 dark:bg-slate-900/40">
                        <div className="flex flex-col items-center text-center">
                            {/* Avatar */}
                            <div className="relative group mb-4">
                                <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-white/20 shadow-xl">
                                    {displayAvatar ? (
                                        <Image
                                            src={displayAvatar}
                                            alt={displayName}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-emerald-500 to-emerald-600 text-4xl font-bold text-white">
                                            {displayName.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                </div>

                                <div className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                                    <Camera className="h-8 w-8 text-white" />
                                </div>

                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileSelect}
                                    className="hidden"
                                />

                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="absolute -bottom-1 -right-1 rounded-full bg-emerald-500 p-2.5 text-white shadow-lg transition-all hover:scale-110 hover:bg-emerald-600"
                                >
                                    <Camera className="h-5 w-5" />
                                </button>
                            </div>

                            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                                {displayName}
                            </h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                {email}
                            </p>

                            {avatarUrl && (
                                <button
                                    type="button"
                                    onClick={handleRemoveAvatar}
                                    className="mt-3 inline-flex items-center gap-1.5 text-sm text-rose-500 transition-colors hover:text-rose-600"
                                >
                                    <Trash2 className="h-4 w-4" />
                                    Hapus Avatar
                                </button>
                            )}
                            {selectedFile && (
                                <p className="mt-2 text-sm text-emerald-500">
                                    {selectedFile.name} siap diupload
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="lg:col-span-3">
                    <div className="rounded-2xl border border-white/20 bg-white/30 p-6 backdrop-blur-xl backdrop-saturate-150 shadow-lg dark:border-white/10 dark:bg-slate-900/40">
                        <form onSubmit={handleUpdateProfile} className="space-y-6">
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

                            {/* Email */}
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

                            {/* Divider */}
                            <div className="border-t border-white/10 dark:border-white/5" />

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSaving || isUploading}
                                className="group relative inline-flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-linear-to-r from-emerald-500 to-emerald-600 px-8 text-base font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:shadow-xl hover:shadow-emerald-500/35 disabled:opacity-70 disabled:cursor-not-allowed active:scale-95"
                            >
                                {isSaving || isUploading ? (
                                    <>
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                        <span>{isUploading ? "Mengupload..." : "Menyimpan..."}</span>
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
            </div>
        </div>
    );
}