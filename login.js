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
    alert("Login successful! welcome back, " + username + "!");
    window.location.href = "index.html";
  } else {
    alert("Wrong username or password!");
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
