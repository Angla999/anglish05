import { fetchData, getScareLevelText } from "./utils.js";

const container = document.querySelector("#houses");

const maxPriceInput = document.querySelector("#maxPrice");
const scareInput = document.querySelector("#scareLevel");
const scareText = document.querySelector("#scareValue");
const ghostInput = document.querySelector("#ghostType");
const wifiInput = document.querySelector("#wifi");

let allHouses = [];

async function init() {
  try {
    const houses = await fetchData("./house.json");
    allHouses = houses;

    populateGhosts(houses);

    render(houses);
    setupFilters();

  } catch (err) {
    container.innerHTML = "<p>Fel vid laddning</p>";
    console.log(err);
  }
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
    option.textContent = g;
    ghostInput.appendChild(option);
  });
}

function render(houses) {
  if (houses.length === 0) {
    container.innerHTML = "<p>Inga hus matchar filtreringen</p>";
    return;
  }
  
  container.innerHTML = houses.map(h => `
    
    <div class="card">
      <img src="${h.image}" alt="${h.name}">

      <div class="card-content">
        <h3>${h.name}</h3>
        <p class="location">${h.location}</p>

        <div class="badges">
          <span class="price">${h.pricePerNight} kr/natt</span>
          <span class="scare">${getScareLevelText(h.scareLevel)}</span>
        </div>

        <a class="card-button" href="house.html?id=${h.id}">Boka</a>

      </div>
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