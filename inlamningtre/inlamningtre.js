import Tournament from "./tournament.js";

const container = document.querySelector("#tournament");
const startBtn = document.querySelector("#startBtn");
const resetBtn = document.querySelector("#resetBtn");

async function init(){
    const response = await fetch("./contestants.json");
    const players = await response.json();

    const tournament = new Tournament(container);

    startBtn.addEventListener("click", () => {
        tournament.start(players);
    });

    resetBtn.addEventListener("click", () => {
        container.innerHTML = "";
    });
}

init();