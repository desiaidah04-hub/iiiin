// ======================================
// KELOLA PROMO (TAMBAH / EDIT / HAPUS)
// DMEN'STYLE STORE
// ======================================
//
// Data disimpan di localStorage browser (tidak ada backend/database).
// Status promo (Aktif / Akan Datang / Berakhir) dihitung otomatis
// berdasarkan tanggal mulai & berakhir dibandingkan tanggal hari ini.

const STORAGE_KEY = "mensStylePromoData";

// Data contoh awal (dipakai kalau localStorage masih kosong)
const PROMO_DEFAULT = [
  {
    id: 1,
    nama: "Diskon Awal Bulan",
    kode: "AWALBULAN10",
    jenisDiskon: "persen",
    nilaiDiskon: 10,
    tanggalMulai: "2026-07-01",
    tanggalBerakhir: "2026-07-31",
    minBelanja: 100000,
    kategoriBerlaku: "Semua",
  },
  {
    id: 2,
    nama: "Gajian Sale",
    kode: "GAJIAN25",
    jenisDiskon: "persen",
    nilaiDiskon: 25,
    tanggalMulai: "2026-07-25",
    tanggalBerakhir: "2026-08-05",
    minBelanja: 150000,
    kategoriBerlaku: "Semua",
  },
  {
    id: 3,
    nama: "Diskon Sepatu",
    kode: "SEPATU50K",
    jenisDiskon: "nominal",
    nilaiDiskon: 50000,
    tanggalMulai: "2026-06-01",
    tanggalBerakhir: "2026-06-30",
    minBelanja: 0,
    kategoriBerlaku: "Sepatu",
  },
];

// Elemen tabel & toolbar
const tablePromo = document.getElementById("tablePromo");
const searchInput = document.getElementById("search");
const filterStatus = document.getElementById("filterStatus");

// Elemen statistik
const statTotal = document.getElementById("statTotal");
const statAktif = document.getElementById("statAktif");
const statSegera = document.getElementById("statSegera");
const statBerakhir = document.getElementById("statBerakhir");

// Elemen modal & form
const modalPromo = document.getElementById("modalPromo");
const judulModal = document.getElementById("judulModal");
const closeModal = document.getElementById("closeModal");
const formPromo = document.getElementById("formPromo");
const btnTambah = document.getElementById("btnTambah");

const idPromo = document.getElementById("idPromo");
const inputNama = document.getElementById("nama");
const inputKode = document.getElementById("kode");
const inputJenisDiskon = document.getElementById("jenisDiskon");
const inputNilaiDiskon = document.getElementById("nilaiDiskon");
const inputTanggalMulai = document.getElementById("tanggalMulai");
const inputTanggalBerakhir = document.getElementById("tanggalBerakhir");
const inputMinBelanja = document.getElementById("minBelanja");
const inputKategoriBerlaku = document.getElementById("kategoriBerlaku");

// ======================================
// AMBIL / SIMPAN DATA
// ======================================

function getPromoData() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {
      return JSON.parse(stored);
    }

    savePromoData(PROMO_DEFAULT);
    return PROMO_DEFAULT;
  } catch (error) {
    console.error("Gagal mengambil data promo:", error);
    return [];
  }
}

function savePromoData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// ======================================
// HITUNG STATUS PROMO BERDASARKAN TANGGAL
// ======================================

function hitungStatus(promo) {
  const hariIni = new Date();
  hariIni.setHours(0, 0, 0, 0);

  const mulai = new Date(promo.tanggalMulai);
  const berakhir = new Date(promo.tanggalBerakhir);

  if (hariIni < mulai) return "Akan Datang";
  if (hariIni > berakhir) return "Berakhir";
  return "Aktif";
}

function statusClass(status) {
  if (status === "Aktif") return "aktif";
  if (status === "Akan Datang") return "akan-datang";
  return "berakhir";
}

function formatTanggal(str) {
  const d = new Date(str);
  return d.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// ======================================
// ISI STATISTIK
// ======================================

function isiStatistik(data) {
  const withStatus = data.map((p) => hitungStatus(p));

  statTotal.innerText = data.length;
  statAktif.innerText = withStatus.filter((s) => s === "Aktif").length;
  statSegera.innerText = withStatus.filter((s) => s === "Akan Datang").length;
  statBerakhir.innerText = withStatus.filter((s) => s === "Berakhir").length;
}

// ======================================
// RENDER TABEL (dengan filter search & status)
// ======================================

function renderTabel() {
  const data = getPromoData();

  isiStatistik(data);

  const keyword = searchInput.value.toLowerCase().trim();
  const statusTerpilih = filterStatus.value;

  let hasil = data.filter((item) => {
    const status = hitungStatus(item);
    const cocokKeyword =
      item.nama.toLowerCase().includes(keyword) ||
      item.kode.toLowerCase().includes(keyword);
    const cocokStatus = statusTerpilih === "Semua" || status === statusTerpilih;

    return cocokKeyword && cocokStatus;
  });

  if (!hasil.length) {
    tablePromo.innerHTML = `
      <tr>
        <td colspan="7" class="empty-state">Tidak ada promo yang cocok.</td>
      </tr>
    `;
    return;
  }

  tablePromo.innerHTML = "";

  hasil.forEach((item, index) => {
    const status = hitungStatus(item);

    const diskonText =
      item.jenisDiskon === "persen"
        ? `${item.nilaiDiskon}%`
        : `Rp ${Number(item.nilaiDiskon).toLocaleString("id-ID")}`;

    tablePromo.innerHTML += `
      <tr data-id="${item.id}">
        <td>${index + 1}</td>
        <td class="promo-nama">${item.nama}</td>
        <td><span class="promo-kode">${item.kode}</span></td>
        <td class="promo-diskon">${diskonText}</td>
        <td class="promo-periode">${formatTanggal(
          item.tanggalMulai,
        )} &ndash; ${formatTanggal(item.tanggalBerakhir)}</td>
        <td><span class="status ${statusClass(status)}">${status}</span></td>
        <td>
          <div class="action-btn">
            <button class="edit-btn" onclick="bukaModalEdit(${item.id})">
              <i class="fa-solid fa-pen"></i>
            </button>
            <button class="delete-btn" onclick="hapusPromo(${item.id})">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  });
}

// ======================================
// MODAL: BUKA / TUTUP
// ======================================

function bukaModalTambah() {
  judulModal.innerText = "Tambah Promo";
  formPromo.reset();
  idPromo.value = "";
  modalPromo.classList.add("active");
}

function bukaModalEdit(id) {
  const data = getPromoData();
  const item = data.find((p) => p.id === id);

  if (!item) return;

  judulModal.innerText = "Edit Promo";

  idPromo.value = item.id;
  inputNama.value = item.nama || "";
  inputKode.value = item.kode || "";
  inputJenisDiskon.value = item.jenisDiskon || "persen";
  inputNilaiDiskon.value = item.nilaiDiskon || 0;
  inputTanggalMulai.value = item.tanggalMulai || "";
  inputTanggalBerakhir.value = item.tanggalBerakhir || "";
  inputMinBelanja.value = item.minBelanja || 0;
  inputKategoriBerlaku.value = item.kategoriBerlaku || "Semua";

  modalPromo.classList.add("active");
}

function tutupModal() {
  modalPromo.classList.remove("active");
  formPromo.reset();
}

// ======================================
// TAMBAH / EDIT (SUBMIT FORM)
// ======================================

function handleSubmitForm(e) {
  e.preventDefault();

  const data = getPromoData();
  const id = idPromo.value;

  if (
    new Date(inputTanggalBerakhir.value) < new Date(inputTanggalMulai.value)
  ) {
    if (typeof Swal !== "undefined") {
      Swal.fire({
        icon: "error",
        title: "Tanggal tidak valid",
        text: "Tanggal berakhir tidak boleh sebelum tanggal mulai.",
      });
    } else {
      alert("Tanggal berakhir tidak boleh sebelum tanggal mulai.");
    }
    return;
  }

  const promoBaru = {
    nama: inputNama.value.trim(),
    kode: inputKode.value.trim().toUpperCase(),
    jenisDiskon: inputJenisDiskon.value,
    nilaiDiskon: Number(inputNilaiDiskon.value) || 0,
    tanggalMulai: inputTanggalMulai.value,
    tanggalBerakhir: inputTanggalBerakhir.value,
    minBelanja: Number(inputMinBelanja.value) || 0,
    kategoriBerlaku: inputKategoriBerlaku.value,
  };

  if (id) {
    const index = data.findIndex((p) => p.id === Number(id));
    if (index !== -1) {
      data[index] = { ...data[index], ...promoBaru, id: Number(id) };
    }

    savePromoData(data);
    tutupModal();
    renderTabel();

    if (typeof Swal !== "undefined") {
      Swal.fire({
        icon: "success",
        title: "Promo berhasil diperbarui",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  } else {
    const idBaru = data.length > 0 ? Math.max(...data.map((p) => p.id)) + 1 : 1;
    data.push({ id: idBaru, ...promoBaru });

    savePromoData(data);
    tutupModal();
    renderTabel();

    if (typeof Swal !== "undefined") {
      Swal.fire({
        icon: "success",
        title: "Promo berhasil ditambahkan",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  }
}

// ======================================
// HAPUS PROMO
// ======================================

function hapusPromo(id) {
  const jalankanHapus = () => {
    const data = getPromoData();
    const dataBaru = data.filter((p) => p.id !== id);

    savePromoData(dataBaru);
    renderTabel();
  };

  if (typeof Swal !== "undefined") {
    Swal.fire({
      title: "Yakin ingin menghapus promo ini?",
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
          title: "Promo berhasil dihapus",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  } else {
    if (confirm("Yakin ingin menghapus promo ini?")) {
      jalankanHapus();
    }
  }
}

// ======================================
// EVENT LISTENERS
// ======================================

btnTambah.addEventListener("click", bukaModalTambah);
closeModal.addEventListener("click", tutupModal);
formPromo.addEventListener("submit", handleSubmitForm);
searchInput.addEventListener("input", renderTabel);
filterStatus.addEventListener("change", renderTabel);

modalPromo.addEventListener("click", (e) => {
  if (e.target === modalPromo) {
    tutupModal();
  }
});

// ======================================
// INISIALISASI
// ======================================

renderTabel();
