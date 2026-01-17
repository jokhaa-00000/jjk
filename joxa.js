const grid = document.getElementById("fightersGrid");
const searchInput = document.getElementById("searchInput");
const weightFilter = document.getElementById("weightFilter");

const FIGHTERS_API = "https://693d5714f55f1be7930290af.mockapi.io/fighters";
const FAVS_API = "https://693d5714f55f1be7930290af.mockapi.io/favs";

let fighters = [];
let favs = [];

/* ================= UTILS (დამხმარე ფუნქცია) ================= */

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // ჩაანაცვლებს ინტერვალებს დეფისებით
    .replace(/[^\w\-]+/g, "") // ამოიღებს არამეგობრულ სიმბოლოებს
    .replace(/\-\-+/g, "-") // ჩაანაცვლებს მრავალ დეფისს ერთით
    .replace(/^-+/, "") // ამოიღებს დეფისებს დასაწყისიდან
    .replace(/-+$/, ""); // ამოიღებს დეფისებს ბოლოდან
}

/* ================= FETCH DATA ================= */
async function fetchFighters() {
  try {
    const res = await fetch(FIGHTERS_API);
    fighters = await res.json();
    await fetchFavs();
    render(fighters);
  } catch (err) {
    console.error("Error fetching fighters:", err);
  }
}

async function fetchFavs() {
  try {
    const res = await fetch(FAVS_API);
    favs = await res.json();
  } catch (err) {
    console.error("Error fetching favs:", err);
  }
}

/* ================= RENDER ================= */
function render(list) {
  grid.innerHTML = "";

  list.forEach((f) => {
    const isFav = favs.some((fav) => fav.fighterId === f.id);
    const fighterSlug = slugify(f.name);

    grid.innerHTML += `
      <div class="fighter-card" data-id="${fighterSlug}">
        <label class="container favorite-btn">
          <input type="checkbox"
            ${isFav ? "checked" : ""}
            data-id="${f.id}"
            data-name="${f.name}"
            data-img="${f.img}"
            data-weight="${f.weight}"
          >
          <svg viewBox="0 0 24 24">
            <path d="M16.4,4C14.6,4,13,4.9,12,6.3C11,4.9,9.4,4,7.6,4C4.5,4,2,6.5,2,9.6C2,14,12,22,12,22s10-8,10-12.4C22,6.5,19.5,4,16.4,4z"/>
          </svg>
        </label>

        <img src="${f.img}" alt="${f.name}">
        <div class="fighter-info">
          <div class="fighter-name">${f.name}</div>
          <div class="fighter-weight">${f.weight}</div>
        </div>
      </div>
    `;
  });
}

/* ================= FILTER ================= */
function normalize(text) {
  return text.toLowerCase().trim().replace(/\s+/g, " ");
}

function filterFighters() {
  const search = searchInput.value.toLowerCase().trim();
  const weight = weightFilter.value;

  const filtered = fighters.filter((f) => {
    const nameParts = f.name.toLowerCase().split(" ");

    // STARTS WITH logic (not includes)
    const nameMatch =
      search === "" || nameParts.some((part) => part.startsWith(search));

    const weightMatch = weight === "all" || f.weight === weight;

    return nameMatch && weightMatch;
  });

  render(filtered);
}

document.addEventListener("click", (e) => {
  const card = e.target.closest(".fighter-card");

  const isFavButton = e.target.closest(".favorite-btn");

  if (card && !isFavButton) {
    const fighterId = card.dataset.id;

    navigateToFighter(fighterId);
  }
});

function navigateToFighter(fighterId) {
  const link = `https://www.ufc.com/athlete/${fighterId}`;
  window.open(link, "_blank");
}

searchInput.addEventListener("input", filterFighters);
weightFilter.addEventListener("change", filterFighters);

/* ================= FAVORITES LOGIC ================= */
document.addEventListener("change", async (e) => {
  if (!e.target.matches(".favorite-btn input")) return;

  const checkbox = e.target;

  const fighter = {
    fighterId: checkbox.dataset.id,
    name: checkbox.dataset.name,
    img: checkbox.dataset.img,
    weight: checkbox.dataset.weight,
  };

  if (checkbox.checked) {
    // ADD to favs
    const res = await fetch(FAVS_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fighter),
    });
    const newFav = await res.json();
    favs.push(newFav);
    alert(`${fighter.name} added to favs`);
  } else {
    // DELETE from favs
    const favToDelete = favs.find((f) => f.fighterId === fighter.fighterId);
    if (favToDelete) {
      await fetch(`${FAVS_API}/${favToDelete.id}`, { method: "DELETE" });
      favs = favs.filter((f) => f.fighterId !== fighter.fighterId);
      alert(`${fighter.name} deleted from favs`);
    }
  }
});
const favlink = document.querySelector("#favs-link");

if (favlink) {
  favlink.addEventListener("click", () => {
    window.location.href = "favs.html";
  });
}

/* ================= INIT ================= */
fetchFighters();
