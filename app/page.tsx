import Image from "next/image";
import Link from "next/link";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  ArrowRight,
  Sparkles
} from "lucide-react";

export default function Home() {
  return (
    <div className="relative p-6 flex min-h-screen flex-col items-center justify-center overflow-hidden bg-linear-to-br from-slate-50 via-white to-emerald-50/30 px-4 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950/20">
      <div className="absolute top-[-20%] left-[-10%] rounded-full bg-emerald-400/20 blur-3xl dark:bg-emerald-500/10" />
      <div className="absolute bottom-[-20%] right-[-10%]  rounded-full bg-blue-400/20 blur-3xl dark:bg-blue-500/10" />

      <main className="relative w-full max-w-4xl rounded-3xl border border-white/20 bg-white/30 backdrop-blur-xl backdrop-saturate-150 shadow-2xl shadow-emerald-500/10 dark:border-white/10 dark:bg-slate-900/40 dark:shadow-emerald-500/5">
        <div className="flex flex-col items-center justify-center gap-10 p-8 py-16 sm:p-12 sm:py-20">

          <div className="relative flex flex-col items-center gap-4">
            <div className="relative">
              <div className="absolute -inset-8 rounded-full bg-linear-to-r from-emerald-400/20 via-emerald-300/10 to-emerald-400/20 blur-2xl" />

              <div className="relative rounded-2xl border border-white/30 bg-white/40 p-2 shadow-lg backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
                <Image
                  className="relative"
                  src="/kasbon.png"
                  alt="Kasbon logo"
                  width={100}
                  height={100}
                  priority
                />
              </div>

              <div className="absolute -right-2 -top-2 rounded-full border border-white/40 bg-emerald-500/90 p-1.5 shadow-lg backdrop-blur-sm dark:border-white/20">
                <Sparkles className="h-3 w-3 text-white" />
              </div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <h1 className="bg-linear-to-r from-emerald-600 to-emerald-400 bg-clip-text text-5xl font-bold tracking-tight text-transparent dark:from-emerald-400 dark:to-emerald-300 sm:text-6xl">
                Kasbon App
              </h1>
              <p className="flex items-center gap-2 text-sm font-medium text-emerald-600/80 dark:text-emerald-400/70">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Atur Keuangan, Jadi Lebih Mudah
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </p>
            </div>
          </div>

          <div className="grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-3 rounded-xl border border-white/30 bg-white/40 p-4 shadow-lg backdrop-blur-sm transition-all hover:scale-105 hover:bg-white/60 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10">
              <div className="rounded-lg bg-emerald-500/20 p-2 dark:bg-emerald-400/10">
                <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Total Piutang</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Dihutang ke saya</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-white/30 bg-white/40 p-4 shadow-lg backdrop-blur-sm transition-all hover:scale-105 hover:bg-white/60 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10">
              <div className="rounded-lg bg-rose-500/20 p-2 dark:bg-rose-400/10">
                <TrendingDown className="h-5 w-5 text-rose-600 dark:text-rose-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Total Hutang</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Saya hutang</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-white/30 bg-white/40 p-4 shadow-lg backdrop-blur-sm transition-all hover:scale-105 hover:bg-white/60 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10">
              <div className="rounded-lg bg-blue-500/20 p-2 dark:bg-blue-400/10">
                <Wallet className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Net Balance</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Status keuangan</p>
              </div>
            </div>
          </div>

          <div className="max-w-2xl space-y-4">
            <p className="text-center text-base leading-relaxed text-slate-700/90 dark:text-slate-300/90">
              Lacak utang piutang pribadi dengan mudah. Catat siapa yang berhutang
              kepadamu atau kamu berhutang kepada siapa, dan tandai saat sudah lunas.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-2 rounded-full border border-white/30 bg-white/30 px-3 py-1.5 backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                Status lunas/belum
              </span>
              <span className="flex items-center gap-2 rounded-full border border-white/30 bg-white/30 px-3 py-1.5 backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
                <Wallet className="h-3.5 w-3.5 text-blue-500" />
                Ringkasan otomatis
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
            <Link
              href="/login"
              className="group relative inline-flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-8 text-base font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:shadow-xl hover:shadow-emerald-500/35 active:scale-95 sm:w-auto"
            >
              <span>Masuk</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </Link>

            <Link
              href="/signup"
              className="group relative inline-flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl border border-white/30 bg-white/40 px-8 text-base font-semibold text-slate-700 shadow-lg backdrop-blur-sm transition-all hover:bg-white/60 hover:shadow-xl active:scale-95 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10 sm:w-auto"
            >
              <span>Daftar</span>
              <Sparkles className="h-4 w-4 text-emerald-500" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </Link>
          </div>

          <div className="pt-4 text-xs text-slate-500/70 dark:text-slate-500/70">
            Kelola keuangan pribadi dengan lebih baik • Gratis
          </div>
        </div>
      </main>
    </div>
  );
}