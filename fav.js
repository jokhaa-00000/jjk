/* ================= NAVIGATION ================= */
const rankingslink = document.querySelector("#rankings-link");
if (rankingslink) {
  rankingslink.addEventListener("click", () => {
    window.location.href = "joxa.html";
  });
}

const homeLink = document.querySelector("#home-link");
if (homeLink) {
  homeLink.addEventListener("click", () => {
    window.location.href = "index.html";
  });
}

const grid = document.getElementById("fightersGrid");
const FAVS_API = "https://693d5714f55f1be7930290af.mockapi.io/favs";

let favs = [];

/* ================= FETCH FAVORITES ================= */
async function fetchFavs() {
  try {
    const res = await fetch(FAVS_API);
    favs = await res.json();
    renderFavs(favs);
  } catch (err) {
    console.error("Error fetching favs:", err);
    grid.innerHTML = "<p>Error loading favorites.</p>";
  }
}

/* ================= RENDER FAVORITES ================= */
function renderFavs(list) {
  grid.innerHTML = "";

  if (list.length === 0) {
    grid.innerHTML = "<p>No favorite fighters found.</p>";
    return;
  }

  list.forEach((f) => {
    grid.innerHTML += `
      <div class="fighter-card" 
           data-id="${f.id}" 
           data-name="${f.name}">
        <img src="${f.img}" alt="${f.name}">
        <div class="fighter-info">
          <div class="fighter-name">${f.name}</div>
          <div class="fighter-weight">${f.weight}</div>
        </div>
        <button class="delete-btn"
                data-id="${f.id}"
                data-name="${f.name}">
          Delete from favs
        </button>
      </div>
    `;
  });
}

/* ================= DELETE FAVORITE ================= */
document.addEventListener("click", async (e) => {
  if (!e.target.matches(".delete-btn")) return;

  const button = e.target;
  const favId = button.dataset.id;
  const favName = button.dataset.name;

  // ❗ SweetAlert confirm
  Swal.fire({
    title: "are you sure?",
    text: `${favName} will be removed from favorites`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#0080ff",
    confirmButtonText: "delete",
    cancelButtonText: "cancel",
  }).then(async (result) => {
    if (!result.isConfirmed) return;

    try {
      // ✅ DELETE
      await fetch(`${FAVS_API}/${favId}`, { method: "DELETE" });

      // update local state
      favs = favs.filter((f) => f.id !== favId);
      renderFavs(favs);

      // ✅ Success alert
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${favName} has been removed from favorites`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      console.error("Error deleting favorite:", err);

      // ❌ Error alert
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to delete favorite. Please try again later.",
      });
    }
  });
});

/* ================= INIT ================= */
fetchFavs();
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
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

document.addEventListener("click", (e) => {
  const card = e.target.closest(".fighter-card");
  if (!card) return;

  // If delete button was clicked, ignore card navigation
  if (e.target.classList.contains("delete-btn")) return;

  const fighterName = card.dataset.name;
  const slug = slugify(fighterName);

  window.open(`https://www.ufc.com/athlete/${slug}`, "_blank");
});
