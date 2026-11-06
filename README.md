# Website Destinasi Wisata Indonesia

Website destinasi wisata berbasis Single Page Application (SPA) yang dibangun menggunakan **HTML5, CSS3, dan Vanilla JavaScript (ES6+)** dengan backend REST API Express.js.

## Fitur Utama

- **Halaman Daftar Destinasi (List Page)**:
  - Mengambil data destinasi wisata secara dinamis dari REST API.
  - Tampilan grid responsif (Desktop: 3 kolom, Tablet: 2 kolom, Mobile: 1 kolom).
  - Kartu destinasi menampilkan gambar, nama, lokasi, badge harga tiket, ringkasan deskripsi, dan tombol detail.
  - Navigasi ke halaman detail saat kartu diklik.
- **Halaman Detail Destinasi (Detail Page)**:
  - Menampilkan informasi lengkap destinasi: Nama, Lokasi, Foto beresolusi tinggi, Harga tiket masuk (dalam format Rupiah), serta deskripsi lengkap.
  - Layout dua kolom pada desktop dan bertumpuk (stacked) pada perangkat mobile.
  - Tombol kembali (Back button) dengan penanganan riwayat navigasi.
- **Client-Side Routing**:
  - Hash-based routing (`#/` untuk daftar destinasi dan `#/destination/:id` untuk detail destinasi).
- **Penanganan Status (State Management)**:
  - Indikator memuat (Loading spinner).
  - Pesan penanganan error yang ramah pengguna dengan tombol *Coba Lagi* (*Retry*).
  - Penanganan ID destinasi tidak ditemukan (404) dan destinasi kosong.

---

## Struktur Folder

```
mini projek 1/
├── backend/
│   ├── data/
│   │   └── destinations.js     # Data dummy destinasi wisata Indonesia
│   ├── middleware/
│   │   └── cors.js             # Konfigurasi CORS
│   ├── routes/
│   │   └── destinations.js     # REST API endpoint (/api/destinations)
│   ├── package.json
│   └── server.js               # Express server (API & static file server)
└── frontend/
    ├── index.html              # Entry point SPA
    ├── css/
    │   ├── main.css            # Styling global, reset, header, loading, error
    │   ├── list.css            # Grid & card layout halaman daftar
    │   └── detail.css          # Layout halaman detail & responsivitas
    ├── js/
    │   ├── app.js              # Inisialisasi aplikasi & konfigurasi route
    │   ├── router.js           # Client-side hash router
    │   ├── api.js              # API service layer (Fetch API)
    │   ├── components/
    │   │   ├── destinationList.js    # Komponen halaman list
    │   │   ├── destinationDetail.js  # Komponen halaman detail
    │   │   ├── loading.js            # Komponen loading spinner
    │   │   └── error.js              # Komponen pesan error
    │   └── utils/
    │       └── dom.js          # Helper manipulasi DOM & formatting Rupiah
    └── assets/
        └── images/             # Asset gambar statis
```

---

## Cara Menjalankan Website

Cukup jalankan satu perintah berikut di terminal:

```bash
# Dari folder frontend:
npm start

# Atau langsung menggunakan node:
node ../backend/server.js
```

Lalu buka browser Anda di:
👉 **[http://localhost:3000](http://localhost:3000)**

Server Express akan otomatis menyediakan REST API (`/api/destinations`) sekaligus menyajikan website frontend secara langsung.

