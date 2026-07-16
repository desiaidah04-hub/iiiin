// ======================================
// DASHBOARD ADMIN
// DMEN'STYLE STORE
// ======================================

// Statistik
const totalProduk = document.getElementById("produk");
const totalPesanan = document.getElementById("pesanan");
const totalCustomer = document.getElementById("customer");
const totalPendapatan = document.getElementById("pendapatan");

// Tabel
const produkTable = document.getElementById("produkTable");

// ======================================
// LOAD DATA PRODUK
// ======================================

const STORAGE_KEY = "mensStyleProdukData";

// Data produk yang sedang aktif di halaman ini (dipakai bareng oleh
// tampilan tabel, statistik, dan fitur tambah produk).
let produkAktif = [];

function loadProduk() {
  try {
    // Ambil data dari localStorage kalau sudah pernah diedit lewat halaman
    // Produk (tambah/edit/hapus). Kalau belum ada sama sekali, pakai
    // data awal dari PRODUK_DATA (produk-data.js).
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {
      produkAktif = JSON.parse(stored);
    } else {
      if (typeof PRODUK_DATA === "undefined") {
        throw new Error(
          "PRODUK_DATA tidak ditemukan — pastikan produk-data.js sudah di-include sebelum dashboard.js",
        );
      }
      produkAktif = PRODUK_DATA;
    }

    tampilProduk(produkAktif);

    isiStatistik(produkAktif);
  } catch (error) {
    console.error(error);

    produkTable.innerHTML = `
        <tr>
            <td colspan="6" style="text-align:center;color:red;">
                Gagal memuat data produk (${error.message})
            </td>
        </tr>
        `;
  }
}

function simpanProduk() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(produkAktif));
}

// ======================================
// TAMPILKAN DATA KE TABEL
// ======================================

function tampilProduk(data) {
  produkTable.innerHTML = "";

  data.forEach((item) => {
    const stok = item.stok ?? 20;

    const status =
      stok > 0
        ? '<span class="status tersedia">Tersedia</span>'
        : '<span class="status habis">Habis</span>';

    // Gambar upload baru disimpan sebagai data URL (base64), sedangkan
    // data awal dari produk-data.js berupa path relatif ke folder images.
    const srcGambar = item.gambar.startsWith("data:")
      ? item.gambar
      : `../${item.gambar}`;

    produkTable.innerHTML += `

        <tr>

            <td>
                <img src="${srcGambar}" alt="${item.nama}">
            </td>

            <td>${item.nama}</td>

            <td>${item.kategori}</td>

            <td>
                Rp ${item.harga.toLocaleString("id-ID")}
            </td>

            <td>${stok}</td>

            <td>${status}</td>

        </tr>

        `;
  });
}

// ======================================
// ISI STATISTIK
// ======================================

function isiStatistik(data) {
  totalProduk.innerText = data.length;

  // Dummy
  totalPesanan.innerText = 27;

  totalCustomer.innerText = 15;

  let pendapatan = 0;

  data.forEach((item) => {
    pendapatan += item.harga;
  });

  totalPendapatan.innerText = "Rp " + pendapatan.toLocaleString("id-ID");
}

// ======================================
// TAMBAH PRODUK (MODAL)
// ======================================

const modalTambahProduk = document.getElementById("modalTambahProduk");
const btnTambahProduk = document.getElementById("btnTambahProduk");
const btnCloseModal = document.getElementById("btnCloseModal");
const btnCancelModal = document.getElementById("btnCancelModal");
const formTambahProduk = document.getElementById("formTambahProduk");
const formError = document.getElementById("formError");

const inputGambar = document.getElementById("inputGambar");
const previewGambar = document.getElementById("previewGambar");
const inputNama = document.getElementById("inputNama");
const inputKategori = document.getElementById("inputKategori");
const inputHarga = document.getElementById("inputHarga");
const inputStok = document.getElementById("inputStok");

let gambarBase64 = "";

function bukaModal() {
  modalTambahProduk.classList.add("active");
}

function tutupModal() {
  modalTambahProduk.classList.remove("active");
  formTambahProduk.reset();
  previewGambar.style.display = "none";
  previewGambar.src = "";
  gambarBase64 = "";
  formError.textContent = "";
}

if (btnTambahProduk) {
  btnTambahProduk.addEventListener("click", bukaModal);
}

if (btnCloseModal) {
  btnCloseModal.addEventListener("click", tutupModal);
}

if (btnCancelModal) {
  btnCancelModal.addEventListener("click", tutupModal);
}

// Klik di luar kotak modal untuk menutup
if (modalTambahProduk) {
  modalTambahProduk.addEventListener("click", (e) => {
    if (e.target === modalTambahProduk) tutupModal();
  });
}

// Preview gambar yang di-upload
if (inputGambar) {
  inputGambar.addEventListener("change", () => {
    const file = inputGambar.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      gambarBase64 = reader.result;
      previewGambar.src = gambarBase64;
      previewGambar.style.display = "block";
    };
    reader.readAsDataURL(file);
  });
}

// Submit form tambah produk
if (formTambahProduk) {
  formTambahProduk.addEventListener("submit", (e) => {
    e.preventDefault();

    const nama = inputNama.value.trim();
    const kategori = inputKategori.value.trim();
    const harga = parseInt(inputHarga.value, 10);
    const stok = parseInt(inputStok.value, 10);

    if (!nama || !kategori || isNaN(harga) || isNaN(stok)) {
      formError.textContent = "Semua field wajib diisi dengan benar.";
      return;
    }

    const produkBaru = {
      id: Date.now(),
      nama,
      kategori,
      harga,
      stok,
      // Kalau admin tidak upload gambar, pakai placeholder default.
      gambar: gambarBase64 || "images/no-image.jpg",
    };

    produkAktif = [produkBaru, ...produkAktif];

    simpanProduk();
    tampilProduk(produkAktif);
    isiStatistik(produkAktif);

    tutupModal();
  });
}

// ======================================

loadProduk();
