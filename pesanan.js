// ======================================================
// DMEN'STYLE STORE
// admin/pesanan.js
// CRUD Pesanan (localStorage)
// ======================================================

// ===============================
// ELEMENT HTML
// ===============================

const tablePesanan = document.getElementById("tablePesanan");

const formPesanan = document.getElementById("formPesanan");

const modalPesanan = document.getElementById("modalPesanan");

const btnTambah = document.getElementById("btnTambah");

const closeModal = document.getElementById("closeModal");

const judulModal = document.getElementById("judulModal");

const search = document.getElementById("search");

const filterStatus = document.getElementById("filterStatus");

const modalDetail = document.getElementById("modalDetail");

const closeDetail = document.getElementById("closeDetail");

const isiDetail = document.getElementById("isiDetail");

// ===============================
// INPUT FORM
// ===============================

const idPesanan = document.getElementById("idPesanan");

const customer = document.getElementById("customer");

const produk = document.getElementById("produk");

const total = document.getElementById("total");

const tanggal = document.getElementById("tanggal");

const status = document.getElementById("status");

// ===============================
// DATA
// ===============================

let daftarPesanan = [];

let modeEdit = false;

// ===============================
// LOAD DATA
// ===============================

function loadPesanan() {
  const data = localStorage.getItem("pesanan");

  let dataValid = null;

  if (data) {
    try {
      dataValid = JSON.parse(data);

      if (!Array.isArray(dataValid)) {
        dataValid = null;
      }
    } catch (err) {
      console.error(
        "Data pesanan di localStorage rusak/tidak valid, akan direset ke default:",
        err,
      );

      dataValid = null;
    }
  }

  if (dataValid) {
    daftarPesanan = dataValid;
  } else {
    daftarPesanan = [
      {
        id: 1,
        noPesanan: "ORD-0001",
        customer: "Budi Santoso",
        produk: "Oversize T-Shirt Black x1, Premium Hoodie Grey x1",
        total: 478000,
        tanggal: "2026-07-10",
        status: "Diproses",
      },
      {
        id: 2,
        noPesanan: "ORD-0002",
        customer: "Rina Amelia",
        produk: "Slim Fit Shirt White x2",
        total: 498000,
        tanggal: "2026-07-11",
        status: "Menunggu Pembayaran",
      },
      {
        id: 3,
        noPesanan: "ORD-0003",
        customer: "Dedi Kurniawan",
        produk: "Oversize T-Shirt Black x1",
        total: 149000,
        tanggal: "2026-07-08",
        status: "Selesai",
      },
    ];

    simpanPesanan();
  }
}

// ===============================
// SIMPAN DATA
// ===============================

function simpanPesanan() {
  localStorage.setItem("pesanan", JSON.stringify(daftarPesanan));
}

// ===============================
// FORMAT RUPIAH
// ===============================

function rupiah(angka) {
  return angka.toLocaleString("id-ID");
}

// ===============================
// FORMAT TANGGAL (id-ID)
// ===============================

function formatTanggal(tgl) {
  const d = new Date(tgl);

  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// ===============================
// KELAS BADGE STATUS
// ===============================

function kelasStatus(status) {
  switch (status) {
    case "Menunggu Pembayaran":
      return "menunggu";
    case "Diproses":
      return "diproses";
    case "Dikirim":
      return "dikirim";
    case "Selesai":
      return "selesai";
    case "Dibatalkan":
      return "dibatalkan";
    default:
      return "menunggu";
  }
}

// ===============================
// GENERATE NOMOR PESANAN
// ===============================

function generateNoPesanan() {
  const nomorUrut = daftarPesanan.length + 1;

  return "ORD-" + String(nomorUrut).padStart(4, "0");
}

function generateId() {
  if (daftarPesanan.length === 0) {
    return 1;
  }

  return Math.max(...daftarPesanan.map((item) => item.id)) + 1;
}

// ===============================
// RENDER TABEL
// ===============================

function renderPesanan(data = daftarPesanan) {
  tablePesanan.innerHTML = "";

  if (data.length === 0) {
    tablePesanan.innerHTML = `
        <tr>
            <td colspan="8" style="text-align:center;padding:40px;">
                Tidak ada pesanan.
            </td>
        </tr>
        `;

    return;
  }

  data.forEach((item, index) => {
    tablePesanan.innerHTML += `
<tr>
<td>${index + 1}</td>

<td>${item.noPesanan}</td>

<td>${item.customer}</td>

<td>${item.produk}</td>

<td>Rp ${rupiah(item.total)}</td>

<td>${formatTanggal(item.tanggal)}</td>

<td>
<span class="status ${kelasStatus(item.status)}">${item.status}</span>
</td>

<td>
<div class="action-btn">
<button class="detail-btn" onclick="lihatDetail(${item.id})" title="Detail">
<i class="fa-solid fa-eye"></i>
</button>
<button class="edit-btn" onclick="editPesanan(${item.id})" title="Edit">
<i class="fa-solid fa-pen"></i>
</button>
<button class="delete-btn" onclick="hapusPesanan(${item.id})" title="Hapus">
<i class="fa-solid fa-trash"></i>
</button>
</div>
</td>
</tr>
`;
  });
}

// ===============================
// DETAIL PESANAN
// ===============================

function lihatDetail(id) {
  const item = daftarPesanan.find((p) => p.id == id);

  if (!item) return;

  isiDetail.innerHTML = `
    <div class="detail-row"><span>No. Pesanan</span><span>${item.noPesanan}</span></div>
    <div class="detail-row"><span>Customer</span><span>${item.customer}</span></div>
    <div class="detail-row"><span>Produk</span><span>${item.produk}</span></div>
    <div class="detail-row"><span>Total</span><span>Rp ${rupiah(item.total)}</span></div>
    <div class="detail-row"><span>Tanggal</span><span>${formatTanggal(item.tanggal)}</span></div>
    <div class="detail-row"><span>Status</span><span><span class="status ${kelasStatus(item.status)}">${item.status}</span></span></div>
  `;

  modalDetail.classList.add("active");
}

closeDetail.addEventListener("click", () => {
  modalDetail.classList.remove("active");
});

window.addEventListener("click", (e) => {
  if (e.target == modalDetail) {
    modalDetail.classList.remove("active");
  }
});

// ===============================
// MODAL TAMBAH/EDIT
// ===============================

function bukaModal() {
  modalPesanan.classList.add("active");
}

function tutupModal() {
  modalPesanan.classList.remove("active");

  formPesanan.reset();

  idPesanan.value = "";

  modeEdit = false;

  judulModal.innerHTML = "Tambah Pesanan";
}

function resetForm() {
  formPesanan.reset();

  idPesanan.value = "";

  modeEdit = false;

  judulModal.innerHTML = "Tambah Pesanan";

  tanggal.value = new Date().toISOString().split("T")[0];
}

// ===============================
// TAMBAH / EDIT PESANAN
// ===============================

formPesanan.addEventListener("submit", function (e) {
  e.preventDefault();

  const dataPesanan = {
    id: modeEdit ? Number(idPesanan.value) : generateId(),

    noPesanan: modeEdit
      ? daftarPesanan.find((p) => p.id == Number(idPesanan.value)).noPesanan
      : generateNoPesanan(),

    customer: customer.value.trim(),

    produk: produk.value.trim(),

    total: Number(total.value),

    tanggal: tanggal.value,

    status: status.value,
  };

  if (
    dataPesanan.customer === "" ||
    dataPesanan.produk === "" ||
    dataPesanan.total <= 0 ||
    dataPesanan.tanggal === ""
  ) {
    Swal.fire({
      icon: "warning",
      title: "Data belum lengkap",
      text: "Silakan lengkapi semua data pesanan.",
    });

    return;
  }

  if (modeEdit) {
    const index = daftarPesanan.findIndex((item) => item.id == dataPesanan.id);

    if (index !== -1) {
      daftarPesanan[index] = dataPesanan;
    }

    Swal.fire({
      icon: "success",
      title: "Berhasil",
      text: "Pesanan berhasil diperbarui.",
    });
  } else {
    daftarPesanan.push(dataPesanan);

    Swal.fire({
      icon: "success",
      title: "Berhasil",
      text: "Pesanan berhasil ditambahkan.",
    });
  }

  simpanPesanan();

  renderPesanan();

  tutupModal();
});

// ===============================
// EDIT PESANAN
// ===============================

function editPesanan(id) {
  const item = daftarPesanan.find((p) => p.id == id);

  if (!item) return;

  modeEdit = true;

  judulModal.innerHTML = "Edit Pesanan";

  idPesanan.value = item.id;

  customer.value = item.customer;

  produk.value = item.produk;

  total.value = item.total;

  tanggal.value = item.tanggal;

  status.value = item.status;

  bukaModal();
}

// ===============================
// HAPUS PESANAN
// ===============================

function hapusPesanan(id) {
  const item = daftarPesanan.find((p) => p.id == id);

  if (!item) return;

  Swal.fire({
    title: "Hapus Pesanan?",
    text: `Pesanan ${item.noPesanan} atas nama ${item.customer} akan dihapus permanen.`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Ya, Hapus",
    cancelButtonText: "Batal",
  }).then((result) => {
    if (result.isConfirmed) {
      daftarPesanan = daftarPesanan.filter((p) => p.id != id);

      simpanPesanan();

      renderPesanan();

      Swal.fire({
        icon: "success",
        title: "Terhapus",
        text: "Pesanan berhasil dihapus.",
      });
    }
  });
}

// ===============================
// SEARCH PESANAN
// ===============================

function terapkanFilter() {
  const keyword = search.value.toLowerCase().trim();

  const statusDipilih = filterStatus.value;

  let hasil = daftarPesanan.filter((item) => {
    const cocokKeyword =
      item.customer.toLowerCase().includes(keyword) ||
      item.noPesanan.toLowerCase().includes(keyword);

    const cocokStatus =
      statusDipilih === "Semua" || item.status === statusDipilih;

    return cocokKeyword && cocokStatus;
  });

  renderPesanan(hasil);
}

search.addEventListener("keyup", terapkanFilter);

filterStatus.addEventListener("change", terapkanFilter);

// ===============================
// EVENT MODAL TAMBAH
// ===============================

btnTambah.addEventListener("click", () => {
  resetForm();

  bukaModal();
});

closeModal.addEventListener("click", () => {
  tutupModal();
});

window.addEventListener("click", (e) => {
  if (e.target == modalPesanan) {
    tutupModal();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    tutupModal();

    modalDetail.classList.remove("active");
  }
});

formPesanan.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
  }
});

// ===============================
// VALIDASI INPUT ANGKA
// ===============================

total.addEventListener("input", () => {
  if (total.value < 0) {
    total.value = 0;
  }
});

// ===============================
// LOAD PERTAMA
// ===============================

loadPesanan();

renderPesanan();

console.log("CRUD Pesanan Admin Siap Digunakan");
