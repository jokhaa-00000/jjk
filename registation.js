const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.getElementById("regUsername").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPassword").value.trim();
  const favoriteFighter = document.getElementById("regFighter").value.trim();
  const gender = document.getElementById("regGender").value;

  if (!username || !email || !password || !favoriteFighter || !gender) {
    alert("Please fill in all fields!");
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

  // AUTO LOGIN (same logic as login page)
  localStorage.setItem("isLoggedIn", "true");

  alert("Registration successful! Welcome aboard, " + username + "!");
  window.location.href = "index.html";
});
