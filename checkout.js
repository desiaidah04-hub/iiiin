// =======================================================
// DMEN'STYLE STORE
// checkout.js
// Form Pengiriman + Metode Pembayaran + Simulasi Bayar
// =======================================================

const checkoutEmpty = document.getElementById("checkoutEmpty");
const checkoutForm = document.getElementById("checkoutForm");

const orderItemsEl = document.getElementById("orderItems");
const subtotalEl = document.getElementById("subtotal");
const ongkirEl = document.getElementById("ongkir");
const grandTotalEl = document.getElementById("grandTotal");
const payBtn = document.getElementById("payBtn");

const paymentOverlay = document.getElementById("paymentOverlay");
const successModal = document.getElementById("successModal");
const orderIdEl = document.getElementById("orderId");
const orderTotalEl = document.getElementById("orderTotal");
const orderMetodeEl = document.getElementById("orderMetode");

const ONGKIR = 20000;

// aturan diskon otomatis:
// - berlaku untuk subtotal di atas MIN_BELANJA_DISKON
// - besar diskon = PERSEN_DISKON dari subtotal, minimal MIN_POTONGAN_DISKON
// - subtotal di atas MIN_BELANJA_DISKON juga otomatis gratis ongkir
const MIN_BELANJA_DISKON = 300000;
const PERSEN_DISKON = 0.25;
const MIN_POTONGAN_DISKON = 20000;

const diskonRowEl = document.getElementById("diskonRow");
const diskonEl = document.getElementById("diskon");

// ================================
// AMBIL DATA PESANAN
// Prioritas: "Beli Sekarang" (checkoutProduk) > isi keranjang (cart)
// ================================

const buyNowProduk = JSON.parse(localStorage.getItem("checkoutProduk"));
const cart = JSON.parse(localStorage.getItem("cart")) || [];

const orderItems = buyNowProduk ? [buyNowProduk] : cart;

let grandTotalValue = 0;

tampilRingkasan();

// ================================
// FORMAT RUPIAH
// ================================

function rupiah(angka) {
  return "Rp" + angka.toLocaleString("id-ID");
}

// ================================
// RENDER RINGKASAN PESANAN
// ================================

function tampilRingkasan() {
  if (orderItems.length === 0) {
    checkoutEmpty.classList.add("show");
    checkoutForm.style.display = "none";
    return;
  }

  checkoutEmpty.classList.remove("show");
  checkoutForm.style.display = "grid";

  orderItemsEl.innerHTML = "";

  let subtotal = 0;

  orderItems.forEach((item) => {
    const qty = item.qty || 1;
    subtotal += item.harga * qty;

    const varianText = [
      item.ukuran ? "Ukuran: " + item.ukuran : "",
      item.warna ? "Warna: " + item.warna : "",
    ]
      .filter(Boolean)
      .join(" | ");

    orderItemsEl.innerHTML += `
        <div class="order-item">
            <img src="${item.gambar}">
            <div class="oi-info">
                <h4>${item.nama} ${qty > 1 ? "x" + qty : ""}</h4>
                <p>${varianText}</p>
            </div>
            <div class="oi-price">${rupiah(item.harga * qty)}</div>
        </div>
        `;
  });

  const dapatDiskon = subtotal > MIN_BELANJA_DISKON;

  const diskon = dapatDiskon
    ? Math.max(subtotal * PERSEN_DISKON, MIN_POTONGAN_DISKON)
    : 0;

  const ongkir = dapatDiskon ? 0 : ONGKIR;
  const grandTotal = subtotal - diskon + ongkir;

  grandTotalValue = grandTotal;

  subtotalEl.textContent = rupiah(subtotal);

  if (dapatDiskon) {
    diskonRowEl.style.display = "flex";
    diskonEl.textContent = "-" + rupiah(diskon);
  } else {
    diskonRowEl.style.display = "none";
  }

  ongkirEl.textContent = dapatDiskon ? "Gratis" : rupiah(ongkir);
  grandTotalEl.textContent = rupiah(grandTotal);

  // catat event GA4: begin_checkout
  if (typeof trackBeginCheckout === "function") {
    trackBeginCheckout(
      grandTotal,
      orderItems.map((it) => ({
        item_id: it.id,
        item_name: it.nama,
        quantity: it.qty || 1,
        price: it.harga,
      })),
    );
  }
}

const paymentStepModal = document.getElementById("paymentStepModal");
const paymentStepContent = document.getElementById("paymentStepContent");
const stepClose = document.getElementById("stepClose");

const orderDetailEl = document.getElementById("orderDetail");

// detail metode pembayaran terpilih, dipakai untuk ditampilkan di modal sukses
let paymentDetail = "";

// ================================
// SUBMIT FORM -> CABANG SESUAI METODE
// ================================

if (checkoutForm) {
  checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (orderItems.length === 0) return;

    const metode = checkoutForm.querySelector(
      'input[name="pembayaran"]:checked',
    ).value;

    // catat event GA4: add_payment_info
    if (typeof trackAddPaymentInfo === "function") {
      trackAddPaymentInfo(metode, grandTotalValue);
    }

    bukaLangkahPembayaran(metode);
  });
}

if (stepClose) {
  stepClose.addEventListener("click", () => {
    paymentStepModal.classList.remove("show");
  });
}

// ================================
// ARAHKAN KE LANGKAH SESUAI METODE
// ================================

function bukaLangkahPembayaran(metode) {
  paymentDetail = "";

  if (metode === "COD") {
    // COD tidak butuh langkah tambahan, langsung diproses
    prosesPembayaran(metode);
    return;
  }

  if (metode === "QRIS") {
    tampilLangkahQris();
  } else if (metode === "Transfer Bank") {
    tampilLangkahTransferBank();
  } else if (metode === "Kartu Kredit/Debit") {
    tampilLangkahKartu();
  } else if (metode === "E-Wallet") {
    tampilLangkahEwallet();
  }

  paymentStepModal.classList.add("show");
}

// ================================
// LANGKAH: QRIS
// ================================

function tampilLangkahQris() {
  const kodeQr = "MS-" + Date.now();
  const qrUrl =
    "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" +
    encodeURIComponent(kodeQr);

  paymentStepContent.innerHTML = `
        <h3>Scan QRIS untuk Membayar</h3>
        <p class="step-desc">Gunakan aplikasi e-wallet atau m-banking untuk scan kode di bawah ini.</p>

        <div class="qr-box">
            <img src="${qrUrl}" alt="QRIS Code">
            <p class="qr-timer"><i class="fa-regular fa-clock"></i> Berlaku 10:00 menit</p>
        </div>

        <button type="button" class="btn-confirm-step" onclick="konfirmasiQris()">
            Saya Sudah Bayar
        </button>
        `;
}

function konfirmasiQris() {
  paymentDetail = "Dibayar via QRIS";
  paymentStepModal.classList.remove("show");
  prosesPembayaran("QRIS");
}

// ================================
// LANGKAH: TRANSFER BANK (VIRTUAL ACCOUNT)
// ================================

function tampilLangkahTransferBank() {
  paymentStepContent.innerHTML = `
        <h3>Transfer Bank</h3>
        <p class="step-desc">Pilih bank tujuan, lalu transfer ke nomor Virtual Account berikut.</p>

        <div class="bank-select">
            <label>Pilih Bank</label>
            <select id="pilihBank" onchange="generateVA()">
                <option value="">-- Pilih Bank --</option>
                <option value="BCA">BCA Virtual Account</option>
                <option value="BRI">BRI Virtual Account</option>
                <option value="Mandiri">Mandiri Virtual Account</option>
            </select>
        </div>

        <div id="vaBoxWrapper"></div>

        <button type="button" class="btn-confirm-step" id="btnKonfirmasiVa" disabled onclick="konfirmasiTransferBank()">
            Saya Sudah Transfer
        </button>
        `;
}

function generateVA() {
  const bank = document.getElementById("pilihBank").value;
  const vaBoxWrapper = document.getElementById("vaBoxWrapper");
  const btnKonfirmasiVa = document.getElementById("btnKonfirmasiVa");

  if (!bank) {
    vaBoxWrapper.innerHTML = "";
    btnKonfirmasiVa.disabled = true;
    return;
  }

  const kodeBank = { BCA: "3901", BRI: "8808", Mandiri: "8900" }[bank];
  const nomorVa =
    kodeBank + Math.floor(1000000000 + Math.random() * 8999999999);

  vaBoxWrapper.dataset.bank = bank;
  vaBoxWrapper.dataset.va = nomorVa;

  vaBoxWrapper.innerHTML = `
        <div class="va-box">
            <p class="va-bank">${bank} Virtual Account</p>
            <p class="va-number">${nomorVa}</p>
            <button type="button" class="btn-copy" onclick="salinVa('${nomorVa}')">
                <i class="fa-regular fa-copy"></i> Salin Nomor
            </button>
        </div>
        `;

  btnKonfirmasiVa.disabled = false;
}

function salinVa(nomor) {
  navigator.clipboard.writeText(nomor);
  showToast("Nomor VA disalin");
}

function konfirmasiTransferBank() {
  const vaBoxWrapper = document.getElementById("vaBoxWrapper");
  const bank = vaBoxWrapper.dataset.bank;
  const nomorVa = vaBoxWrapper.dataset.va;

  paymentDetail = `Transfer ke ${bank} VA ${nomorVa}`;

  paymentStepModal.classList.remove("show");
  prosesPembayaran("Transfer Bank");
}

// ================================
// LANGKAH: KARTU DEBIT / KREDIT
// ================================

function tampilLangkahKartu() {
  paymentStepContent.innerHTML = `
        <h3>Kartu Debit / Kredit</h3>
        <p class="step-desc">Masukkan detail kartu Anda. Total tagihan ${rupiah(grandTotalValue)}.</p>

        <div class="card-form">
            <div class="form-group">
                <label>Nomor Kartu</label>
                <div class="card-number-wrap">
                    <input
                        type="text"
                        id="inputNomorKartu"
                        inputmode="numeric"
                        placeholder="1234 5678 9012 3456"
                        maxlength="19"
                        oninput="formatNomorKartu(this)"
                    />
                    <i class="fa-brands fa-cc-visa card-brand-icon" id="cardBrandIcon"></i>
                </div>
            </div>

            <div class="form-group">
                <label>Nama Pemegang Kartu</label>
                <input type="text" id="inputNamaKartu" placeholder="Sesuai yang tertera di kartu" />
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label>Masa Berlaku</label>
                    <input
                        type="text"
                        id="inputExpKartu"
                        inputmode="numeric"
                        placeholder="MM/YY"
                        maxlength="5"
                        oninput="formatExpKartu(this)"
                    />
                </div>

                <div class="form-group">
                    <label>CVV</label>
                    <input
                        type="password"
                        id="inputCvvKartu"
                        inputmode="numeric"
                        placeholder="123"
                        maxlength="4"
                    />
                </div>
            </div>

            <p class="form-error" id="kartuError">Periksa kembali nomor kartu, masa berlaku, dan CVV Anda.</p>
        </div>

        <button type="button" class="btn-confirm-step" onclick="konfirmasiKartu()">
            <i class="fa-solid fa-lock"></i> Bayar ${rupiah(grandTotalValue)}
        </button>
        `;
}

// tambahkan spasi tiap 4 digit sambil mengetik, sekaligus deteksi brand kartu
function formatNomorKartu(input) {
  const digits = input.value.replace(/\D/g, "").slice(0, 16);
  input.value = digits.replace(/(.{4})/g, "$1 ").trim();

  const brandIcon = document.getElementById("cardBrandIcon");
  const brand = deteksiBrandKartu(digits);

  if (brand === "Visa") {
    brandIcon.className = "fa-brands fa-cc-visa card-brand-icon show visa";
  } else if (brand === "Mastercard") {
    brandIcon.className =
      "fa-brands fa-cc-mastercard card-brand-icon show mastercard";
  } else {
    brandIcon.className = "fa-brands fa-cc-visa card-brand-icon";
  }
}

// sisipkan "/" otomatis setelah 2 digit bulan
function formatExpKartu(input) {
  const digits = input.value.replace(/\D/g, "").slice(0, 4);
  input.value =
    digits.length >= 3 ? digits.slice(0, 2) + "/" + digits.slice(2) : digits;
}

function deteksiBrandKartu(digits) {
  if (/^4/.test(digits)) return "Visa";
  if (/^(5[1-5]|2[2-7])/.test(digits)) return "Mastercard";
  return "";
}

function konfirmasiKartu() {
  const nomorKartu = document
    .getElementById("inputNomorKartu")
    .value.replace(/\s/g, "");
  const namaKartu = document.getElementById("inputNamaKartu").value.trim();
  const expKartu = document.getElementById("inputExpKartu").value.trim();
  const cvvKartu = document.getElementById("inputCvvKartu").value.trim();
  const errorEl = document.getElementById("kartuError");

  // validasi simpel (bukan validasi kartu asli): cukup pastikan tiap
  // kolom sudah terisi dengan format yang wajar, tanpa cek Luhn/expired
  const kartuValid =
    nomorKartu.length >= 12 &&
    namaKartu.length > 1 &&
    /^\d{2}\/\d{2}$/.test(expKartu) &&
    /^\d{3,4}$/.test(cvvKartu);

  if (!kartuValid) {
    errorEl.classList.add("show");
    return;
  }

  errorEl.classList.remove("show");

  const brand = deteksiBrandKartu(nomorKartu) || "Kartu";
  const empatDigitAkhir = nomorKartu.slice(-4).padStart(4, "0");

  paymentDetail = `${brand} **** ${empatDigitAkhir} a.n. ${namaKartu}`;

  paymentStepModal.classList.remove("show");
  prosesPembayaran("Kartu Kredit/Debit");
}

// ================================
// LANGKAH: E-WALLET (GOPAY / OVO / DANA / SHOPEEPAY)
// ================================

function tampilLangkahEwallet() {
  paymentStepContent.innerHTML = `
        <h3>Pilih E-Wallet</h3>
        <p class="step-desc">Pilih aplikasi e-wallet yang ingin digunakan untuk membayar ${rupiah(grandTotalValue)}.</p>

        <div class="ewallet-grid">
            <button type="button" class="ewallet-option" data-wallet="GoPay" onclick="pilihEwallet('GoPay')">
                <i class="fa-solid fa-wallet"></i>
                <span>GoPay</span>
            </button>

            <button type="button" class="ewallet-option" data-wallet="OVO" onclick="pilihEwallet('OVO')">
                <i class="fa-solid fa-wallet"></i>
                <span>OVO</span>
            </button>

            <button type="button" class="ewallet-option" data-wallet="DANA" onclick="pilihEwallet('DANA')">
                <i class="fa-solid fa-wallet"></i>
                <span>DANA</span>
            </button>

            <button type="button" class="ewallet-option" data-wallet="ShopeePay" onclick="pilihEwallet('ShopeePay')">
                <i class="fa-solid fa-wallet"></i>
                <span>ShopeePay</span>
            </button>
        </div>

        <div id="ewalletConfirmWrapper"></div>
        `;
}

function pilihEwallet(wallet) {
  document
    .querySelectorAll(".ewallet-option")
    .forEach((btn) => btn.classList.remove("selected"));

  document
    .querySelector(`.ewallet-option[data-wallet="${wallet}"]`)
    .classList.add("selected");

  const wrapper = document.getElementById("ewalletConfirmWrapper");
  wrapper.dataset.wallet = wallet;

  wrapper.innerHTML = `
        <div class="ewallet-confirm-box">
            <i class="fa-solid fa-circle-check"></i>
            <p>Notifikasi pembayaran telah dikirim ke aplikasi <strong>${wallet}</strong> Anda.</p>
            <p class="step-desc">Buka aplikasi ${wallet}, lalu konfirmasi pembayaran sebesar ${rupiah(grandTotalValue)}.</p>
        </div>

        <button type="button" class="btn-confirm-step" onclick="konfirmasiEwallet()">
            Saya Sudah Bayar via ${wallet}
        </button>
        `;
}

function konfirmasiEwallet() {
  const wallet = document.getElementById("ewalletConfirmWrapper").dataset
    .wallet;

  paymentDetail = `Dibayar via ${wallet}`;

  paymentStepModal.classList.remove("show");
  prosesPembayaran("E-Wallet");
}

// ================================
// PROSES PEMBAYARAN (SEMUA METODE BERAKHIR DI SINI)
// ================================

function prosesPembayaran(metode) {
  payBtn.disabled = true;
  paymentOverlay.classList.add("show");

  setTimeout(() => {
    paymentOverlay.classList.remove("show");
    tampilkanSukses(metode);
  }, 2000);
}

function tampilkanSukses(metode) {
  const orderId = "MS-" + Date.now().toString().slice(-8);

  orderIdEl.textContent = orderId;
  orderTotalEl.textContent = rupiah(grandTotalValue);
  orderMetodeEl.textContent = metode;

  orderDetailEl.textContent =
    metode === "COD" ? "Bayar tunai saat barang diterima" : paymentDetail;

  // catat event GA4: purchase (metrik konversi utama)
  if (typeof trackPurchase === "function") {
    trackPurchase(
      orderId,
      grandTotalValue,
      metode,
      orderItems.map((it) => ({
        item_id: it.id,
        item_name: it.nama,
        quantity: it.qty || 1,
        price: it.harga,
      })),
    );
  }

  // catat pesanan & customer ini supaya otomatis muncul di halaman admin
  simpanPesananKeAdmin(orderId, metode);

  successModal.classList.add("show");

  // bersihkan data belanja setelah "berhasil dibayar"
  localStorage.removeItem("cart");
  localStorage.removeItem("checkoutProduk");
}

// ================================
// SIMPAN PESANAN & CUSTOMER KE ADMIN (localStorage)
// Dipanggil otomatis setiap checkout berhasil, supaya
// admin/pesanan.html dan admin/customer.html langsung
// menampilkan data ini tanpa input manual.
// ================================

function ambilDataForm() {
  const formData = new FormData(checkoutForm);

  return {
    nama: (formData.get("nama") || "").trim(),
    email: (formData.get("email") || "").trim(),
    telepon: (formData.get("telepon") || "").trim(),
    kota: (formData.get("kota") || "").trim(),
    alamat: (formData.get("alamat") || "").trim(),
    kodepos: (formData.get("kodepos") || "").trim(),
  };
}

// baca array dari localStorage dengan aman (anti data corrupt)
function bacaArrayLocalStorage(key) {
  try {
    const data = localStorage.getItem(key);
    const parsed = data ? JSON.parse(data) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error(
      `Data "${key}" di localStorage rusak/tidak valid, direset ke kosong.`,
      err,
    );
    return [];
  }
}

function simpanPesananKeAdmin(orderId, metode) {
  const pembeli = ambilDataForm();

  // gabungkan nama-nama produk jadi satu string, contoh: "Kaos Oversize x1, Hoodie Grey x2"
  const produkText = orderItems
    .map((item) => {
      const qty = item.qty || 1;
      return item.nama + (qty > 1 ? " x" + qty : "");
    })
    .join(", ");

  const tanggalHariIni = new Date().toISOString().split("T")[0];

  // -------- 1. simpan ke "pesanan" (dibaca admin/pesanan.js) --------
  const daftarPesananAdmin = bacaArrayLocalStorage("pesanan");

  const idBaruPesanan =
    daftarPesananAdmin.length === 0
      ? 1
      : Math.max(...daftarPesananAdmin.map((p) => p.id || 0)) + 1;

  daftarPesananAdmin.push({
    id: idBaruPesanan,
    noPesanan: orderId,
    customer: pembeli.nama,
    produk: produkText,
    total: grandTotalValue,
    tanggal: tanggalHariIni,
    status: "Diproses",
  });

  localStorage.setItem("pesanan", JSON.stringify(daftarPesananAdmin));

  // -------- 2. simpan/gabung ke data customer admin (dibaca admin/customer.js) --------
  // PENTING: key & nama field harus sama persis dengan yang dipakai customer.js,
  // supaya customer baru dari checkout otomatis muncul di tabel & statistik admin.
  const CUSTOMER_STORAGE_KEY = "mensStyleCustomerData";
  const daftarCustomerAdmin = bacaArrayLocalStorage(CUSTOMER_STORAGE_KEY);

  const alamatLengkap = [pembeli.alamat, pembeli.kota, pembeli.kodepos]
    .filter(Boolean)
    .join(", ");

  const riwayatBaru = {
    tanggal: tanggalHariIni,
    produk: produkText,
    total: grandTotalValue,
    status: "diproses",
  };

  // cocokkan customer lewat email supaya tidak dobel setiap checkout
  const customerLama = pembeli.email
    ? daftarCustomerAdmin.find(
        (c) => (c.email || "").toLowerCase() === pembeli.email.toLowerCase(),
      )
    : null;

  if (customerLama) {
    customerLama.riwayat = customerLama.riwayat || [];
    customerLama.riwayat.unshift(riwayatBaru);

    customerLama.totalPesanan = (customerLama.totalPesanan || 0) + 1;
    customerLama.totalBelanja =
      (customerLama.totalBelanja || 0) + grandTotalValue;

    if (pembeli.telepon) customerLama.telepon = pembeli.telepon;
  } else {
    const idBaruCustomer =
      daftarCustomerAdmin.length === 0
        ? 1
        : Math.max(...daftarCustomerAdmin.map((c) => c.id || 0)) + 1;

    daftarCustomerAdmin.push({
      id: idBaruCustomer,
      nama: pembeli.nama,
      email: pembeli.email,
      telepon: pembeli.telepon,
      segmen: "Baru",
      bergabung: tanggalHariIni,
      totalPesanan: 1,
      totalBelanja: grandTotalValue,
      riwayat: [riwayatBaru],
      alamat: alamatLengkap ? [{ label: "Utama", detail: alamatLengkap }] : [],
      keranjang: [],
      wishlist: [],
      komplain: [],
    });
  }

  localStorage.setItem(
    CUSTOMER_STORAGE_KEY,
    JSON.stringify(daftarCustomerAdmin),
  );
}

// ================================
// TOAST NOTIFICATION (dipakai saat salin VA)
// ================================

function showToast(text) {
  let toast = document.createElement("div");

  toast.className = "toast";
  toast.innerHTML = text;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("show");
  }, 100);

  setTimeout(() => {
    toast.classList.remove("show");

    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 2000);
}
