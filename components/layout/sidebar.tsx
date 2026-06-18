"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    User,
    Settings,
    Wallet,
    LogOut,
} from "lucide-react";
import LogoutButton from "./logout-button";

const menus = [
    {
        name: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        name: "Profile",
        href: "/profile",
        icon: User,
    },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="sticky top-0 flex h-screen w-64 flex-col border-r border-white/10 bg-white/70 backdrop-blur-xl backdrop-saturate-150 dark:bg-slate-900/70">
            {/* Logo */}
            <div className="border-b border-white/10 px-6 py-5 dark:border-white/5">
                <Link href="/dashboard" className="group flex items-center gap-2.5">
                    <div className="relative">
                        <Image
                            className="relative"
                            src="/kasbon.png"
                            alt="Kasbon logo"
                            width={50}
                            height={50}
                            priority
                        /></div>
                    <span className="text-xl font-bold tracking-tight text-slate-900 transition-colors group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-400">
                        Kasbon App
                    </span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
                {menus.map((menu) => {
                    const Icon = menu.icon;
                    const isActive = pathname === menu.href;

                    return (
                        <Link
                            key={menu.href}
                            href={menu.href}
                            className={`
                group relative flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200
                ${isActive
                                    ? "bg-emerald-500/10 text-emerald-600 shadow-sm dark:bg-emerald-400/10 dark:text-emerald-400"
                                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-200"
                                }
              `}
                        >
                            {isActive && (
                                <div className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-linear-to-b from-emerald-500 to-emerald-400" />
                            )}
                            <Icon
                                className={`h-5 w-5 transition-transform duration-200 ${isActive
                                    ? "text-emerald-600 dark:text-emerald-400"
                                    : "text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300"
                                    } ${!isActive && "group-hover:scale-105"}`}
                            />
                            <span>{menu.name}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Section */}
            <div className="border-t border-white/10 px-3 py-4 dark:border-white/5">
                <LogoutButton />
            </div>
        </aside>
    );
}