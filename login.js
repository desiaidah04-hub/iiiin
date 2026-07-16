// ==============================
// Data Default
// ==============================

if (localStorage.getItem("users") == null) {
  const users = [
    {
      nama: "Administrator",
      email: "admin@gmail.com",
      password: "admin123",
      role: "admin",
    },

    {
      nama: "Customer",
      email: "customer@gmail.com",
      password: "123456",
      role: "customer",
    },

    {
      nama: "Desi",
      email: "Desiadh@gmail.com",
      password: "241204",
      role: "customer",
    },
  ];

  localStorage.setItem("users", JSON.stringify(users));
}

// ==============================
// Login
// ==============================

const form = document.getElementById("loginForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;

  const password = document.getElementById("password").value;

  const users = JSON.parse(localStorage.getItem("users"));

  const user = users.find((data) => {
    return data.email === email && data.password === password;
  });

  if (user) {
    localStorage.setItem("loginUser", JSON.stringify(user));

    alert("Login berhasil!");

    if (user.role === "admin") {
      window.location.href = "admin/dashboard.html";
    } else {
      window.location.href = "index.html";
    }
  } else {
    alert("Email atau Password salah!");
  }
});
