const form = document.getElementById("registerForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const nama = document.getElementById("nama").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const konfirmasi = document.getElementById("konfirmasi").value;

  if (password !== konfirmasi) {
    alert("Konfirmasi password tidak sama.");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  const cekEmail = users.find((user) => user.email === email);

  if (cekEmail) {
    alert("Email sudah terdaftar.");
    return;
  }

  const userBaru = {
    nama: nama,
    email: email,
    password: password,
    role: "customer",
  };

  users.push(userBaru);

  localStorage.setItem("users", JSON.stringify(users));

  alert("Registrasi berhasil. Silakan login.");

  window.location.href = "login.html";
});
