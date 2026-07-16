// ======================================================
// DMEN'STYLE STORE
// admin/kategori.js
// CRUD Kategori (localStorage)
// ======================================================

// ===============================
// ELEMENT HTML
// ===============================

const tableKategori = document.getElementById("tableKategori");

const formKategori = document.getElementById("formKategori");

const modalKategori = document.getElementById("modalKategori");

const btnTambah = document.getElementById("btnTambah");

const closeModal = document.getElementById("closeModal");

const judulModal = document.getElementById("judulModal");

const search = document.getElementById("search");

// ===============================
// INPUT
// ===============================

const idKategori = document.getElementById("idKategori");

const nama = document.getElementById("nama");

const icon = document.getElementById("icon");

const iconPreview = document.getElementById("iconPreview");

// ===============================
// DATA
// ===============================

let daftarKategori = [];

let modeEdit = false;

// ===============================
// LOAD DATA KATEGORI
// ===============================

function loadKategori() {
  const data = localStorage.getItem("kategori");

  if (data) {
    daftarKategori = JSON.parse(data);
  } else {
    daftarKategori = [
      { id: 1, nama: "Kaos", icon: "fa-solid fa-shirt" },
      { id: 2, nama: "Kemeja", icon: "fa-solid fa-user-tie" },
      { id: 3, nama: "Hoodie", icon: "fa-solid fa-person" },
      { id: 4, nama: "Jaket", icon: "fa-solid fa-vest" },
      { id: 5, nama: "Celana", icon: "fa-solid fa-socks" },
      { id: 6, nama: "Sepatu", icon: "fa-solid fa-shoe-prints" },
    ];

    simpanKategori();
  }
}

// ===============================
// SIMPAN DATA
// ===============================

function simpanKategori() {
  localStorage.setItem("kategori", JSON.stringify(daftarKategori));
}

// ===============================
// HITUNG JUMLAH PRODUK PER KATEGORI
// (ambil dari data "produk" di localStorage, kalau ada)
// ===============================

function hitungJumlahProduk(namaKategori) {
  const dataProduk = localStorage.getItem("produk");

  if (!dataProduk) return 0;

  try {
    const produk = JSON.parse(dataProduk);

    return produk.filter((item) => item.kategori === namaKategori).length;
  } catch (e) {
    return 0;
  }
}

// ===============================
// RENDER TABEL
// ===============================

function renderKategori(data = daftarKategori) {
  tableKategori.innerHTML = "";

  if (data.length === 0) {
    tableKategori.innerHTML = `
        <tr>
            <td colspan="5" style="text-align:center;padding:40px;">
                Tidak ada kategori.
            </td>
        </tr>
        `;

    return;
  }

  data.forEach((item, index) => {
    const jumlahProduk = hitungJumlahProduk(item.nama);

    tableKategori.innerHTML += `
<tr>
<td>${index + 1}</td>

<td class="icon-cell">
<i class="${item.icon}"></i>
</td>

<td>${item.nama}</td>

<td>${jumlahProduk} produk</td>

<td>
<div class="action-btn">
<button class="edit-btn" onclick="editKategori(${item.id})">
<i class="fa-solid fa-pen"></i>
</button>
<button class="delete-btn" onclick="hapusKategori(${item.id})">
<i class="fa-solid fa-trash"></i>
</button>
</div>
</td>
</tr>
`;
  });
}

// ===============================
// MODAL
// ===============================

function bukaModal() {
  modalKategori.classList.add("active");
}

function tutupModal() {
  modalKategori.classList.remove("active");

  formKategori.reset();

  idKategori.value = "";

  modeEdit = false;

  judulModal.innerHTML = "Tambah Kategori";

  updatePreview();
}

function resetForm() {
  formKategori.reset();

  idKategori.value = "";

  modeEdit = false;

  judulModal.innerHTML = "Tambah Kategori";

  updatePreview();
}

// ===============================
// PREVIEW IKON
// ===============================

function updatePreview() {
  const kelasIcon = icon.value.trim() || "fa-solid fa-shirt";

  iconPreview.innerHTML = `<i class="${kelasIcon}"></i>`;
}

icon.addEventListener("input", updatePreview);

// ===============================
// GENERATE ID BARU
// ===============================

function generateId() {
  if (daftarKategori.length === 0) {
    return 1;
  }

  return Math.max(...daftarKategori.map((item) => item.id)) + 1;
}

// ===============================
// TAMBAH / EDIT KATEGORI
// ===============================

formKategori.addEventListener("submit", function (e) {
  e.preventDefault();

  const dataKategori = {
    id: modeEdit ? Number(idKategori.value) : generateId(),

    nama: nama.value.trim(),

    icon: icon.value.trim(),
  };

  // VALIDASI

  if (dataKategori.nama === "" || dataKategori.icon === "") {
    Swal.fire({
      icon: "warning",
      title: "Data belum lengkap",
      text: "Nama kategori dan ikon wajib diisi.",
    });

    return;
  }

  // Cegah nama kategori duplikat

  const duplikat = daftarKategori.find(
    (item) =>
      item.nama.toLowerCase() === dataKategori.nama.toLowerCase() &&
      item.id !== dataKategori.id,
  );

  if (duplikat) {
    Swal.fire({
      icon: "error",
      title: "Kategori sudah ada",
      text: `Kategori "${dataKategori.nama}" sudah terdaftar.`,
    });

    return;
  }

  if (modeEdit) {
    const index = daftarKategori.findIndex(
      (item) => item.id == dataKategori.id,
    );

    if (index !== -1) {
      daftarKategori[index] = dataKategori;
    }

    Swal.fire({
      icon: "success",
      title: "Berhasil",
      text: "Kategori berhasil diperbarui.",
    });
  } else {
    daftarKategori.push(dataKategori);

    Swal.fire({
      icon: "success",
      title: "Berhasil",
      text: "Kategori berhasil ditambahkan.",
    });
  }

  simpanKategori();

  renderKategori();

  tutupModal();
});

// ===============================
// EDIT KATEGORI
// ===============================

function editKategori(id) {
  const kategori = daftarKategori.find((item) => item.id == id);

  if (!kategori) return;

  modeEdit = true;

  judulModal.innerHTML = "Edit Kategori";

  idKategori.value = kategori.id;

  nama.value = kategori.nama;

  icon.value = kategori.icon;

  updatePreview();

  bukaModal();
}

// ===============================
// HAPUS KATEGORI
// ===============================

function hapusKategori(id) {
  const kategori = daftarKategori.find((item) => item.id == id);

  if (!kategori) return;

  const jumlahProduk = hitungJumlahProduk(kategori.nama);

  Swal.fire({
    title: "Hapus Kategori?",
    text:
      jumlahProduk > 0
        ? `Kategori "${kategori.nama}" masih dipakai oleh ${jumlahProduk} produk. Yakin tetap hapus?`
        : `Kategori "${kategori.nama}" akan dihapus permanen.`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Ya, Hapus",
    cancelButtonText: "Batal",
  }).then((result) => {
    if (result.isConfirmed) {
      daftarKategori = daftarKategori.filter((item) => item.id != id);

      simpanKategori();

      renderKategori();

      Swal.fire({
        icon: "success",
        title: "Terhapus",
        text: "Kategori berhasil dihapus.",
      });
    }
  });
}

// ===============================
// SEARCH KATEGORI
// ===============================

search.addEventListener("keyup", function () {
  const keyword = this.value.toLowerCase().trim();

  const hasil = daftarKategori.filter((item) =>
    item.nama.toLowerCase().includes(keyword),
  );

  renderKategori(hasil);
});

// ===============================
// EVENT MODAL
// ===============================

btnTambah.addEventListener("click", () => {
  resetForm();

  bukaModal();
});

closeModal.addEventListener("click", () => {
  tutupModal();
});

window.addEventListener("click", (e) => {
  if (e.target == modalKategori) {
    tutupModal();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    tutupModal();
  }
});

formKategori.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
  }
});

// ===============================
// LOAD PERTAMA
// ===============================

loadKategori();

renderKategori();

console.log("CRUD Kategori Admin Siap Digunakan");
