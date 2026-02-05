📦 Inventory & Asset Management System

PT Pelindo Multi Terminal

📌 Deskripsi Proyek

Proyek ini merupakan Sistem Informasi Manajemen Inventaris dan Aset yang dikembangkan dalam rangka Program Magang di PT Pelindo Multi Terminal. Sistem ini dirancang untuk membantu perusahaan dalam melakukan pendataan, pelacakan, peminjaman, pengembalian, serta pemantauan kondisi dan riwayat perawatan aset secara terpusat dan terdokumentasi.

Sistem dikembangkan dengan arsitektur frontend–backend terpisah, menggunakan React sebagai frontend dan Lumen (Laravel Micro Framework) sebagai backend berbasis RESTful API, serta MySQL yang dijalankan melalui XAMPP sebagai basis data. Pendekatan ini membuat sistem mudah dikembangkan, terstruktur, dan siap digunakan dalam skala organisasi.

🧱 Teknologi yang Digunakan

Frontend: React
Antarmuka pengguna interaktif dan berbasis komponen

Backend API: Lumen (Laravel Micro Framework)
Menangani logika bisnis, validasi, dan keamanan data

Database: MySQL (XAMPP)
Menyimpan data aset, transaksi, spesifikasi, dan audit log

Arsitektur: Client–Server, REST API

🎯 Tujuan Pengembangan

Meningkatkan akurasi dan konsistensi data inventaris

Mempermudah monitoring status aset (available, borrowed, maintenance, disposed)

Menyediakan riwayat peminjaman dan kondisi aset

Mendukung audit, evaluasi kelayakan aset, dan perencanaan maintenance

Mengurangi kesalahan pencatatan manual

🧠 Fitur Utama Sistem

🔐 Role-based Access

Superadmin: Mengelola master data, aset, spesifikasi, transaksi, dan maintenance

User (Read Only): Scan QR Code dan melihat informasi aset

🏷️ Manajemen Aset Terpusat

Data aset lengkap (lokasi, jenis, brand, serial number, tahun pengadaan)

Status aset real-time

🧩 Spesifikasi Aset Dinamis & Terkontrol

Template spesifikasi untuk menjaga konsistensi data

Mendukung spesifikasi tambahan sesuai kebutuhan aset

Validasi dilakukan di sisi backend

📷 QR Code Aset

Akses cepat informasi aset melalui pemindaian

Tanpa hak edit untuk user

🔄 Transaksi & Riwayat Aset

Peminjaman dan pengembalian aset

Pencatatan kondisi aset setelah digunakan

Riwayat maintenance dan kerusakan

🛠️ Audit & Logging

Activity Log

Transaction Log

Login Log

🗄️ Arsitektur Sistem

Frontend React berkomunikasi dengan Backend Lumen melalui RESTful API

Backend bertanggung jawab penuh terhadap validasi dan konsistensi data

Database MySQL (XAMPP) digunakan sebagai penyimpanan terpusat

Struktur database dirancang untuk mendukung fleksibilitas spesifikasi aset tanpa mengorbankan integritas data

🏢 Konteks Pengembangan

Sistem ini dikembangkan sebagai bagian dari Program Magang Mahasiswa di:

PT Pelindo Multi Terminal

Sebagai implementasi nyata penerapan:

Analisis dan Perancangan Sistem Informasi

Perancangan Basis Data Relasional

Pengembangan Aplikasi Web Berbasis API

👨‍💻 Tim Pengembang

Mahasiswa Program Studi Sistem Informasi
Program Magang PT Pelindo Multi Terminal
