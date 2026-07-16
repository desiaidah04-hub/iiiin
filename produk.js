// ======================================
// KELOLA PRODUK (TAMBAH / EDIT / HAPUS)
// DMEN'STYLE STORE
// ======================================
//
// Data disimpan di localStorage browser (tidak ada backend/database).
// Data awal diambil dari PRODUK_DATA (produk-data.js). Halaman ini bisa
// dibuka langsung (double-click), tidak perlu server lokal.

const STORAGE_KEY = "mensStyleProdukData";

// Elemen tabel & toolbar
const tableProduk = document.getElementById("tableProduk");
const searchInput = document.getElementById("search");
const filterKategori = document.getElementById("filterKategori");

// Elemen modal & form
const modalProduk = document.getElementById("modalProduk");
const judulModal = document.getElementById("judulModal");
const closeModal = document.getElementById("closeModal");
const formProduk = document.getElementById("formProduk");
const btnTambah = document.getElementById("btnTambah");

const idProduk = document.getElementById("idProduk");
const inputNama = document.getElementById("nama");
const inputKategori = document.getElementById("kategori");
const inputHarga = document.getElementById("harga");
const inputStok = document.getElementById("stok");
const inputGambar = document.getElementById("gambar");

// Elemen upload & preview gambar
const gambarFileInput = document.getElementById("gambarFile");
const previewGambar = document.getElementById("previewGambar");
const previewGambarText = document.getElementById("previewGambarText");

// ======================================
// GAMBAR: PREVIEW & PATH
// ======================================

// Data lama (dari produk-data.js) memakai path relatif "images/...".
// Gambar yang baru diupload disimpan sebagai data URL (base64) supaya
// tidak butuh server. Fungsi ini menyesuaikan path-nya saat ditampilkan.
function resolveGambarSrc(path) {
  if (!path) return "";
  if (path.startsWith("data:") || path.startsWith("http")) return path;
  return `../${path}`;
}

function tampilkanPreview(src) {
  if (src) {
    previewGambar.innerHTML = `<img src="${src}" alt="Preview gambar produk">`;
  } else {
    previewGambar.innerHTML = `<span id="previewGambarText">Klik untuk pilih gambar</span>`;
  }
}

if (gambarFileInput) {
  gambarFileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      inputGambar.value = ev.target.result; // simpan sebagai data URL
      tampilkanPreview(ev.target.result);
    };
    reader.readAsDataURL(file);
  });
}

// ======================================
// AMBIL / SIMPAN DATA
// ======================================

function getProdukData() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {
      return JSON.parse(stored);
    }

    // Belum ada data tersimpan -> pakai data awal dari produk-data.js
    if (typeof PRODUK_DATA === "undefined") {
      throw new Error(
        "PRODUK_DATA tidak ditemukan — pastikan produk-data.js sudah di-include sebelum produk.js",
      );
    }

    saveProdukData(PRODUK_DATA);
    return PRODUK_DATA;
  } catch (error) {
    console.error("Gagal mengambil data produk:", error);
    return [];
  }
}

function saveProdukData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// ======================================
// RENDER TABEL (dengan filter search & kategori)
// ======================================

function renderTabel() {
  const data = getProdukData();
  const keyword = searchInput.value.toLowerCase().trim();
  const kategoriTerpilih = filterKategori.value;

  let hasil = data.filter((item) => {
    const cocokNama = item.nama.toLowerCase().includes(keyword);
    const cocokKategori =
      kategoriTerpilih === "Semua" || item.kategori === kategoriTerpilih;

    return cocokNama && cocokKategori;
  });

  if (!hasil.length) {
    tableProduk.innerHTML = `
      <tr>
        <td colspan="7" style="text-align:center;color:#888;">
          Tidak ada produk yang cocok.
        </td>
      </tr>
    `;
    return;
  }

  tableProduk.innerHTML = "";

  hasil.forEach((item, index) => {
    const gambarSrc = resolveGambarSrc(item.gambar);

    tableProduk.innerHTML += `
      <tr data-id="${item.id}">
        <td>${index + 1}</td>
        <td>
          ${
            gambarSrc
              ? `<img src="${gambarSrc}" alt="${item.nama}" onerror="this.style.opacity=0.3" style="width:60px;height:60px;object-fit:cover;border-radius:8px;">`
              : "-"
          }
        </td>
        <td>${item.nama}</td>
        <td>${item.kategori}</td>
        <td>Rp ${Number(item.harga || 0).toLocaleString("id-ID")}</td>
        <td>${item.stok ?? 0}</td>
        <td>
          <button class="btn-aksi btn-edit" onclick="bukaModalEdit(${item.id})">
            <i class="fa-solid fa-pen"></i>
          </button>
          <button class="btn-aksi btn-hapus" onclick="hapusProduk(${item.id})">
            <i class="fa-solid fa-trash"></i>
          </button>
        </td>
      </tr>
    `;
  });
}

// ======================================
// MODAL: BUKA / TUTUP
// ======================================

function bukaModalTambah() {
  judulModal.innerText = "Tambah Produk";
  formProduk.reset();
  idProduk.value = "";
  inputGambar.value = "";
  tampilkanPreview("");
  modalProduk.classList.add("show");
}

function bukaModalEdit(id) {
  const data = getProdukData();
  const item = data.find((p) => p.id === id);

  if (!item) return;

  judulModal.innerText = "Edit Produk";

  idProduk.value = item.id;
  inputNama.value = item.nama || "";
  inputKategori.value = item.kategori || "";
  inputHarga.value = item.harga || 0;
  inputStok.value = item.stok ?? 0;
  inputGambar.value = item.gambar || "";
  tampilkanPreview(resolveGambarSrc(item.gambar));

  modalProduk.classList.add("show");
}

function tutupModal() {
  modalProduk.classList.remove("show");
  formProduk.reset();
  inputGambar.value = "";
  tampilkanPreview("");
}

// ======================================
// TAMBAH / EDIT (SUBMIT FORM)
// ======================================

function handleSubmitForm(e) {
  e.preventDefault();

  const data = getProdukData();
  const id = idProduk.value;

  const produkBaru = {
    nama: inputNama.value.trim(),
    kategori: inputKategori.value,
    harga: Number(inputHarga.value) || 0,
    stok: Number(inputStok.value) || 0,
    gambar: inputGambar.value.trim(),
  };

  if (id) {
    // EDIT: cari index produk lalu update (field lain seperti deskripsi,
    // warna, ukuran, promo tetap dipertahankan kalau sudah ada sebelumnya)
    const index = data.findIndex((p) => p.id === Number(id));

    if (index !== -1) {
      data[index] = { ...data[index], ...produkBaru, id: Number(id) };
    }

    saveProdukData(data);
    tutupModal();
    renderTabel();

    if (typeof Swal !== "undefined") {
      Swal.fire({
        icon: "success",
        title: "Produk berhasil diperbarui",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  } else {
    // TAMBAH: buat id baru (id tertinggi + 1)
    const idBaru = data.length > 0 ? Math.max(...data.map((p) => p.id)) + 1 : 1;

    data.push({ id: idBaru, ...produkBaru });

    saveProdukData(data);
    tutupModal();
    renderTabel();

    if (typeof Swal !== "undefined") {
      Swal.fire({
        icon: "success",
        title: "Produk berhasil ditambahkan",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  }
}

// ======================================
// HAPUS PRODUK
// ======================================

function hapusProduk(id) {
  const jalankanHapus = () => {
    const data = getProdukData();
    const dataBaru = data.filter((p) => p.id !== id);

    saveProdukData(dataBaru);
    renderTabel();
  };

  if (typeof Swal !== "undefined") {
    Swal.fire({
      title: "Yakin ingin menghapus produk ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
      confirmButtonColor: "#dc2626",
    }).then((result) => {
      if (result.isConfirmed) {
        jalankanHapus();

        Swal.fire({
          icon: "success",
          title: "Produk berhasil dihapus",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  } else {
    if (confirm("Yakin ingin menghapus produk ini?")) {
      jalankanHapus();
    }
  }
}

// ======================================
// EVENT LISTENERS
// ======================================

btnTambah.addEventListener("click", bukaModalTambah);
closeModal.addEventListener("click", tutupModal);
formProduk.addEventListener("submit", handleSubmitForm);
searchInput.addEventListener("input", renderTabel);
filterKategori.addEventListener("change", renderTabel);

// Tutup modal kalau klik di luar kotak modal
modalProduk.addEventListener("click", (e) => {
  if (e.target === modalProduk) {
    tutupModal();
  }
});

// ======================================
// INISIALISASI
// ======================================

renderTabel();
