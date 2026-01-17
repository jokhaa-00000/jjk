// ===== PROTECT PAGE =====
if (localStorage.getItem("isLoggedIn") !== "true") {
  window.location.href = "index.html";
}

// show username
document.getElementById("profileUsername").textContent = "jokha";
document.getElementById("profileEmail").textContent = "zjokhadze96@gmail.com";
document.getElementById("password").textContent = "jokha1234";

// favorite fighter
const favInput = document.getElementById("favFighter");
const savedFighter = localStorage.getItem("favoriteFighter");

if (savedFighter) {
  favInput.value = savedFighter;
}

document.getElementById("saveFighter").addEventListener("click", () => {
  localStorage.setItem("favoriteFighter", favInput.value);
  alert("Favorite fighter saved!");
});

// logout
document.getElementById("logoutBtn").addEventListener("click", () => {
  const confirmLogout = confirm("Are you sure you want to log out?");

  if (confirmLogout) {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "index.html";
  }
});
