import { UseFormRegister, FieldError } from "react-hook-form";
import { Mail } from "lucide-react";

type Props = {
    register: UseFormRegister<any>;
    error?: FieldError;
};

export default function EmailInput({ register, error }: Props) {
    return (
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
                    placeholder="Email"
                    className="w-full rounded-xl border border-white/30 bg-white/50 py-3 pl-10 pr-4 text-slate-900 backdrop-blur-sm transition-all placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/20 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500"
                    {...register("email")}
                />
            </div>
            {error && (
                <p className="text-sm text-rose-500 dark:text-rose-400">
                    {error.message}
                </p>
            )}
        </div>
    );
}