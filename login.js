loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  const savedUser = JSON.parse(localStorage.getItem("userData"));

  // default user
  const defaultUsername = "jokha";
  const defaultPassword = "joxa1234";

  const isDefaultUser =
    username === defaultUsername && password === defaultPassword;

  const isRegisteredUser =
    savedUser &&
    username === savedUser.username &&
    password === savedUser.password;

  if (isDefaultUser || isRegisteredUser) {
    localStorage.setItem("isLoggedIn", "true");

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Welcome back, " + username + "!",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      window.location.href = "index.html";
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Wrong username or password!",
    });
  }
});

// ===== SHOW / HIDE PASSWORD =====
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");

togglePassword.addEventListener("click", () => {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    togglePassword.textContent = "hide";
  } else {
    passwordInput.type = "password";
    togglePassword.textContent = "show";
  }
});

document.getElementById("goRegister").addEventListener("click", () => {
  window.location.href = "registration.html";
});
