const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("regUsername").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPassword").value.trim();
  const favoriteFighter = document.getElementById("regFighter").value.trim();
  const gender = document.getElementById("regGender").value;

  // ❌ EMPTY FIELDS — SweetAlert
  if (!username || !email || !password || !favoriteFighter || !gender) {
    Swal.fire("SweetAlert2 is working!");
    return;
  }

  // save user
  const userData = {
    username,
    email,
    password,
    favoriteFighter,
    gender,
  };

  localStorage.setItem("userData", JSON.stringify(userData));

  // AUTO LOGIN
  localStorage.setItem("isLoggedIn", "true");

  // ✅ SUCCESS SweetAlert
  Swal.fire({
    icon: "success",
    title: "Registration successful ",
    text: "Welcome aboard, " + username + "!",
    timer: 1800,
    showConfirmButton: false,
  }).then(() => {
    window.location.href = "index.html";
  });
});
