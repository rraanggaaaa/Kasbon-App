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
# 📚 Additional Libraries

Selain library utama, saya menggunakan beberapa library tambahan untuk meningkatkan developer experience, konsistensi UI, dan maintainability.

| Library | Alasan Penggunaan |
|---------|-------------------|
| `@supabase/supabase-js` | Client resmi Supabase untuk Authentication, Database, dan Storage. |
| `@supabase/ssr` | Mendukung autentikasi berbasis Server Components dan Middleware di Next.js App Router. |
| `react-hook-form` | Mengelola state form dengan performa lebih baik dan mengurangi re-render. |
| `zod` | Validasi schema yang type-safe dan dapat digunakan bersama React Hook Form maupun API Route. |
| `@hookform/resolvers` | Menghubungkan React Hook Form dengan Zod secara langsung. |
| `sonner` | Menampilkan toast notification dengan API yang sederhana dan tampilan modern. |
| `lucide-react` | Icon library ringan dengan desain konsisten dan mudah dikustomisasi. |
| `date-fns` | Membantu formatting tanggal seperti "3 hari lalu" dan manipulasi tanggal lainnya. |
| `clsx` | Menggabungkan className secara kondisional agar kode lebih bersih dan mudah dibaca. |
| `tailwind-merge` | Menghindari konflik class Tailwind saat menggunakan className dinamis. |

---

### Kenapa tidak menggunakan Redux?

Saya memilih menggunakan state bawaan React (`useState`, `useEffect`) karena kebutuhan state management pada aplikasi ini masih relatif sederhana. Dengan pendekatan ini, kompleksitas project dapat dikurangi tanpa mengorbankan maintainability.

---

### Kenapa menggunakan API Route daripada langsung memanggil Supabase dari Client?

Saya memilih menggunakan Next.js API Route sebagai lapisan backend karena:

- Menjaga akses database tetap berada di server.
- Validasi request dapat dilakukan secara terpusat.
- Mempermudah penambahan business logic di masa depan.
- Lebih aman karena client tidak berinteraksi langsung dengan query database.

---

### Kenapa menggunakan Partial Payment?

Saya memilih mendukung **partial payment** daripada hanya tombol "Lunas" karena lebih merepresentasikan kondisi nyata.

Contoh:

```text
Pinjam Rp1.000.000

↓

Bayar Rp300.000

↓

Sisa Rp700.000

↓

Bayar Rp700.000

↓

Status otomatis berubah menjadi Lunas
```

Pendekatan ini membuat aplikasi lebih fleksibel dan realistis dibanding hanya menyimpan status boolean `is_paid`.

# 📄 License

MIT License.
