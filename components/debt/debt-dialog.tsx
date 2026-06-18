"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    children: React.ReactNode;
};

export default function DebtDialog({
    open,
    onOpenChange,
    title,
    children,
}: Props) {
    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
                <Dialog.Content className="fixed left-1/2 top-1/2 w-[500px] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-white/20 bg-white/30 p-6 shadow-2xl shadow-emerald-500/10 backdrop-blur-xl backdrop-saturate-150 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] dark:border-white/10 dark:bg-slate-900/40 dark:shadow-emerald-500/5 sm:p-8">
                    {/* Close Button */}
                    <Dialog.Close className="absolute right-4 top-4 rounded-lg border border-white/30 bg-white/40 p-2 transition-all hover:scale-105 hover:bg-white/60 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10">
                        <X className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                    </Dialog.Close>

                    {/* Title */}
                    <Dialog.Title className="mb-6 bg-linear-to-r from-emerald-600 to-emerald-400 bg-clip-text text-2xl font-bold tracking-tight text-transparent dark:from-emerald-400 dark:to-emerald-300">
                        {title}
                    </Dialog.Title>

                    {/* Content */}
                    {children}
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}