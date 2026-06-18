import ProfileDropdown from "./profile-dropdown";
import Link from "next/link";

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
        <header className="sticky top-0 z-40 border-b border-white/10 bg-white/70 backdrop-blur-xl backdrop-saturate-150 dark:bg-slate-900/70">
            <div className="flex h-16 items-center justify-between px-4 sm:px-6">
                <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                        Selamat datang,
                    </span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                        {displayName}
                    </span>
                </div>

                <ProfileDropdown
                    email={user.email || ""}
                    name={user.full_name || undefined}
                    avatarUrl={user.avatar_url}
                />
            </div>
        </header>
    );
}