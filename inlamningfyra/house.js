import { fetchData, getScareLevelText } from "./utils.js";
import Booking from "./booking.js";

const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));

const container = document.querySelector("#house");
const mapSection = document.querySelector("#karta");
const form = document.querySelector("#bookingForm");
const totalEl = document.querySelector("#total");
const confirmEl = document.querySelector("#confirmation");

let booking;

async function init() {
  try {
    if (!id) {
      container.innerHTML = "<p>Ingen ID i URL</p>";
      return;
    }

    const houses = await fetchData("./house.json");
    const house = houses.find(h => h.id === id);

    if (!house) {
      container.innerHTML = "<p>Hittar inte huset</p>";
      return;
    }

    renderHouse(house);
    renderMap(house);

    booking = new Booking(house);
    setupBooking();

  } catch (err) {
    console.log(err);
    container.innerHTML = "<p>Fel vid laddning</p>";
  }
}

function renderHouse(h) {
  container.innerHTML = `
    <div class="detail-card">
      <img src="${h.image}" alt="${h.name}">
      <h1>${h.name}</h1>
      <p>${h.location}</p>

      <div class="badges">
        <span class="price">${h.pricePerNight} kr</span>
        <span class="scare">${getScareLevelText(h.scareLevel)}</span>
      </div>

      <p>${h.description}</p>
    </div>
  `;
}

function renderMap(h) {
  if (!mapSection) return;

  mapSection.innerHTML = `
    <div class="map-card">
      <h2>Karta</h2>
      <div id="map" style="height:400px;"></div>
      <p id="place">Laddar plats...</p>
    </div>
  `;

  setTimeout(() => {
    if (typeof L === "undefined") {
      document.querySelector("#place").textContent = "Karta kunde inte laddas";
      return;
    }

    const map = L.map("map").setView(
      [h.coordinates.lat, h.coordinates.lng],
      10
    );

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

    L.marker([h.coordinates.lat, h.coordinates.lng])
      .addTo(map)
      .bindPopup(h.name)
      .openPopup();

    fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${h.coordinates.lat}&lon=${h.coordinates.lng}`)
      .then(res => res.json())
      .then(data => {
        const country = data.address?.country || "Okänt land";
        document.querySelector("#place").textContent = "Land: " + country;
      })
      .catch(() => {
        document.querySelector("#place").textContent = "Kunde inte hämta plats";
      });

  }, 50);
}

function setupBooking() {
  form.addEventListener("input", () => {
    const days = Number(document.querySelector("#days").value);
    const code = document.querySelector("#code").value;

    const addons = [...document.querySelectorAll(".addon:checked")]
      .map(a => Number(a.value));

    const total = booking.calculate(days || 0, addons, code);
    totalEl.textContent = "Total: " + total + " kr";
  });

  form.addEventListener("submit", e => {
    e.preventDefault();

    const date = document.querySelector("#date").value;
    const days = Number(document.querySelector("#days").value);

    const error = booking.validate(date, days);

    if (error) {
      confirmEl.textContent = error;
      return;
    }

    confirmEl.innerHTML = booking.confirm(date, days);
  });
}

init();