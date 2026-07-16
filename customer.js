// =======================================================
// DMEN'STYLE STORE - ADMIN
// customer.js
// Data customer otomatis/bawaan + CRUD + Detail (tab)
// =======================================================

const STORAGE_KEY = "mensStyleCustomerData";

// ================================
// DATA BAWAAN (otomatis muncul saat pertama kali dibuka)
// ================================

const customerBawaan = [
  {
    id: 1,
    nama: "Andra Wijaya",
    email: "andra.wijaya@gmail.com",
    telepon: "0812-3456-7801",
    segmen: "VIP",
    bergabung: "2024-02-10",
    totalPesanan: 18,
    totalBelanja: 5420000,
    riwayat: [
      {
        tanggal: "2026-07-02",
        produk: "Jaket Bomber Hitam",
        total: 299000,
        status: "selesai",
      },
      {
        tanggal: "2026-06-18",
        produk: "Kaos Basic Putih x2",
        total: 178000,
        status: "selesai",
      },
      {
        tanggal: "2026-05-30",
        produk: "Sepatu Casual",
        total: 215000,
        status: "selesai",
      },
    ],
    alamat: [
      { label: "Rumah", detail: "Jl. Merdeka No. 12, Bandung, Jawa Barat" },
    ],
    keranjang: [{ nama: "Hoodie Oversize Abu", harga: 189000, qty: 1 }],
    wishlist: [{ nama: "Celana Chino Slimfit", harga: 195000 }],
    komplain: [
      {
        judul: "Ukuran tidak sesuai",
        tanggal: "2026-04-11",
        status: "selesai",
      },
    ],
  },
  {
    id: 2,
    nama: "Siti Nurhaliza",
    email: "siti.nurhaliza@gmail.com",
    telepon: "0813-2345-6702",
    segmen: "Reguler",
    bergabung: "2024-08-22",
    totalPesanan: 6,
    totalBelanja: 1120000,
    riwayat: [
      {
        tanggal: "2026-07-05",
        produk: "Kemeja Formal Putih",
        total: 210000,
        status: "diproses",
      },
      {
        tanggal: "2026-06-01",
        produk: "Celana Jeans Straight",
        total: 225000,
        status: "selesai",
      },
    ],
    alamat: [
      { label: "Rumah", detail: "Jl. Sudirman No. 45, Jakarta Selatan" },
    ],
    keranjang: [],
    wishlist: [{ nama: "Hoodie Zipper Navy", harga: 210000 }],
    komplain: [],
  },
  {
    id: 3,
    nama: "Budi Prasetyo",
    email: "budi.prasetyo@yahoo.com",
    telepon: "0857-1122-3303",
    segmen: "Baru",
    bergabung: "2026-06-30",
    totalPesanan: 1,
    totalBelanja: 89000,
    riwayat: [
      {
        tanggal: "2026-07-01",
        produk: "Kaos Polos Basic",
        total: 89000,
        status: "diproses",
      },
    ],
    alamat: [],
    keranjang: [],
    wishlist: [],
    komplain: [],
  },
  {
    id: 4,
    nama: "Dewi Anggraini",
    email: "dewi.anggraini@gmail.com",
    telepon: "0821-9988-7704",
    segmen: "VIP",
    bergabung: "2023-11-05",
    totalPesanan: 24,
    totalBelanja: 7250000,
    riwayat: [
      {
        tanggal: "2026-07-08",
        produk: "Jaket Parasut Outdoor",
        total: 265000,
        status: "selesai",
      },
      {
        tanggal: "2026-06-20",
        produk: "Kemeja Flanel Kotak",
        total: 175000,
        status: "selesai",
      },
    ],
    alamat: [
      { label: "Rumah", detail: "Jl. Diponegoro No. 8, Surabaya" },
      { label: "Kantor", detail: "Gedung Cyber, Jl. HR Rasuna Said, Jakarta" },
    ],
    keranjang: [],
    wishlist: [],
    komplain: [
      {
        judul: "Pengiriman terlambat",
        tanggal: "2026-07-09",
        status: "diproses",
      },
    ],
  },
  {
    id: 5,
    nama: "Rangga Saputra",
    email: "rangga.saputra@gmail.com",
    telepon: "0895-4433-2205",
    segmen: "Berisiko Churn",
    bergabung: "2023-04-14",
    totalPesanan: 3,
    totalBelanja: 540000,
    riwayat: [
      {
        tanggal: "2025-09-12",
        produk: "Celana Chino Slimfit",
        total: 195000,
        status: "selesai",
      },
    ],
    alamat: [{ label: "Rumah", detail: "Jl. Gajah Mada No. 21, Medan" }],
    keranjang: [],
    wishlist: [],
    komplain: [
      {
        judul: "Produk tidak sesuai deskripsi",
        tanggal: "2025-09-15",
        status: "terbuka",
      },
    ],
  },
  {
    id: 6,
    nama: "Putri Ramadhani",
    email: "putri.ramadhani@gmail.com",
    telepon: "0838-2211-9906",
    segmen: "Reguler",
    bergabung: "2024-12-01",
    totalPesanan: 9,
    totalBelanja: 1980000,
    riwayat: [
      {
        tanggal: "2026-06-28",
        produk: "Hoodie Oversize Abu",
        total: 189000,
        status: "selesai",
      },
      {
        tanggal: "2026-05-15",
        produk: "Kaos Grafis Urban",
        total: 119000,
        status: "selesai",
      },
    ],
    alamat: [{ label: "Rumah", detail: "Jl. Ahmad Yani No. 3, Semarang" }],
    keranjang: [{ nama: "Jaket Bomber Hitam", harga: 299000, qty: 1 }],
    wishlist: [],
    komplain: [],
  },
  {
    id: 7,
    nama: "Fajar Nugroho",
    email: "fajar.nugroho@outlook.com",
    telepon: "0812-6677-8807",
    segmen: "Baru",
    bergabung: "2026-07-10",
    totalPesanan: 0,
    totalBelanja: 0,
    riwayat: [],
    alamat: [],
    keranjang: [{ nama: "Kemeja Formal Putih", harga: 210000, qty: 2 }],
    wishlist: [{ nama: "Jaket Parasut Outdoor", harga: 265000 }],
    komplain: [],
  },
  {
    id: 8,
    nama: "Maya Kusuma",
    email: "maya.kusuma@gmail.com",
    telepon: "0817-5566-4408",
    segmen: "VIP",
    bergabung: "2022-09-19",
    totalPesanan: 31,
    totalBelanja: 9840000,
    riwayat: [
      {
        tanggal: "2026-07-11",
        produk: "Sepatu Casual",
        total: 215000,
        status: "diproses",
      },
      {
        tanggal: "2026-06-25",
        produk: "Celana Chino Slimfit",
        total: 195000,
        status: "selesai",
      },
      {
        tanggal: "2026-06-02",
        produk: "Kaos Basic Putih",
        total: 89000,
        status: "selesai",
      },
    ],
    alamat: [{ label: "Rumah", detail: "Jl. Pahlawan No. 17, Yogyakarta" }],
    keranjang: [],
    wishlist: [],
    komplain: [],
  },
];

// ================================
// LOAD / SIMPAN DATA
// ================================

function muatCustomer() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (Array.isArray(stored) && stored.length > 0) {
      return stored;
    }
  } catch (error) {
    console.error("Gagal membaca data customer:", error);
  }
  // Belum ada data tersimpan -> pakai data bawaan & simpan otomatis
  simpanCustomer(customerBawaan);
  return customerBawaan;
}

function simpanCustomer(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

let customers = muatCustomer();

// ================================
// ELEMENT HTML
// ================================

const tableCustomer = document.getElementById("tableCustomer");
const searchInput = document.getElementById("search");
const filterSegmen = document.getElementById("filterSegmen");

const statTotal = document.getElementById("statTotal");
const statPesanan = document.getElementById("statPesanan");
const statVip = document.getElementById("statVip");
const statKomplain = document.getElementById("statKomplain");

const modalCustomer = document.getElementById("modalCustomer");
const btnTambah = document.getElementById("btnTambah");
const closeModal = document.getElementById("closeModal");
const formCustomer = document.getElementById("formCustomer");
const judulModal = document.getElementById("judulModal");

const idCustomerInput = document.getElementById("idCustomer");
const namaInput = document.getElementById("nama");
const emailInput = document.getElementById("email");
const teleponInput = document.getElementById("telepon");
const segmenInput = document.getElementById("segmen");

const modalDetail = document.getElementById("modalDetail");
const closeDetail = document.getElementById("closeDetail");
const detailNama = document.getElementById("detailNama");
const detailTabs = document.getElementById("detailTabs");

// ================================
// FORMAT
// ================================

function rupiah(angka) {
  return "Rp " + (Number(angka) || 0).toLocaleString("id-ID");
}

function tanggalIndo(iso) {
  if (!iso) return "-";
  const d = new Date(iso);
  if (isNaN(d)) return iso;
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function ambilInisial(nama) {
  return nama
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((k) => k[0].toUpperCase())
    .join("");
}

function segmenClass(segmen) {
  switch (segmen) {
    case "VIP":
      return "vip";
    case "Reguler":
      return "reguler";
    case "Baru":
      return "baru";
    case "Berisiko Churn":
      return "churn";
    default:
      return "reguler";
  }
}

// ================================
// STATISTIK
// ================================

function renderStats() {
  statTotal.textContent = customers.length;

  const totalPesananSemua = customers.reduce(
    (sum, c) => sum + (c.totalPesanan || 0),
    0,
  );
  statPesanan.textContent = totalPesananSemua;

  const totalVip = customers.filter((c) => c.segmen === "VIP").length;
  statVip.textContent = totalVip;

  const totalKomplainTerbuka = customers.reduce((sum, c) => {
    const terbuka = (c.komplain || []).filter(
      (k) => k.status === "terbuka",
    ).length;
    return sum + terbuka;
  }, 0);
  statKomplain.textContent = totalKomplainTerbuka;
}

// ================================
// RENDER TABLE
// ================================

function getFiltered() {
  let hasil = [...customers];

  const kataKunci = (searchInput.value || "").trim().toLowerCase();
  if (kataKunci) {
    hasil = hasil.filter(
      (c) =>
        c.nama.toLowerCase().includes(kataKunci) ||
        c.email.toLowerCase().includes(kataKunci),
    );
  }

  const segmenFilter = filterSegmen.value;
  if (segmenFilter && segmenFilter !== "Semua") {
    hasil = hasil.filter((c) => c.segmen === segmenFilter);
  }

  return hasil;
}

function renderTable() {
  const data = getFiltered();

  if (data.length === 0) {
    tableCustomer.innerHTML = `
      <tr>
        <td colspan="8">
          <div class="empty-state">
            <i class="fa-solid fa-user-slash" style="font-size:32px;display:block;margin-bottom:10px;"></i>
            Tidak ada customer yang cocok.
          </div>
        </td>
      </tr>`;
    return;
  }

  tableCustomer.innerHTML = data
    .map((c, i) => {
      const komplainTerbuka = (c.komplain || []).filter(
        (k) => k.status === "terbuka",
      ).length;

      return `
      <tr>
        <td>${i + 1}</td>
        <td>
          <div class="cust-cell">
            <div class="avatar">${ambilInisial(c.nama)}</div>
            <div>
              <div class="cust-name">${c.nama}</div>
              <div class="cust-sub">Sejak ${tanggalIndo(c.bergabung)}</div>
            </div>
          </div>
        </td>
        <td>
          <div>${c.email}</div>
          <div class="cust-sub">${c.telepon}</div>
        </td>
        <td><span class="segmen ${segmenClass(c.segmen)}">${c.segmen}</span></td>
        <td>${c.totalPesanan || 0}</td>
        <td>${rupiah(c.totalBelanja)}</td>
        <td>
          ${
            komplainTerbuka > 0
              ? `<span class="status terbuka">${komplainTerbuka} Terbuka</span>`
              : `<span class="status selesai">Tidak ada</span>`
          }
        </td>
        <td>
          <div class="action-btn">
            <button class="detail-btn" title="Detail" onclick="bukaDetail(${c.id})">
              <i class="fa-solid fa-eye"></i>
            </button>
            <button class="edit-btn" title="Edit" onclick="bukaEdit(${c.id})">
              <i class="fa-solid fa-pen"></i>
            </button>
            <button class="delete-btn" title="Hapus" onclick="hapusCustomer(${c.id})">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </td>
      </tr>`;
    })
    .join("");
}

function renderSemua() {
  renderStats();
  renderTable();
}

searchInput.addEventListener("input", renderTable);
filterSegmen.addEventListener("change", renderTable);

// ================================
// MODAL TAMBAH / EDIT
// ================================

function bukaModalTambah() {
  judulModal.textContent = "Tambah Customer";
  formCustomer.reset();
  idCustomerInput.value = "";
  modalCustomer.classList.add("active");
}

function bukaEdit(id) {
  const c = customers.find((item) => item.id === id);
  if (!c) return;

  judulModal.textContent = "Edit Customer";
  idCustomerInput.value = c.id;
  namaInput.value = c.nama;
  emailInput.value = c.email;
  teleponInput.value = c.telepon;
  segmenInput.value = c.segmen;

  modalCustomer.classList.add("active");
}

function tutupModalCustomer() {
  modalCustomer.classList.remove("active");
}

btnTambah.addEventListener("click", bukaModalTambah);
closeModal.addEventListener("click", tutupModalCustomer);
modalCustomer.addEventListener("click", (e) => {
  if (e.target === modalCustomer) tutupModalCustomer();
});

formCustomer.addEventListener("submit", (e) => {
  e.preventDefault();

  const id = idCustomerInput.value ? Number(idCustomerInput.value) : null;

  if (id) {
    // EDIT
    const c = customers.find((item) => item.id === id);
    if (c) {
      c.nama = namaInput.value.trim();
      c.email = emailInput.value.trim();
      c.telepon = teleponInput.value.trim();
      c.segmen = segmenInput.value;
    }
    tampilkanToastAdmin("Data customer berhasil diperbarui");
  } else {
    // TAMBAH
    const idBaru =
      customers.length > 0 ? Math.max(...customers.map((c) => c.id)) + 1 : 1;

    customers.push({
      id: idBaru,
      nama: namaInput.value.trim(),
      email: emailInput.value.trim(),
      telepon: teleponInput.value.trim(),
      segmen: segmenInput.value,
      bergabung: new Date().toISOString().slice(0, 10),
      totalPesanan: 0,
      totalBelanja: 0,
      riwayat: [],
      alamat: [],
      keranjang: [],
      wishlist: [],
      komplain: [],
    });

    tampilkanToastAdmin("Customer baru berhasil ditambahkan");
  }

  simpanCustomer(customers);
  renderSemua();
  tutupModalCustomer();
});

function hapusCustomer(id) {
  const c = customers.find((item) => item.id === id);
  if (!c) return;

  const lanjutkan = () => {
    customers = customers.filter((item) => item.id !== id);
    simpanCustomer(customers);
    renderSemua();
    tampilkanToastAdmin(c.nama + " berhasil dihapus");
  };

  if (typeof Swal !== "undefined") {
    Swal.fire({
      title: "Hapus customer ini?",
      text: `${c.nama} akan dihapus secara permanen.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
      confirmButtonColor: "#ef4444",
    }).then((result) => {
      if (result.isConfirmed) lanjutkan();
    });
  } else if (confirm(`Hapus ${c.nama}?`)) {
    lanjutkan();
  }
}

// ================================
// MODAL DETAIL
// ================================

function bukaDetail(id) {
  const c = customers.find((item) => item.id === id);
  if (!c) return;

  detailNama.textContent = c.nama;
  modalDetail.dataset.id = c.id;

  renderTabProfil(c);
  renderTabBelanja(c);
  renderTabAlamat(c);
  renderTabKeranjang(c);
  renderTabWishlist(c);
  renderTabKomplain(c);

  // reset ke tab profil setiap dibuka
  detailTabs.querySelectorAll(".dtab").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.tab === "profil");
  });
  document.querySelectorAll(".dsection").forEach((sec) => {
    sec.classList.toggle("active", sec.id === "d-profil");
  });

  modalDetail.classList.add("active");
}

function tutupModalDetail() {
  modalDetail.classList.remove("active");
}

closeDetail.addEventListener("click", tutupModalDetail);
modalDetail.addEventListener("click", (e) => {
  if (e.target === modalDetail) tutupModalDetail();
});

detailTabs.addEventListener("click", (e) => {
  const btn = e.target.closest(".dtab");
  if (!btn) return;

  detailTabs
    .querySelectorAll(".dtab")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");

  document
    .querySelectorAll(".dsection")
    .forEach((sec) => sec.classList.remove("active"));
  document.getElementById("d-" + btn.dataset.tab).classList.add("active");
});

function renderTabProfil(c) {
  document.getElementById("d-profil").innerHTML = `
    <div class="detail-row"><span>Nama</span><span>${c.nama}</span></div>
    <div class="detail-row"><span>Email</span><span>${c.email}</span></div>
    <div class="detail-row"><span>Telepon</span><span>${c.telepon}</span></div>
    <div class="detail-row"><span>Segmen</span><span>${c.segmen}</span></div>
    <div class="detail-row"><span>Bergabung Sejak</span><span>${tanggalIndo(c.bergabung)}</span></div>
    <div class="detail-row"><span>Total Pesanan</span><span>${c.totalPesanan || 0}</span></div>
    <div class="detail-row"><span>Total Belanja</span><span>${rupiah(c.totalBelanja)}</span></div>
  `;
}

function renderTabBelanja(c) {
  const list = c.riwayat || [];
  const el = document.getElementById("d-belanja");

  if (list.length === 0) {
    el.innerHTML = `<div class="empty-state">Belum ada riwayat belanja.</div>`;
    return;
  }

  el.innerHTML = list
    .map(
      (r) => `
      <div class="list-item">
        <div class="list-item-top">
          <span class="title">${r.produk}</span>
          <span class="status ${r.status}">${
            r.status === "terbuka"
              ? "Terbuka"
              : r.status === "diproses"
                ? "Diproses"
                : "Selesai"
          }</span>
        </div>
        <div class="meta">${tanggalIndo(r.tanggal)} &middot; <span class="harga">${rupiah(r.total)}</span></div>
      </div>`,
    )
    .join("");
}

function renderTabAlamat(c) {
  const list = c.alamat || [];
  const el = document.getElementById("d-alamat");

  el.innerHTML = `
    <button class="mini-btn" onclick="tambahAlamat(${c.id})">
      <i class="fa-solid fa-plus"></i> Tambah Alamat
    </button>
    ${
      list.length === 0
        ? `<div class="empty-state">Belum ada alamat tersimpan.</div>`
        : list
            .map(
              (a) => `
        <div class="list-item">
          <div class="list-item-top"><span class="title">${a.label}</span></div>
          <div class="meta">${a.detail}</div>
        </div>`,
            )
            .join("")
    }
  `;
}

function renderTabKeranjang(c) {
  const list = c.keranjang || [];
  const el = document.getElementById("d-keranjang");

  if (list.length === 0) {
    el.innerHTML = `<div class="empty-state">Keranjang kosong.</div>`;
    return;
  }

  el.innerHTML = list
    .map(
      (k) => `
      <div class="list-item">
        <div class="list-item-top">
          <span class="title">${k.nama}</span>
          <span class="harga">${rupiah(k.harga)}</span>
        </div>
        <div class="meta">Qty: ${k.qty}</div>
      </div>`,
    )
    .join("");
}

function renderTabWishlist(c) {
  const list = c.wishlist || [];
  const el = document.getElementById("d-wishlist");

  if (list.length === 0) {
    el.innerHTML = `<div class="empty-state">Wishlist kosong.</div>`;
    return;
  }

  el.innerHTML = list
    .map(
      (w) => `
      <div class="list-item">
        <div class="list-item-top">
          <span class="title">${w.nama}</span>
          <span class="harga">${rupiah(w.harga)}</span>
        </div>
      </div>`,
    )
    .join("");
}

function renderTabKomplain(c) {
  const list = c.komplain || [];
  const el = document.getElementById("d-komplain");

  if (list.length === 0) {
    el.innerHTML = `<div class="empty-state">Tidak ada komplain.</div>`;
    return;
  }

  el.innerHTML = list
    .map(
      (k, idx) => `
      <div class="list-item">
        <div class="list-item-top">
          <span class="title">${k.judul}</span>
          <select class="status-select" onchange="ubahStatusKomplain(${c.id}, ${idx}, this.value)">
            <option value="terbuka" ${k.status === "terbuka" ? "selected" : ""}>Terbuka</option>
            <option value="diproses" ${k.status === "diproses" ? "selected" : ""}>Diproses</option>
            <option value="selesai" ${k.status === "selesai" ? "selected" : ""}>Selesai</option>
          </select>
        </div>
        <div class="meta">${tanggalIndo(k.tanggal)}</div>
      </div>`,
    )
    .join("");
}

function ubahStatusKomplain(customerId, index, statusBaru) {
  const c = customers.find((item) => item.id === customerId);
  if (!c || !c.komplain[index]) return;

  c.komplain[index].status = statusBaru;
  simpanCustomer(customers);
  renderStats();
  renderTable();
  tampilkanToastAdmin("Status komplain diperbarui");
}

// ================================
// TAMBAH ALAMAT (Swal mini form)
// ================================

function tambahAlamat(customerId) {
  if (typeof Swal === "undefined") {
    const label = prompt("Label alamat (mis. Rumah/Kantor):");
    if (!label) return;
    const detail = prompt("Alamat lengkap:");
    if (!detail) return;
    simpanAlamatBaru(customerId, label, detail);
    return;
  }

  Swal.fire({
    title: "Tambah Alamat",
    html: `
      <div class="swal-mini-form">
        <label>Label Alamat</label>
        <input type="text" id="swalLabel" placeholder="Rumah / Kantor" />
        <label>Alamat Lengkap</label>
        <input type="text" id="swalDetail" placeholder="Jl. ..." />
      </div>
    `,
    showCancelButton: true,
    confirmButtonText: "Simpan",
    cancelButtonText: "Batal",
    confirmButtonColor: "#2563eb",
    preConfirm: () => {
      const label = document.getElementById("swalLabel").value.trim();
      const detail = document.getElementById("swalDetail").value.trim();
      if (!label || !detail) {
        Swal.showValidationMessage("Label dan alamat wajib diisi");
        return false;
      }
      return { label, detail };
    },
  }).then((result) => {
    if (result.isConfirmed) {
      simpanAlamatBaru(customerId, result.value.label, result.value.detail);
    }
  });
}

function simpanAlamatBaru(customerId, label, detail) {
  const c = customers.find((item) => item.id === customerId);
  if (!c) return;

  if (!Array.isArray(c.alamat)) c.alamat = [];
  c.alamat.push({ label, detail });

  simpanCustomer(customers);
  renderTabAlamat(c);
  tampilkanToastAdmin("Alamat berhasil ditambahkan");
}

// ================================
// TOAST SEDERHANA
// ================================

function tampilkanToastAdmin(pesan) {
  if (typeof Swal !== "undefined") {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2200,
      timerProgressBar: true,
    });
    Toast.fire({ icon: "success", title: pesan });
    return;
  }
  alert(pesan);
}

// ================================
// SINKRON ANTAR TAB
// ================================

window.addEventListener("storage", (e) => {
  if (e.key === STORAGE_KEY) {
    customers = muatCustomer();
    renderSemua();
  }
});

// ================================
// INIT
// ================================

renderSemua();
