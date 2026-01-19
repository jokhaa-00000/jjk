const contactLink = document.querySelector("#contact-link");
const homepage = document.getElementById("logo");
if (homepage) {
  homepage.addEventListener("click", () => {
    window.location.href = "index.html";
  });
}
if (contactLink) {
  contactLink.addEventListener("click", () => {
    window.location.href = "contact.html";
  });
}
const cardlink1 = document.querySelector("#ufc325");
const cardlink2 = document.querySelector("#ufc324");
const cardlink3 = document.querySelector("#ufc326");
if (cardlink1) {
  cardlink1.addEventListener("click", () => {
    window.open("https://www.ufc.com/event/ufc-325", "_blank");
  });
}

if (cardlink3) {
  cardlink3.addEventListener("click", () => {
    window.open("https://www.ufc.com/event/ufc-326", "_blank");
  });
}

if (cardlink2) {
  cardlink2.addEventListener("click", () => {
    window.open("https://www.ufc.com/event/ufc-324", "_blank");
  });
}
const rankingslink = document.querySelector("#rankings-link");
const homeLink = document.querySelector("#home-link");

if (homeLink) {
  homeLink.addEventListener("click", () => {
    window.location.href = "index.html";
  });
}
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    hamburger.classList.toggle("active");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      setTimeout(() => {
        navMenu.classList.remove("active");
        hamburger.classList.remove("active");
      }, 100);
    });
  });
});

if (rankingslink) {
  rankingslink.addEventListener("click", () => {
    window.location.href = "joxa.html";
  });
}
//
// ===== LOGIN STATE CHECK =====
document.addEventListener("DOMContentLoaded", () => {
  const loginLink = document.getElementById("contact-link");
  const profileLink = document.querySelector('a[href="profile.html"]');

  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (isLoggedIn === "true") {
    // hide LOGIN
    if (loginLink) loginLink.style.display = "none";

    // show PROFILE
    if (profileLink) profileLink.style.display = "block";
  } else {
    // show LOGIN
    if (loginLink) loginLink.style.display = "block";

    // hide PROFILE
    if (profileLink) profileLink.style.display = "none";
  }
});
