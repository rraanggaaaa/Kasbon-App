"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    User,
    Menu,
    X,
    ChevronLeft,
    ChevronRight,
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
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        if (!isMobile) {
            setIsOpen(false);
        }
    }, [isMobile]);

    const toggleSidebar = () => setIsOpen(!isOpen);
    const closeSidebar = () => setIsOpen(false);
    const toggleCollapse = () => setIsCollapsed(!isCollapsed);

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={toggleSidebar}
                className="fixed left-4 top-4 z-50 rounded-xl border border-white/20 bg-white/70 p-2.5 shadow-lg backdrop-blur-xl backdrop-saturate-150 transition-all hover:bg-white/90 dark:border-white/10 dark:bg-slate-900/70 dark:hover:bg-slate-900/90 md:hidden"
            >
                <Menu className="h-5 w-5 text-slate-700 dark:text-slate-300" />
            </button>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
                    onClick={closeSidebar}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`relative z-30 flex h-screen flex-col border-r border-white/20 bg-white/30 backdrop-blur-xl backdrop-saturate-150 shadow-2xl shadow-emerald-500/5 transition-all duration-300 dark:border-white/10 dark:bg-slate-900/50 dark:shadow-emerald-500/5 ${isOpen ? "fixed left-0 translate-x-0" : "fixed -translate-x-full md:relative md:translate-x-0"
                    } ${isCollapsed ? "w-20" : "w-72"} rounded-r-3xl`}
            >
                {/* Close Button Mobile */}
                <button
                    onClick={closeSidebar}
                    className="absolute right-4 top-4 rounded-xl border border-white/20 bg-white/40 p-1.5 backdrop-blur-sm transition-all hover:bg-white/60 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 md:hidden"
                >
                    <X className="h-5 w-5 text-slate-700 dark:text-slate-300" />
                </button>

                {/* Toggle Collapse Button - Desktop */}
                {!isMobile && (
                    <button
                        onClick={toggleCollapse}
                        className="absolute -right-3 top-20 z-50 hidden rounded-full border border-white/20 bg-white/70 p-1.5 shadow-lg backdrop-blur-xl backdrop-saturate-150 transition-all hover:bg-white/90 hover:scale-110 dark:border-white/10 dark:bg-slate-900/70 dark:hover:bg-slate-900/90 md:block"
                    >
                        {isCollapsed ? (
                            <ChevronRight className="h-4 w-4 text-slate-600 dark:text-slate-300" />
                        ) : (
                            <ChevronLeft className="h-4 w-4 text-slate-600 dark:text-slate-300" />
                        )}
                    </button>
                )}

                {/* Logo */}
                <div className={`border-b border-white/10 px-6 py-6 dark:border-white/5 ${isCollapsed && !isMobile ? "flex justify-center" : ""
                    }`}>
                    <Link href="/dashboard" className="group flex items-center gap-3">
                        <div className="relative">
                            <div className="absolute -inset-2 rounded-full bg-emerald-400/20 opacity-0 blur transition-opacity group-hover:opacity-100" />
                            <Image
                                className="relative rounded-xl object-contain"
                                src="/kasbon.png"
                                alt="Kasbon logo"
                                width={isCollapsed && !isMobile ? 36 : 40}
                                height={isCollapsed && !isMobile ? 36 : 40}
                                priority
                            />
                        </div>
                        {(!isCollapsed || isMobile) && (
                            <div>
                                <span className="text-xl font-bold tracking-tight text-slate-900 transition-colors group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-400">
                                    Kasbon
                                </span>
                                <span className="ml-1.5 text-xs text-slate-400 dark:text-slate-500">
                                    App
                                </span>
                            </div>
                        )}
                    </Link>
                </div>

                {/* Navigation */}
                <nav className={`flex-1 space-y-1.5 overflow-y-auto px-4 py-6 ${isCollapsed && !isMobile ? "px-2" : ""
                    }`}>
                    {menus.map((menu) => {
                        const Icon = menu.icon;
                        const isActive = pathname === menu.href;

                        return (
                            <Link
                                key={menu.href}
                                href={menu.href}
                                onClick={() => {
                                    if (isMobile) closeSidebar();
                                }}
                                className={`
                                    group relative flex items-center gap-3.5 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300
                                    ${isActive
                                        ? "bg-emerald-500/15 text-emerald-600 shadow-sm backdrop-blur-sm dark:bg-emerald-400/15 dark:text-emerald-400"
                                        : "text-slate-600 hover:bg-white/30 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-slate-200"
                                    }
                                    ${isCollapsed && !isMobile ? "justify-center px-2" : ""}
                                `}
                                title={isCollapsed && !isMobile ? menu.name : ""}
                            >
                                {isActive && !isCollapsed && !isMobile && (
                                    <div className="absolute left-0 top-1/2 h-10 w-1 -translate-y-1/2 rounded-r-full bg-linear-to-b from-emerald-500 to-emerald-400 shadow-lg shadow-emerald-500/30" />
                                )}
                                {isActive && isCollapsed && !isMobile && (
                                    <div className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-linear-to-b from-emerald-500 to-emerald-400 shadow-lg shadow-emerald-500/30" />
                                )}
                                <Icon
                                    className={`h-5 w-5 transition-all duration-300 ${isActive
                                            ? "text-emerald-600 dark:text-emerald-400"
                                            : "text-slate-400 group-hover:scale-110 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300"
                                        } ${!isActive && "group-hover:scale-110"}`}
                                />
                                {(!isCollapsed || isMobile) && (
                                    <span className="transition-all duration-300">{menu.name}</span>
                                )}
                                {isActive && !isCollapsed && !isMobile && (
                                    <span className="ml-auto text-xs font-medium text-emerald-500/60 dark:text-emerald-400/60">
                                        ●
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom Section */}
                <div className={`border-t border-white/10 px-4 py-4 dark:border-white/5 ${isCollapsed && !isMobile ? "px-2" : ""
                    }`}>
                    <LogoutButton isCollapsed={isCollapsed && !isMobile} />
                </div>
            </aside>
        </>
    );
}