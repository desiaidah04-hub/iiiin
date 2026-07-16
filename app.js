// ================= PRODUK TERBARU =================

const products = [
  {
    nama: "Kaos Singlet",
    gambar: "images/kaos-singlet.jpg",
  },
  {
    nama: "Sepatu Casual",
    gambar: "images/sepatu-casual.jpg",
  },
  {
    nama: "SweatShort",
    gambar: "images/sweatshort.jpg",
  },
];

const container = document.getElementById("product-grid");

if (container) {
  container.innerHTML = products
    .map(
      (item) => `
    <div class="home-product-card">
      <div class="thumb">
        <img src="${item.gambar}" alt="${item.nama}" loading="lazy" />
      </div>
      <div class="info">
        <h3>${item.nama}</h3>
        <a href="produk.html">Lihat Produk</a>
      </div>
    </div>
  `,
    )
    .join("");
}

// ================= BANNER SLIDER =================

const slidesTrack = document.querySelector(".slides");
const slideItems = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let currentIndex = 0;
let autoSlide;

function showSlide(index) {
  if (!slidesTrack || slideItems.length === 0) return;
  currentIndex = (index + slideItems.length) % slideItems.length;
  slidesTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function nextSlide() {
  showSlide(currentIndex + 1);
}

function prevSlide() {
  showSlide(currentIndex - 1);
}

function startAutoSlide() {
  autoSlide = setInterval(nextSlide, 4000);
}

function resetAutoSlide() {
  clearInterval(autoSlide);
  startAutoSlide();
}

if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    nextSlide();
    resetAutoSlide();
  });
}

if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    prevSlide();
    resetAutoSlide();
  });
}

if (slidesTrack && slideItems.length > 0) {
  showSlide(0);
  startAutoSlide();
}
