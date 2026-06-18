import Navbar from "@/components/layout/navbar";
import Sidebar from "@/components/layout/sidebar";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    return (
        <div className="relative flex h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950/20">
            {/* Background Orbs */}
            <div className="absolute -left-[10%] top-[-20%] h-[500px] w-[500px] rounded-full bg-emerald-400/20 blur-3xl dark:bg-emerald-500/10" />
            <div className="absolute -right-[10%] bottom-[-20%] h-[500px] w-[500px] rounded-full bg-blue-400/20 blur-3xl dark:bg-blue-500/10" />
            <div className="absolute left-[40%] top-[50%] h-[300px] w-[300px] rounded-full bg-violet-400/10 blur-3xl dark:bg-violet-500/5" />

            <div className="relative flex h-screen w-full overflow-hidden backdrop-blur-sm">
                {/* Sidebar - Hidden on mobile, visible on desktop */}
                <div className="hidden md:block">
                    <Sidebar />
                </div>

                {/* Main Content */}
                <div className="flex flex-1 flex-col overflow-hidden">
                    <Navbar user={user} />
                    <main className="relative flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 lg:p-8">
                        <div className="relative mx-auto max-w-7xl rounded-2xl border border-white/20 bg-white/30 p-4 backdrop-blur-xl backdrop-saturate-150 shadow-2xl shadow-emerald-500/5 dark:border-white/10 dark:bg-slate-900/30 dark:shadow-emerald-500/5 sm:p-6">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}