# User Interface — Asset Management System

## Struktur File

```
user-interface/
├── index.js                  ← Entry point (React root)
│
├── data.js                   ← Mock data, configs, formatters
│
├── shared.css                ← Design tokens, base styles, button, badge, form, modal, toast
│
├── UserLayout.jsx            ← App shell: sidebar + topbar + routing
├── UserLayout.css
│
├── Dashboard.jsx             ← Halaman Dashboard
├── Dashboard.css
│
├── Inventaris.jsx            ← Halaman Inventaris Aset
├── Inventaris.css
│
├── Peminjaman.jsx            ← Halaman Peminjaman & Pengembalian
├── Peminjaman.css
│
├── ScanBarcode.jsx           ← Halaman Scan Barcode Aset
├── ScanBarcode.css
│
├── Profil.jsx                ← Halaman Profil Saya
├── Profil.css
│
├── AssetDetailModal.jsx      ← Modal detail aset (shared)
├── AssetDetailModal.css
│
├── BorrowModal.jsx           ← Modal ajukan peminjaman (shared)
├── ReturnModal.jsx           ← Modal konfirmasi pengembalian (shared)
└── README.md
```

## Cara Integrasi

### 1. Install dependencies

```bash
npm install react react-dom
```

### 2. Import ke router

```jsx
// App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import UserLayout from "./user-interface/UserLayout";

function App() {
  return (
    <Routes>
      <Route path="/user/*" element={<UserLayout />} />
      <Route path="/" element={<Navigate to="/user" />} />
    </Routes>
  );
}
```

### 3. Ganti mock data dengan API

Di `data.js`, ganti `assetsMock` dan `transactionsMock` dengan fetch dari backend:

```js
// Contoh fetch assets
export async function fetchAssets(branchCode) {
  const res = await fetch(`/api/assets?branch=${branchCode}`);
  return res.json();
}
```

Di setiap page component, ganti langsung dari array mock ke state dengan useEffect:

```jsx
const [assets, setAssets] = useState([]);
useEffect(() => {
  fetchAssets(currentUser.branch_code).then(setAssets);
}, []);
```

## Fitur

| Halaman                   | Fitur                                                             |
| ------------------------- | ----------------------------------------------------------------- |
| Dashboard                 | KPI cards, peringatan overdue, peminjaman aktif, aset tersedia    |
| Inventaris Aset           | Grid aset, filter pencarian/kategori/status, detail modal, pinjam |
| Peminjaman & Pengembalian | Tab aktif/riwayat, indikator overdue, modal pinjam, modal kembali |
| Scan Barcode              | Input manual ID/serial, detail lengkap, riwayat, langsung pinjam  |
| Profil Saya               | Edit profil, ganti password + validasi                            |

## Akses User vs Admin

- User hanya melihat aset di branch sendiri
- User tidak bisa edit/tambah/hapus aset
- User tidak bisa melihat detail anggaran (hanya harga & CAPEX/OPEX label)
- User hanya mengelola peminjaman milik sendiri
