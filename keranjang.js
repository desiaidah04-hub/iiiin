// =======================================================
// DMEN'STYLE STORE
// keranjang.js
// Add to Cart (dari produk.js) + Update Qty + Remove + Total Otomatis
// =======================================================

const cartEmpty = document.getElementById("cartEmpty");
const cartList = document.getElementById("cartList");

const subtotalEl = document.getElementById("subtotal");
const diskonEl = document.getElementById("diskon");
const grandTotalEl = document.getElementById("grandTotal");
const checkoutBtn = document.getElementById("checkoutBtn");

const ONGKIR = 20000;

let cart = JSON.parse(localStorage.getItem("cart")) || [];

tampilKeranjang();

// ================================
// FORMAT RUPIAH
// ================================

function rupiah(angka) {
  return "Rp" + angka.toLocaleString("id-ID");
}

function simpanCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// ================================
// RENDER KERANJANG
// ================================

function tampilKeranjang() {
  if (!cartList || !cartEmpty) return;

  if (cart.length === 0) {
    cartEmpty.classList.add("show");
    cartList.innerHTML = "";
    updateSummary();
    return;
  }

  cartEmpty.classList.remove("show");

  cartList.innerHTML = "";

  cart.forEach((item, index) => {
    const varianText = [
      item.ukuran ? "Ukuran: " + item.ukuran : "",
      item.warna ? "Warna: " + item.warna : "",
    ]
      .filter(Boolean)
      .join(" | ");

    cartList.innerHTML += `
        <div class="cart-item">

            <img src="${item.gambar}">

            <div class="item-info">
                <h3>${item.nama}</h3>
                ${varianText ? `<p class="varian">${varianText}</p>` : ""}
                <p class="harga">${rupiah(item.harga)}</p>
            </div>

            <div class="item-qty">
                <button onclick="ubahQty(${index}, -1)">-</button>
                <input type="number" min="1" value="${item.qty}"
                    onchange="setQty(${index}, this.value)">
                <button onclick="ubahQty(${index}, 1)">+</button>
            </div>

            <div class="item-subtotal">${rupiah(item.harga * item.qty)}</div>

            <button class="item-hapus" onclick="hapusItem(${index})" title="Hapus">
                <i class="fa-solid fa-trash"></i>
            </button>

        </div>
        `;
  });

  updateSummary();
}

// ================================
// UBAH JUMLAH (QTY)
// ================================

function ubahQty(index, delta) {
  cart[index].qty += delta;

  if (cart[index].qty < 1) {
    cart[index].qty = 1;
  }

  simpanCart();
  tampilKeranjang();
}

function setQty(index, value) {
  let qty = parseInt(value);

  if (isNaN(qty) || qty < 1) {
    qty = 1;
  }

  cart[index].qty = qty;

  simpanCart();
  tampilKeranjang();
}

// ================================
// HAPUS PRODUK
// ================================

function hapusItem(index) {
  const nama = cart[index].nama;

  cart.splice(index, 1);

  simpanCart();
  tampilKeranjang();

  showToast(nama + " dihapus dari keranjang");
}

// ================================
// RINGKASAN + TOTAL OTOMATIS
// ================================

function updateSummary() {
  const subtotal = cart.reduce((sum, item) => sum + item.harga * item.qty, 0);

  // diskon per item (jika produk membawa info diskon persen saat ditambahkan)
  const diskon = cart.reduce((sum, item) => {
    if (item.diskon) {
      return sum + (item.harga * item.qty * item.diskon) / 100;
    }
    return sum;
  }, 0);

  const ongkir = cart.length > 0 ? ONGKIR : 0;
  const grandTotal = subtotal - diskon + ongkir;

  if (subtotalEl) subtotalEl.textContent = rupiah(subtotal);
  if (diskonEl) diskonEl.textContent = "-" + rupiah(diskon);
  if (grandTotalEl) grandTotalEl.textContent = rupiah(grandTotal);

  if (checkoutBtn) {
    checkoutBtn.disabled = cart.length === 0;
  }
}

// ================================
// CHECKOUT
// ================================

if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) return;

    window.location.href = "checkout.html";
  });
}

// ================================
// TOAST NOTIFICATION (mandiri)
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
