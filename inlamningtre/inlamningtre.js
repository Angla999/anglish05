import Tournament from "./tournament.js";

const tournamentContainer = document.querySelector("#tournament");
const simulateBtn = document.querySelector("#simulateBtn");
const resetBtn = document.querySelector("#resetBtn");

let tournament;

async function init() {
    const response = await fetch("./contestants.json");
    const players = await response.json();

    tournament = new Tournament(tournamentContainer, simulateBtn);
    tournament.start(players);

    simulateBtn.addEventListener("click", () => {
        tournament.simulateRound();
    });

    resetBtn.addEventListener("click", () => {
        tournament.start(players);
    });
}

init();