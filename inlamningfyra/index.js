import { fetchData, getScareLevelText } from "./utils.js";

const container = document.querySelector("#houses");

const maxPriceInput = document.querySelector("#maxPrice");
const scareInput = document.querySelector("#scareLevel");
const scareText = document.querySelector("#scareValue");
const ghostInput = document.querySelector("#ghostType");
const wifiInput = document.querySelector("#wifi");

let allHouses = [];

async function init() {
  const houses = await fetchData("./house.json");
  allHouses = houses;

  populateGhosts(houses);
  render(houses);
  setupFilters();
}

function populateGhosts(houses) {
  const ghostSet = new Set();

  houses.forEach(h => {
    if (!h.ghostTypes) return;
    h.ghostTypes.forEach(g => ghostSet.add(g));
  });

  ghostSet.forEach(g => {
    const option = document.createElement("option");
    option.value = g;
    option.textContent = g.charAt(0).toUpperCase() + g.slice(1);
    ghostInput.appendChild(option);
  });
}

function render(houses) {
  if (houses.length === 0) {
    container.innerHTML = "<p>Inga hus</p>";
    return;
  }

  container.innerHTML = houses.map(h => `
    <div class="card">
      <img src="${h.image}">
      <h3>${h.name}</h3>
      <p>${h.location}</p>
      <p>${h.pricePerNight} kr</p>
      <p>${getScareLevelText(h.scareLevel)}</p>
      <a href="house.html?id=${h.id}">Boka</a>
    </div>
  `).join("");
}

function setupFilters() {
  scareInput.addEventListener("input", () => {
    scareText.textContent = getScareLevelText(scareInput.value);
    filter();
  });

  maxPriceInput.addEventListener("input", filter);
  ghostInput.addEventListener("change", filter);
  wifiInput.addEventListener("change", filter);
}

function filter() {
  const maxPrice = Number(maxPriceInput.value);
  const scareLevel = Number(scareInput.value);
  const ghostType = ghostInput.value;
  const wifi = wifiInput.checked;

  const filtered = allHouses.filter(h => {
    if (maxPrice && h.pricePerNight > maxPrice) return false;
    if (h.scareLevel < scareLevel) return false;
    if (ghostType !== "all" && !h.ghostTypes.includes(ghostType)) return false;
    if (wifi && !h.hasWifi) return false;
    return true;
  });

  render(filtered);
}

init();