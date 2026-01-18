// ===== PROTECT PAGE =====
if (localStorage.getItem("isLoggedIn") !== "true") {
  window.location.href = "index.html";
}

// ===== GET USER DATA =====
const userData = JSON.parse(localStorage.getItem("userData"));

if (!userData) {
  alert("No user data found!");
  window.location.href = "index.html";
}

// ===== SHOW USER INFO =====
document.getElementById("profileUsername").textContent = userData.username;
document.getElementById("profileEmail").textContent = userData.email;
document.getElementById("password").textContent = userData.password;

// ===== FAVORITE FIGHTER =====
const favInput = document.getElementById("favFighter");

// თუ რეგისტრაციის დროს შეიყვანა
favInput.value = userData.favoriteFighter || "";

document.getElementById("saveFighter").addEventListener("click", () => {
  userData.favoriteFighter = favInput.value;
  localStorage.setItem("userData", JSON.stringify(userData));
  alert("Favorite fighter saved!");
});

// ===== LOGOUT =====
document.getElementById("logoutBtn").addEventListener("click", () => {
  const confirmLogout = confirm("Are you sure you want to log out?");

  if (confirmLogout) {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "index.html";
  }
});
