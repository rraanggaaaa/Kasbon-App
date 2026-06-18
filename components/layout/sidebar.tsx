"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    User,
    Menu,
    X,
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
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => setIsOpen(!isOpen);
    const closeSidebar = () => setIsOpen(false);

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={toggleSidebar}
                className="fixed left-4 top-4 z-50 rounded-lg bg-white/80 p-2 shadow-lg backdrop-blur-sm md:hidden dark:bg-slate-900/80"
            >
                <Menu className="h-5 w-5 text-slate-700 dark:text-slate-300" />
            </button>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
                    onClick={closeSidebar}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-white/10 bg-white/70 backdrop-blur-xl backdrop-saturate-150 transition-transform duration-300 dark:bg-slate-900/70 md:sticky md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                {/* Close Button Mobile */}
                <button
                    onClick={closeSidebar}
                    className="absolute right-4 top-4 rounded-lg p-1 hover:bg-slate-100 md:hidden dark:hover:bg-slate-800"
                >
                    <X className="h-5 w-5 text-slate-700 dark:text-slate-300" />
                </button>

                {/* Logo */}
                <div className="border-b border-white/10 px-6 py-5 dark:border-white/5">
                    <Link href="/dashboard" className="group flex items-center gap-2.5">
                        <div className="relative">
                            <Image
                                className="relative"
                                src="/kasbon.png"
                                alt="Kasbon logo"
                                width={40}
                                height={40}
                                priority
                            />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-slate-900 transition-colors group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-400">
                            Kasbon
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
                                onClick={closeSidebar}
                                className={`
                                    group relative flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200
                                    ${isActive
                                        ? "bg-emerald-500/10 text-emerald-600 shadow-sm dark:bg-emerald-400/10 dark:text-emerald-400"
                                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-200"
                                    }
                                `}
                            >
                                {isActive && (
                                    <div className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-gradient-to-b from-emerald-500 to-emerald-400" />
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
        </>
    );
}