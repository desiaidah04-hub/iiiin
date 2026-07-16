// ======================================
// LAPORAN ADMIN
// DMEN'STYLE STORE
// ======================================
//
// Data produk (nama, kategori, harga, gambar) diambil dari data ASLI
// yang sama dipakai halaman Produk/Dashboard (localStorage key
// "mensStyleProdukData", fallback ke PRODUK_DATA dari produk-data.js).
//
// Data PENJUALAN, PESANAN, dan TREN PENDAPATAN di bawah ini masih DUMMY
// (contoh) karena belum ada data pesanan asli yang tersambung. Begitu
// halaman Pesanan/Customer sudah punya struktur data + localStorage-nya,
// bagian ini tinggal diganti supaya laporan benar-benar akurat.

const STORAGE_KEY = "mensStyleProdukData";

function getProdukData() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
    if (typeof PRODUK_DATA !== "undefined") return PRODUK_DATA;
    return [];
  } catch (error) {
    console.error("Gagal mengambil data produk:", error);
    return [];
  }
}

// ======================================
// DATA DUMMY PENJUALAN
// (ganti bagian ini kalau data pesanan asli sudah ada)
// ======================================

function buatDataDummyPenjualan(produk) {
  // Kasih tiap produk angka "terjual" acak yang konsisten (seeded)
  // supaya tidak berubah-ubah tiap refresh, biar terlihat wajar.
  return produk.map((item, index) => {
    const seed = (item.id * 37 + index * 13) % 50;
    const terjual = 5 + seed;
    return {
      ...item,
      terjual,
      pendapatan: terjual * (item.harga || 0),
    };
  });
}

function buatTrenPendapatanDummy(hari = 30) {
  const labels = [];
  const data = [];
  const hariIni = new Date();

  for (let i = hari - 1; i >= 0; i--) {
    const tgl = new Date(hariIni);
    tgl.setDate(tgl.getDate() - i);

    labels.push(
      tgl.toLocaleDateString("id-ID", { day: "2-digit", month: "short" }),
    );

    // Pola dummy: fluktuasi antara 800rb - 3.5jt per hari
    const base = 800000 + Math.sin(i / 3) * 700000 + Math.random() * 600000;
    data.push(Math.max(0, Math.round(base)));
  }

  return { labels, data };
}

// ======================================
// ISI STATISTIK
// ======================================

function isiStatistik(dataPenjualan) {
  const totalPendapatan = dataPenjualan.reduce(
    (sum, item) => sum + item.pendapatan,
    0,
  );
  const totalTerjual = dataPenjualan.reduce(
    (sum, item) => sum + item.terjual,
    0,
  );

  // Dummy: anggap tiap pesanan rata-rata berisi 2 item produk
  const estimasiPesanan = Math.max(1, Math.round(totalTerjual / 2));
  const rataRata = totalPendapatan / estimasiPesanan;

  document.getElementById("statPendapatan").innerText =
    "Rp " + Math.round(totalPendapatan).toLocaleString("id-ID");
  document.getElementById("statPesanan").innerText =
    estimasiPesanan.toLocaleString("id-ID");
  document.getElementById("statRataRata").innerText =
    "Rp " + Math.round(rataRata).toLocaleString("id-ID");
  document.getElementById("statProdukTerjual").innerText =
    totalTerjual.toLocaleString("id-ID");
}

// ======================================
// TABEL PRODUK TERLARIS
// ======================================

function renderTabelTerlaris(dataPenjualan) {
  const tbody = document.getElementById("tableTerlaris");
  const top = [...dataPenjualan]
    .sort((a, b) => b.terjual - a.terjual)
    .slice(0, 10);

  if (!top.length) {
    tbody.innerHTML = `
      <tr><td colspan="6" style="text-align:center;color:#888;">Belum ada data produk.</td></tr>
    `;
    return;
  }

  tbody.innerHTML = "";

  top.forEach((item, index) => {
    const gambarSrc = item.gambar ? `../${item.gambar}` : "";

    tbody.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>
          ${
            gambarSrc
              ? `<img src="${gambarSrc}" alt="${item.nama}" onerror="this.style.opacity=0.3">`
              : "-"
          }
        </td>
        <td>${item.nama}</td>
        <td>${item.kategori}</td>
        <td>${item.terjual}</td>
        <td>Rp ${Math.round(item.pendapatan).toLocaleString("id-ID")}</td>
      </tr>
    `;
  });
}

// ======================================
// GRAFIK: TREN PENDAPATAN
// ======================================

let chartPendapatanInstance = null;

function renderChartPendapatan(hari) {
  const { labels, data } = buatTrenPendapatanDummy(hari);
  const ctx = document.getElementById("chartPendapatan");

  if (chartPendapatanInstance) {
    chartPendapatanInstance.destroy();
  }

  chartPendapatanInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Pendapatan",
          data,
          borderColor: "#2563eb",
          backgroundColor: "rgba(37, 99, 235, 0.1)",
          fill: true,
          tension: 0.35,
          pointRadius: 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) =>
              "Rp " + Math.round(ctx.parsed.y).toLocaleString("id-ID"),
          },
        },
      },
      scales: {
        y: {
          ticks: {
            callback: (value) =>
              "Rp " + Number(value / 1000).toLocaleString("id-ID") + "rb",
          },
        },
      },
    },
  });
}

// ======================================
// GRAFIK: PENJUALAN PER KATEGORI
// ======================================

let chartKategoriInstance = null;

function renderChartKategori(dataPenjualan) {
  const perKategori = {};

  dataPenjualan.forEach((item) => {
    const kategori = item.kategori || "Lainnya";
    perKategori[kategori] = (perKategori[kategori] || 0) + item.terjual;
  });

  const labels = Object.keys(perKategori);
  const data = Object.values(perKategori);

  const warna = [
    "#2563eb",
    "#f59e0b",
    "#10b981",
    "#ef4444",
    "#8b5cf6",
    "#0ea5e9",
    "#ec4899",
  ];

  const ctx = document.getElementById("chartKategori");

  if (chartKategoriInstance) {
    chartKategoriInstance.destroy();
  }

  chartKategoriInstance = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels,
      datasets: [
        {
          data,
          backgroundColor: labels.map((_, i) => warna[i % warna.length]),
          borderWidth: 2,
          borderColor: "#fff",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: { boxWidth: 12, font: { size: 12 } },
        },
      },
    },
  });
}

// ======================================
// MUAT ULANG SEMUA (dipanggil saat filter periode diterapkan)
// ======================================

function muatLaporan() {
  const produk = getProdukData();
  const dataPenjualan = buatDataDummyPenjualan(produk);
  const hari = Number(document.getElementById("filterPeriode").value) || 30;

  isiStatistik(dataPenjualan);
  renderTabelTerlaris(dataPenjualan);
  renderChartPendapatan(hari);
  renderChartKategori(dataPenjualan);
}

// ======================================
// EVENT LISTENERS
// ======================================

document.getElementById("btnTerapkan").addEventListener("click", muatLaporan);

document.getElementById("btnExport").addEventListener("click", () => {
  window.print();
});

// ======================================
// INISIALISASI
// ======================================

muatLaporan();
