# DMen'Style STORE — Business Overview

E-commerce fashion pria berbasis HTML, CSS, dan JavaScript (vanilla), dengan
data disimpan di `localStorage` sebagai simulasi backend/database.

---

## 1. Profil Bisnis

**Nama Bisnis:** DMen'Style STORE

**Deskripsi:**
DMen'Style STORE adalah toko fashion pria daring yang menyediakan pakaian
dan aksesori kasual hingga semi-formal — kaos, kemeja, hoodie, jaket,
celana, dan sepatu — dengan bahan berkualitas dan desain yang mengikuti
tren masa kini.

**Value Proposition:**

- **Kurasi produk yang rapi** — setiap produk punya deskripsi bahan, jahitan,
  dan kegunaan yang jelas, bukan sekadar foto dan harga.
- **Pengalaman belanja modern** — tampilan bersih, navigasi cepat, filter/
  pencarian produk, dark mode, dan wishlist.
- **Transparansi harga** — harga asli dan harga promo ditampilkan berdampingan
  dengan persentase diskon yang jelas.
- **Beragam pilihan pembayaran** — Transfer Bank, QRIS, Kartu Kredit/Debit,
  E-Wallet, hingga COD (Cash on Delivery) untuk fleksibilitas pelanggan.

---

## 2. Target Market & Segmentasi Pelanggan

**Target utama:** Pria usia 18–35 tahun, tinggal di area urban/sub-urban
Indonesia, melek digital, dan terbiasa belanja daring.

**Segmentasi pelanggan** (mengikuti struktur data di admin/customer):

| Segmen             | Ciri                                               | Fokus Perlakuan                                  |
| ------------------ | -------------------------------------------------- | ------------------------------------------------ |
| **Baru**           | Baru pertama kali checkout                         | Onboarding, kupon diskon pertama, edukasi produk |
| **Reguler**        | Sudah beberapa kali transaksi, pola belanja stabil | Program loyalitas, rekomendasi produk terkait    |
| **VIP**            | Frekuensi & nilai transaksi tinggi                 | Akses early-access promo, layanan prioritas      |
| **Berisiko Churn** | Sudah lama tidak bertransaksi / pernah komplain    | Follow-up personal, voucher win-back             |

---

## 3. Analisis Pasar Singkat & Kompetitor

**Tren pasar:** Belanja fashion pria daring di Indonesia terus tumbuh,
didorong oleh preferensi kenyamanan berbelanja, variasi metode pembayaran
digital (QRIS, e-wallet), dan konten media sosial yang mempercepat siklus tren.

**Kompetitor tidak langsung (kategori sejenis):**

- **Marketplace besar** (mis. platform e-commerce nasional) — unggul di
  jangkauan & kepercayaan, tapi produk fashion pria tersebar dan kurang
  terkurasi.
- **Brand DTC (direct-to-consumer) lokal** — unggul di storytelling brand
  dan kualitas produk niche, tapi jangkauan pasar lebih kecil.
- **Toko fisik/department store** — unggul di pengalaman coba langsung,
  lemah di kenyamanan & harga kompetitif.

**Posisi MEN'S STYLE STORE:** menengah — mengombinasikan kurasi & harga
kompetitif ala brand DTC dengan kenyamanan checkout ala marketplace besar
(banyak pilihan pembayaran, checkout cepat, ongkir jelas di muka).

---

## 4. Strategi Manajemen Produk & Katalog

- **Kategori:** Kaos, Kemeja, Hoodie, Jaket, Celana, Sepatu — cukup luas
  untuk kebutuhan casual-to-semi-formal pria tanpa membuat katalog terlalu
  lebar (fokus, bukan generalis).
- **Deskripsi produk:** Setiap produk memuat detail bahan (mis. "Cotton
  Combed 30s", "denim premium") dan manfaat penggunaan — bukan sekadar
  nama & harga — supaya pelanggan lebih yakin sebelum membeli tanpa mencoba
  langsung.
- **Visual produk:** Foto produk konsisten dengan rasio dan pencahayaan
  yang sama antar kategori untuk menjaga kesan katalog yang rapi.
- **Varian produk:** Ukuran & warna dipilih di tingkat item (bukan generik),
  sehingga stok dan preferensi pelanggan bisa dilacak lebih akurat ke depannya.
- **Rencana pengembangan katalog:** menambah filter rentang harga (bukan
  hanya urutkan termurah/termahal), serta tag "Terlaris"/"Baru Rilis" pada
  kartu produk.

---

## 5. Model Bisnis & Revenue Stream

**Model bisnis:** B2C (Business-to-Consumer) — penjualan produk retail
langsung ke konsumen akhir melalui website sendiri (bukan marketplace pihak
ketiga), sehingga margin lebih terjaga dan data pelanggan sepenuhnya milik
bisnis sendiri (first-party data).

**Sumber pendapatan (revenue stream):**

1. **Penjualan produk** — sumber pendapatan utama dari transaksi katalog.
2. **Ongkos kirim** — flat rate Rp20.000/pesanan (dapat dikembangkan ke tarif
   berbasis lokasi/berat di kemudian hari).
3. **Potensi ke depan:** bundling produk (mis. paket "atasan + bawahan"),
   membership/berlangganan untuk akses promo eksklusif bagi segmen VIP.

---

## 6. Strategi Harga, Promosi, dan Diskon

- **Strategi harga:** Competitive pricing — harga disesuaikan dengan
  kualitas bahan & posisi menengah di pasar (tidak termurah, tidak premium
  ekstrem), dengan harga dasar transparan di setiap produk.
- **Diskon:** Ditampilkan sebagai persentase tetap yang jelas (mis. potongan
  hingga 25%) langsung di kartu produk halaman Promo, dengan harga asli
  dicoret berdampingan harga diskon — mendorong urgensi beli tanpa terkesan
  manipulatif.
- **Promosi:**
  - Halaman **Promo** khusus yang mengumpulkan seluruh produk diskon.
  - **Newsletter** di setiap halaman untuk menangkap email pelanggan demi
    promo mendatang.
  - Rencana ke depan: kode voucher untuk pelanggan baru, flash sale
    musiman, dan program referral.

---

## 7. Proses Checkout & Simulasi Payment Gateway

**Alur checkout:**

1. Pelanggan menambah produk ke **Keranjang** (dengan pilihan ukuran &
   warna) atau memilih **Beli Sekarang** langsung dari halaman produk.
2. Di halaman **Checkout**, pelanggan mengisi data pengiriman (nama, email,
   telepon, alamat, kota, kode pos) dan memilih salah satu metode
   pembayaran.
3. Total dihitung otomatis (subtotal + ongkir tetap Rp20.000).
4. Pelanggan menekan "Bayar Sekarang", sistem menampilkan simulasi proses
   sesuai metode yang dipilih.
5. Setelah "berhasil", nomor pesanan dan ringkasan pembayaran ditampilkan,
   dan pesanan otomatis tercatat di sistem admin.

**Payment gateway (simulasi):**
Proyek ini mensimulasikan pengalaman payment gateway seperti **Midtrans**,
mencakup metode pembayaran yang umum ditawarkan Midtrans:

- Transfer Bank via **Virtual Account** (BCA/BRI/Mandiri, nomor VA
  digenerate otomatis)
- **QRIS** (kode QR digenerate otomatis, dengan batas waktu pembayaran)
- **Kartu Kredit/Debit**
- **E-Wallet** (GoPay, OVO, DANA, ShopeePay)
- **COD** (Cash on Delivery), sebagai metode tambahan di luar cakupan
  standar payment gateway online

> Catatan: seluruh proses pembayaran di atas adalah **simulasi frontend**
> (tidak ada transaksi uang nyata maupun koneksi ke API payment gateway
> sungguhan). Untuk implementasi produksi, alur ini perlu diganti dengan
> integrasi resmi ke Midtrans Snap API (atau Xendit) di sisi backend/server,
> supaya kredensial dan verifikasi pembayaran tidak diproses di browser.

---

## 8. Rencana SEO, Keamanan, dan Pemeliharaan

**SEO:**

- Judul (`<title>`) dan struktur heading (`h1`–`h3`) sudah unik per halaman
  (Produk, Kategori, Promo, Tentang, dsb).
- Rencana lanjutan: menambahkan meta description per halaman, atribut `alt`
  deskriptif pada semua gambar produk, data terstruktur (schema.org
  `Product`) agar harga & rating produk bisa tampil langsung di hasil
  pencarian Google, serta sitemap.xml.

**Keamanan (untuk versi produksi ke depan):**

- Saat ini seluruh data (keranjang, pesanan, customer) disimpan di
  `localStorage` browser — cocok untuk simulasi/demo, **namun tidak aman
  dan tidak persisten untuk produksi sungguhan** karena mudah diubah
  manual dari console browser dan tidak tersinkron antar perangkat.
- Rencana ke depan: pindahkan penyimpanan ke database/server (mis. dengan
  autentikasi berbasis token), enkripsi data sensitif pelanggan,
  penerapan HTTPS penuh, validasi input di sisi server (bukan hanya di
  JavaScript client), serta proteksi terhadap serangan umum (XSS, CSRF)
  terutama karena beberapa bagian saat ini merender input pengguna
  langsung ke `innerHTML`.
- Kredensial admin (login) perlu dipindahkan dari front-end statis ke
  sistem autentikasi server yang sesungguhnya sebelum go-live.

**Pemeliharaan:**

- Update katalog produk & harga dilakukan berkala mengikuti stok gudang.
- Pemantauan error melalui console log dan (di masa depan) tools monitoring
  seperti Sentry.
- Backup data pelanggan & pesanan terjadwal setelah migrasi ke database
  sungguhan.

---

## 9. Rencana Penggunaan Data Analytics untuk Pengambilan Keputusan

Website ini sudah dilengkapi integrasi **Google Analytics 4 (dummy)** — lihat
`js/analytics.js` — yang mencatat event standar e-commerce di sepanjang
funnel belanja:

| Event              | Dipicu saat                        | Kegunaan untuk bisnis                                                       |
| ------------------ | ---------------------------------- | --------------------------------------------------------------------------- |
| `page_view`        | Pengunjung membuka halaman         | Mengukur traffic & halaman terpopuler                                       |
| `search`           | Pengunjung memakai kolom pencarian | Mengetahui produk/kata kunci yang paling dicari (input untuk katalog)       |
| `view_item`        | Membuka detail produk              | Melihat produk mana yang paling menarik minat, walau belum tentu dibeli     |
| `add_to_cart`      | Produk ditambah ke keranjang       | Mengukur minat beli awal per produk                                         |
| `remove_from_cart` | Produk dihapus dari keranjang      | Indikasi produk yang gagal meyakinkan pelanggan (harga? ongkir? deskripsi?) |
| `begin_checkout`   | Pelanggan membuka halaman checkout | Titik awal funnel akhir — dasar untuk hitung **cart abandonment rate**      |
| `add_payment_info` | Metode pembayaran dipilih          | Melihat metode pembayaran favorit pelanggan                                 |
| `purchase`         | Transaksi berhasil                 | Metrik konversi utama — dasar hitung **conversion rate** & **revenue**      |

**Metrik utama yang akan dipantau:**

1. **Bounce rate** — persentase pengunjung yang keluar tanpa interaksi;
   nilai tinggi di halaman Produk/Kategori mengindikasikan masalah pada
   hero banner, kecepatan halaman, atau relevansi produk yang ditampilkan.
2. **Conversion rate** — perbandingan jumlah event `purchase` terhadap
   total sesi/pengunjung; metrik inti untuk menilai efektivitas keseluruhan
   funnel (dari lihat produk sampai bayar).
3. **Cart abandonment rate** — perbandingan `begin_checkout` yang **tidak**
   berlanjut ke `purchase`; nilai tinggi mengarahkan evaluasi ke biaya
   ongkir, kelengkapan metode pembayaran, atau panjang form checkout.
4. **Produk terlaris & paling sering dilihat tapi jarang dibeli** —
   dari perbandingan `view_item` vs `add_to_cart` vs `purchase` per produk;
   dipakai untuk keputusan re-pricing, revisi deskripsi/foto, atau justru
   menghentikan produk yang tidak laku.
5. **Metode pembayaran favorit** — dari `add_payment_info`; dipakai untuk
   memprioritaskan metode mana yang perlu ditonjolkan/dipermudah di UI
   checkout.
6. **Rata-rata nilai transaksi (Average Order Value)** — dari nilai `value`
   pada event `purchase`; dipakai untuk merancang strategi bundling atau
   ambang batas gratis ongkir.

**Cara pakai untuk pengambilan keputusan:** data di atas ditinjau berkala
(mingguan/bulanan) melalui dashboard GA4, lalu dikombinasikan dengan data
internal di halaman admin **Laporan** (pendapatan, produk terlaris per
kategori) untuk memutuskan: produk mana yang perlu di-restock/didiskon,
kategori mana yang perlu ditambah variannya, dan titik funnel mana yang
paling banyak kehilangan calon pembeli.

---

## Catatan Teknis Implementasi

- **Frontend:** HTML, CSS (Flexbox & Grid), JavaScript vanilla — tanpa
  framework, tanpa build step.
- **Penyimpanan data:** `localStorage` browser (simulasi database) untuk
  keranjang, wishlist, tema, pesanan, dan data customer.
- **Admin panel:** halaman terpisah (`admin/`) untuk kelola Produk,
  Kategori, Pesanan, Customer, Promo, dan Laporan — datanya otomatis
  tersinkron dari aktivitas checkout pelanggan di sisi customer-facing.
- **Analytics:** Google Analytics 4 dummy (`G-DUMMY123456`) — ganti dengan
  Measurement ID asli sebelum go-live.
- **Payment gateway:** simulasi gaya Midtrans (lihat bagian 7) — perlu
  integrasi API sungguhan untuk produksi.
