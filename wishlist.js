const wishlistContainer = document.getElementById("wishlistContainer");

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

if (wishlist.length === 0) {
  wishlistContainer.innerHTML = `
        <h2 style="text-align:center;width:100%;">
            ❤️ Wishlist masih kosong
        </h2>
    `;
} else {
  tampilWishlist();
}

function tampilWishlist() {
  wishlistContainer.innerHTML = "";

  wishlist.forEach((produk, index) => {
    wishlistContainer.innerHTML += `

        <div class="wishlist-card">

            <img src="${produk.gambar}">

            <div class="wishlist-info">

                <h3>${produk.nama}</h3>

                <p class="price">
                Rp ${produk.harga.toLocaleString("id-ID")}
                </p>

                <div class="btn-group">

                    <button class="btn-cart"
                    onclick="tambahKeranjang(${index})">
                        Tambah Keranjang
                    </button>

                    <button class="btn-delete"
                    onclick="hapusWishlist(${index})">
                        Hapus
                    </button>

                </div>

            </div>

        </div>

        `;
  });
}

function hapusWishlist(index) {
  wishlist.splice(index, 1);

  localStorage.setItem("wishlist", JSON.stringify(wishlist));

  location.reload();
}

function tambahKeranjang(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push(wishlist[index]);

  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Produk berhasil ditambahkan ke keranjang.");
}
