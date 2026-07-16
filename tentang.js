// =======================================================
// DMEN'STYLE STORE
// tentang.js
// =======================================================

const cartCount = document.getElementById("cartCount");
const darkBtn = document.getElementById("darkMode");
const backTop = document.getElementById("backToTop");

// ==========================================
// CART BADGE
// ==========================================

function updateCartBadge() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  let total = 0;

  cart.forEach((item) => {
    total += item.qty;
  });

  if (cartCount) {
    cartCount.textContent = total;
  }
}

updateCartBadge();

// ==========================================
// DARK MODE
// ==========================================

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

if (darkBtn) {
  darkBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  });
}

// ==========================================
// BACK TO TOP
// ==========================================

if (backTop) {
  window.addEventListener("scroll", () => {
    backTop.style.display = window.scrollY > 300 ? "flex" : "none";
  });

  backTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}
