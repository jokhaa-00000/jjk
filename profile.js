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

// ===== SAVE FAVORITE FIGHTER =====
document.getElementById("saveFighter").addEventListener("click", () => {
  userData.favoriteFighter = favInput.value;
  localStorage.setItem("userData", JSON.stringify(userData));

  // ✅ TOP-RIGHT SUCCESS ALERT
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Favorite fighter saved!",
    showConfirmButton: false,
    timer: 1500,
  });
});

// ===== LOGOUT =====
document.getElementById("logoutBtn").addEventListener("click", () => {
  Swal.fire({
    title: "Are you sure?",
    text: "You will be logged out!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, log out",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        icon: "success",
        title: "Logged out",
        text: "See you soon ",
        timer: 1200,
        showConfirmButton: false,
      }).then(() => {
        localStorage.removeItem("isLoggedIn");
        window.location.href = "index.html";
      });
    }
  });
});
