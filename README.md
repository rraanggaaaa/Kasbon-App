# Kasbon App 💸

Kasbon App adalah aplikasi pencatatan hutang-piutang modern yang dibangun menggunakan Next.js 16, Supabase, Tailwind CSS, dan TypeScript.

Aplikasi ini memungkinkan pengguna untuk:

- Mencatat hutang dan piutang.
- Mengelola status pembayaran.
- Melakukan pembayaran sebagian (partial payment).
- Filter berdasarkan status dan tipe hutang.
- Mencari data berdasarkan nama.
- Login, register, verifikasi email, dan logout menggunakan Supabase Auth.

---

# 🚀 Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Supabase
- Tailwind CSS
- React Hook Form
- Zod
- Sonner
- Lucide React

---

# 📦 Setup Project

## 1. Clone Repository

```bash
git clone https://github.com/rraanggaaaa/Kasbon-App.git
cd Kasbon-App
```

## 2. Install Dependency

```bash
npm install
```

## 3. Setup Environment

Buat file:

```bash
.env.local
```

Isi:

```env
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=YOUR_SUPABASE_ANON_KEY
```

---

# 🗄️ Database Migration

Menggunakan Supabase CLI.

Install:

```bash
npm install supabase --save-dev
```

Init:

```bash
npx supabase init
```

Apply migration:

```bash
npx supabase db push
```

Migration berada pada folder:

```text
supabase/
└── migrations/
    ├── create_profiles.sql
    ├── create_debts.sql
    └── create_profile_trigger.sql
```

---

# ▶️ Jalankan Local

```bash
npm run dev
```

Buka:

```text
http://localhost:3000
```

---

# 🌐 Demo

**Vercel:**

Tambahkan link deploy setelah deploy:

```text
https://kasbon.rraanggaaaa.my.id
```

atau:

```text
https://kasbon-app.vercel.app
```

---

# 🧠 Approach

Saya memilih arsitektur Next.js App Router dengan API Route sebagai lapisan backend agar seluruh interaksi database tetap berada di server dan tidak langsung mengakses Supabase dari client. Semua endpoint dilindungi middleware dan Row Level Security (RLS) sehingga data hanya dapat diakses oleh pemilik akun. Saya juga menggunakan React Hook Form dan Zod untuk memastikan validasi form konsisten antara UI dan API. Selain itu, fitur pembayaran dibuat mendukung partial payment sehingga aplikasi lebih realistis dan mendekati kebutuhan dunia nyata.

---

# ⚖️ Trade-off

Jika memiliki tambahan waktu 1 hari, saya ingin:

- Menambahkan Payment History.
- Upload avatar ke Supabase Storage.
- Skeleton loading.
- Infinite Scroll / Pagination.
- Dashboard analytics yang lebih interaktif.
- Unit Test dan Integration Test.
- Optimasi UI dengan komponen Radix UI dan efek Liquid Glass yang lebih konsisten.

---

# ⏱️ Time Spent

Estimasi waktu pengerjaan:

| Fitur                       |       Waktu |
| --------------------------- | ----------: |
| Setup Project               |    30 menit |
| Authentication + Middleware |       1 jam |
| Database + Migration        |    45 menit |
| CRUD Debts API              |     1.5 jam |
| Dashboard + Filter          |       1 jam |
| Partial Payment             |    45 menit |
| Profile + Logout            |    30 menit |
| UI Polish                   |       1 jam |
| Total                       | ± 6 - 7 jam |

---

# 📄 License

MIT License.
