import { fetchData, getScareLevelText } from "./utils.js";
import Booking from "./booking.js";

const id = new URLSearchParams(window.location.search).get("id");

let booking;

async function start() {

  const houseDiv = document.querySelector("#house");
  const mapDiv = document.querySelector("#karta");

  let data;

  try {
    data = await fetchData("./house.json");
  } catch (e) {
    houseDiv.innerHTML = "något gick fel";
    return;
  }

  let found;

  for (let i = 0; i < data.length; i++) {
    if (data[i].id == id) {
      found = data[i];
    }
  }

  if (!found) {
    houseDiv.innerHTML = "hittade inget hus...";
    return;
  }

  houseDiv.innerHTML =
    "<div class='detail-card'>" +
      "<img src='" + found.image + "'>" +
      "<h1>" + found.name + "</h1>" +
      "<p>" + found.location + "</p>" +
      "<div class='badges'>" +
        "<span class='price'>" + found.pricePerNight + " kr</span>" +
        "<span class='scare'>" + getScareLevelText(found.scareLevel) + "</span>" +
      "</div>" +
      "<p>" + found.description + "</p>" +
    "</div>";

  mapDiv.innerHTML =
    "<div class='map-card'>" +
      "<h2>Karta</h2>" +
      "<div id='map'></div>" +
      "<p id='place'>laddar...</p>" +
    "</div>";

  const map = L.map("map").setView(
    [found.coordinates.lat, found.coordinates.lng],
    10
  );

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

  L.marker([found.coordinates.lat, found.coordinates.lng])
    .addTo(map)
    .bindPopup(found.name)
    .openPopup();

  try {
    const res = await fetch(
      "https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=" +
        found.coordinates.lat +
        "&lon=" +
        found.coordinates.lng
    );

    const json = await res.json();

    document.querySelector("#place").innerHTML =
      "Land: " + (json.address.country || "?");

  } catch (e) {
    document.querySelector("#place").innerHTML = "kunde inte hämta plats";
  }

  booking = new Booking(found);

  const form = document.querySelector("#bookingForm");
  const totalEl = document.querySelector("#total");
  const confirmEl = document.querySelector("#confirmation");

  form.addEventListener("input", function () {

    const days = Number(document.querySelector("#days").value);
    const code = document.querySelector("#code").value;
    const boxes = document.querySelectorAll(".addon:checked");
    let addons = [];

    boxes.forEach(b => addons.push(Number(b.value)));
    let total = booking.calculate(days || 0, addons, code);
    totalEl.innerHTML = "Total: " + total + " kr";
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const date = document.querySelector("#date").value;
    const days = Number(document.querySelector("#days").value);

    const error = booking.validate(date, days);

    if (error) {
      confirmEl.innerHTML = error;
    } else {
      confirmEl.innerHTML = booking.confirm(date, days);
    }
  });

}

start();