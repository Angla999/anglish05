import Tournament from "./tournament.js";

const players = [
    "Spelare 1",
    "Spelare 2",
    "Spelare 3",
    "Spelare 4",
    "Spelare 5",
    "Spelare 6",
    "Spelare 7",
    "Spelare 8"
];

const container = document.querySelector("#tournament");

const startBtn = document.querySelector("#startBtn");

async function init(){
    const response = await fetch("./contestants.json");
    const players = await response.json();

    const tournament = new Tournament(container);

    startBtn.addEventListener("click", () => {
        tournament.start(players);
    });
}

init();