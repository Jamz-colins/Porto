# Portofolio SIRO (PKL)
HTML, CSS, dan JavaScript murni. Tanpa framework, tanpa proses build.

## Menjalankan lokal
Buka folder di VS Code, lalu klik kanan `index.html` > **Open with Live Server** (ekstensi Live Server), atau klik dua kali `index.html` di browser.
Font Google dimuat online; tanpa internet, tampilan memakai font sistem.

## Struktur
```
portfolio-siro/
├── index.html      isi & struktur halaman
├── css/style.css   desain, tema (variabel warna di :root)
├── js/script.js    tema, bahasa, modal, formulir, animasi
└── assets/images/  foto & screenshot
```

## Mengganti aset (cukup taruh file dengan nama ini)
| File | Dipakai untuk |
|---|---|
| `assets/images/profile.jpg` | Foto profil (rasio 1:1, 400×400 px cukup) |
| `assets/images/project-screenshot.jpg` | Screenshot Website MTs Fadlun Nafis (±1200×750) |
| `assets/images/flowchart.png` | Flowchart di modal detail |
| `assets/images/erd.png` | ERD di modal detail |

Selama file belum ada, placeholder bergaris putus tampil otomatis. Kompres gambar (di bawah 300 KB) agar situs cepat.
Favicon: ganti baris `<link rel="icon">` di `index.html` dengan `<link rel="icon" href="assets/icons/favicon.png">`.

## Mengubah konten
- **Teks Indonesia**: langsung di `index.html` (elemen ber-atribut `data-i18n`).
- **Teks Inggris**: objek `EN` di `js/script.js`, kuncinya sama dengan nilai `data-i18n`. Ubah keduanya agar sinkron.
- **Skill**: daftar `<li>` di bagian `#skills`.
- **Warna**: variabel `--acc`, `--bg`, `--ink` di atas `css/style.css`.
- **Tautan kontak**: bagian `#contact` dan footer di `index.html`. WhatsApp memakai format `https://wa.me/62...` (tanpa 0 di depan, tanpa tanda +).
- **Tautan proyek**: jika demo/GitHub proyek sudah ada, tambahkan `<a class="btn" href="URL">` di `.feat-body`, lalu hapus kalimat "Dokumentasi proyek akan ditambahkan".
- **Foto profil**: bila sudah ada LinkedIn, tambahkan sendiri di daftar `.links`.

## Formulir kontak
Tanpa server, formulir membuka aplikasi email (`mailto:`). Agar pesan terkirim langsung dari situs, gunakan layanan formulir (mis. Formspree atau Web3Forms) dan arahkan `action` formulir ke endpoint-nya. Jangan menaruh API key rahasia di frontend.

## Publikasi (GitHub Pages)
1. Buat repository di GitHub, unggah isi folder `portfolio-siro` (`index.html` di root).
2. **Settings > Pages > Deploy from a branch > main / (root)** > Save.
3. Situs aktif di `https://Jamz-colins.github.io/NAMA-REPO/`. Nama repo `Jamz-colins.github.io` menghasilkan alamat tanpa sub-path.

## Daftar cek manual
- [ ] Tema terang/gelap berganti dan tetap tersimpan setelah refresh.
- [ ] Tombol ID/EN mengganti seluruh teks (termasuk modal dan judul tab).
- [ ] Menu HP terbuka/tutup; tautan menu menggulir ke bagian yang benar.
- [ ] "Lihat Detail" membuka modal; tombol ✕, Esc, dan klik di luar menutupnya.
- [ ] Formulir: kosong menampilkan pesan; email salah ditolak; data valid membuka aplikasi email.
- [ ] Email, WhatsApp, GitHub, Instagram membuka tujuan yang benar.
- [ ] Tab dengan keyboard menampilkan fokus yang terlihat.
- [ ] Tidak ada geseran horizontal di lebar 360 px; cek juga 768, 1366, 1920 px.
- [ ] Aktifkan "reduce motion" di sistem: animasi berhenti.
