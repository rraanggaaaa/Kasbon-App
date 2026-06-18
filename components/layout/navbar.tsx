"use client";

import ProfileDropdown from "./profile-dropdown";
import Link from "next/link";
import Image from "next/image";

type Props = {
    user: {
        email?: string | null;
        full_name?: string | null;
        avatar_url?: string | null;
    };
};

export default function Navbar({ user }: Props) {
    const displayName = user.full_name || user.email?.split("@")[0] || "User";

    return (
        <header className="sticky top-4 z-40 px-4 sm:px-6">
            <div className="mx-auto max-w-7xl rounded-3xl border border-white/20 bg-white/30 px-4 py-3 backdrop-blur-xl backdrop-saturate-150 shadow-2xl shadow-emerald-500/10 transition-all duration-300 hover:shadow-emerald-500/20 dark:border-white/10 dark:bg-slate-900/50 dark:shadow-emerald-500/5">
                <div className="flex items-center justify-between">
                    {/* Left - Logo */}
                    <Link href="/dashboard" className="group flex items-center gap-2 sm:gap-3">
                        <div className="relative">
                            <div className="absolute -inset-2 rounded-full bg-emerald-400/20 opacity-0 blur transition-opacity group-hover:opacity-100" />
                            <Image
                                src="/kasbon.png"
                                alt="Kasbon"
                                width={28}
                                height={28}
                                className="relative h-7 w-7 object-contain sm:h-8 sm:w-8"
                                priority
                            />
                        </div>
                        <div className="hidden sm:block">
                            <span className="text-sm font-semibold text-slate-800 transition-colors group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-400">
                                Kasbon App
                            </span>
                        </div>
                    </Link>

                    {/* Center - Welcome Text */}
                    <div className="flex flex-col items-center">
                        <span className="text-[9px] font-medium text-slate-400 dark:text-slate-500 md:text-[10px]">
                            Selamat datang,
                        </span>
                        <span className="text-[10px] font-semibold text-slate-700 dark:text-slate-200 md:text-xs lg:text-sm">
                            {displayName}
                        </span>
                    </div>

                    {/* Right - Profile */}
                    <ProfileDropdown
                        email={user.email || ""}
                        name={user.full_name || undefined}
                        avatarUrl={user.avatar_url}
                    />
                </div>
            </div>
        </header>
    );
}