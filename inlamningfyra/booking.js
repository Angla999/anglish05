export default class Booking {
  constructor(house) {
    this.house = house;
  }

  calculate(days, addons, code) {
    let total = this.house.pricePerNight * days;

    // tillägg
    addons.forEach(addon => {
      if (addon === 150) {
        total += addon * days; // frukost per dag
      } else {
        total += addon; // engång
      }
    });

    // rabatt
    if (code === "GHOST20") {
      total *= 0.8;
    }

    return Math.round(total);
  }

  validate(date, days) {
    if (!date) return "Välj ett datum";

    const today = new Date().toISOString().split("T")[0];
    if (date < today) return "Datum kan inte vara i dåtiden";
    if (!days || days < 1) return "Minst 1 dag krävs";
    return null;
  }

  confirm(date, days) {
    return `
      <div class="confirm-box">
        <h3>Bokning bekräftad</h3>
        <p><strong>Hus:</strong> ${this.house.name}</p>
        <p><strong>Datum:</strong> ${date}</p>
        <p><strong>Antal dagar:</strong> ${days}</p>
        <p>Tack för din bokning</p>
      </div>
    `;
  }
}