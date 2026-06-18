import Image from "next/image";
import Link from "next/link";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Clock,
} from "lucide-react";

export default function Home() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 p-4 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950/20">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-[10%] top-[-20%] h-[600px] w-[600px] animate-float rounded-full bg-emerald-400/20 blur-3xl dark:bg-emerald-500/10" />
        <div className="absolute -right-[10%] bottom-[-20%] h-[600px] w-[600px] animate-float-slow rounded-full bg-blue-400/20 blur-3xl dark:bg-blue-500/10" style={{ animationDelay: '2s' }} />
        <div className="absolute left-[30%] top-[40%] h-[300px] w-[300px] animate-float rounded-full bg-violet-400/10 blur-3xl dark:bg-violet-500/5" style={{ animationDelay: '4s' }} />
      </div>

      {/* Neon Border di Sekeliling Halaman */}
      <div className="absolute inset-4 rounded-3xl border-2 border-emerald-400/20 shadow-[0_0_30px_rgba(16,185,129,0.15)] dark:border-emerald-400/10">
        {/* Neon glow di sekeliling border */}
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-emerald-400/10 via-emerald-300/5 to-emerald-400/10 blur-xl" />

        {/* Animated neon lines di setiap sisi */}
        <div className="absolute -top-[2px] left-[10%] h-[2px] w-[80%] animate-neon-line bg-gradient-to-r from-transparent via-emerald-400 to-transparent blur-sm" />
        <div className="absolute -bottom-[2px] right-[10%] h-[2px] w-[80%] animate-neon-line-delay bg-gradient-to-r from-transparent via-emerald-400 to-transparent blur-sm" style={{ animationDelay: '2s' }} />
        <div className="absolute -left-[2px] top-[10%] h-[80%] w-[2px] animate-neon-line-vertical bg-gradient-to-b from-transparent via-emerald-400 to-transparent blur-sm" />
        <div className="absolute -right-[2px] bottom-[10%] h-[80%] w-[2px] animate-neon-line-vertical-delay bg-gradient-to-b from-transparent via-emerald-400 to-transparent blur-sm" style={{ animationDelay: '2s' }} />
      </div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)]" />

      {/* Main Card */}
      <main className="relative w-full max-w-7xl rounded-3xl border border-white/20 bg-white/30 backdrop-blur-xl backdrop-saturate-150 shadow-2xl shadow-emerald-500/10 dark:border-white/10 dark:bg-slate-900/40 dark:shadow-emerald-500/5">
        <div className="relative flex flex-col items-center justify-center gap-6 p-6 py-10 sm:p-10 sm:py-14">

          {/* Logo dengan Neon Glow */}
          <div className="relative flex flex-col items-center gap-3">
            <div className="relative group">
              <div className="absolute -inset-8 rounded-full bg-emerald-400/30 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-emerald-400/20 via-emerald-300/10 to-emerald-400/20 blur-2xl" />

              <div className="relative rounded-2xl border border-white/30 bg-white/40 p-1 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-emerald-400/50 dark:border-white/10 dark:bg-white/5">
                <Image
                  className="relative"
                  src="/kasbon.png"
                  alt="Kasbon logo"
                  width={72}
                  height={72}
                  priority
                  style={{ borderRadius: "12px" }}
                />
              </div>

              <div className="absolute -right-1 -top-1 rounded-full border border-white/40 bg-emerald-500/90 p-1 shadow-lg backdrop-blur-sm dark:border-white/20">
                <Sparkles className="h-2.5 w-2.5 text-white" />
              </div>
            </div>

            <div className="flex flex-col items-center gap-1">
              <h1 className="bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-4xl font-bold tracking-tight text-transparent dark:from-emerald-400 dark:to-emerald-300 sm:text-5xl">
                Kasbon
              </h1>
              <p className="flex items-center gap-2 text-xs font-medium text-emerald-600/80 dark:text-white">
                <span className="h-1 w-1 rounded-full bg-emerald-500" />
                Atur Keuangan, Jadi Lebih Mudah
                <span className="h-1 w-1 rounded-full bg-emerald-500" />
              </p>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="group relative overflow-hidden rounded-xl border border-white/30 bg-white/40 p-3 shadow-lg backdrop-blur-sm transition-all hover:scale-105 hover:border-emerald-400/50 hover:shadow-emerald-500/20 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative flex items-center gap-2.5">
                <div className="rounded-lg bg-emerald-500/20 p-1.5 dark:bg-emerald-400/10">
                  <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-700 dark:text-slate-300">Total Piutang</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">Dihutang ke saya</p>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-xl border border-white/30 bg-white/40 p-3 shadow-lg backdrop-blur-sm transition-all hover:scale-105 hover:border-rose-400/50 hover:shadow-rose-500/20 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10">
              <div className="absolute inset-0 bg-gradient-to-r from-rose-400/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative flex items-center gap-2.5">
                <div className="rounded-lg bg-rose-500/20 p-1.5 dark:bg-rose-400/10">
                  <TrendingDown className="h-4 w-4 text-rose-600 dark:text-rose-400" />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-700 dark:text-slate-300">Total Hutang</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">Saya hutang</p>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-xl border border-white/30 bg-white/40 p-3 shadow-lg backdrop-blur-sm transition-all hover:scale-105 hover:border-blue-400/50 hover:shadow-blue-500/20 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative flex items-center gap-2.5">
                <div className="rounded-lg bg-blue-500/20 p-1.5 dark:bg-blue-400/10">
                  <Wallet className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-700 dark:text-slate-300">Net Balance</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">Status keuangan</p>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="max-w-2xl space-y-3">
            <p className="text-center text-sm leading-relaxed text-slate-700/90 dark:text-slate-300/90">
              Lacak utang piutang pribadi dengan mudah. Catat siapa yang berhutang
              kepadamu atau kamu berhutang kepada siapa, dan tandai saat sudah lunas.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-xs text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1.5 rounded-full border border-white/30 bg-white/30 px-2.5 py-1 backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
                <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                Status lunas/belum
              </span>
              <span className="flex items-center gap-1.5 rounded-full border border-white/30 bg-white/30 px-2.5 py-1 backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
                <Wallet className="h-3 w-3 text-blue-500" />
                Ringkasan otomatis
              </span>
              <span className="flex items-center gap-1.5 rounded-full border border-white/30 bg-white/30 px-2.5 py-1 backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
                <Clock className="h-3 w-3 text-purple-500" />
                Real-time tracking
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/login"
              className="group relative inline-flex h-10 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:shadow-xl hover:shadow-emerald-500/35 active:scale-95 sm:w-auto"
            >
              <div className="absolute -inset-1 rounded-2xl bg-conic-gradient from-emerald-400 via-emerald-300 to-emerald-400 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100"
                style={{ animation: 'spin 3s linear infinite' }} />

              <span className="relative z-10">Masuk</span>
              <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </Link>

            <Link
              href="/signup"
              className="group relative inline-flex h-10 w-full items-center justify-center gap-2 overflow-hidden rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-6 text-sm font-semibold text-emerald-700 shadow-lg backdrop-blur-sm transition-all hover:bg-emerald-500/20 hover:shadow-emerald-500/20 active:scale-95 dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-300 dark:hover:bg-emerald-400/20 sm:w-auto"
            >
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-emerald-400/50 via-emerald-300/50 to-emerald-400/50 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100"
                style={{ animation: 'spin 4s linear infinite reverse' }} />

              <span className="relative z-10">Daftar</span>
              <Sparkles className="relative z-10 h-4 w-4 text-emerald-500" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </Link>
          </div>

          {/* Footer */}
          <div className="relative pt-2 text-[10px] text-slate-500/70 dark:text-white">
            <span className="relative inline-block">
              Kelola keuangan pribadi dengan lebih baik • Gratis
              <span className="absolute inset-0 from-transparent via-emerald-400/20 to-transparent -translate-x-full animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}