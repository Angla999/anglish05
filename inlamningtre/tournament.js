import Match from "./match.js";

export default class Tournament {
    #container;
    #button;
    #players = [];
    #currentPlayers = [];
    #roundIndex = 0;
    #roundNames = ["Kvartsfinal", "Semifinal", "Final"];
    #matches = [];
    #grid = null;

    constructor(container, button) {
        this.#container = container;
        this.#button = button;
    }

    start(players) {
        this.#container.innerHTML = "";

        this.#players = [...players];
        this.#currentPlayers = [...players];
        this.#roundIndex = 0;
        this.#matches = [];
        this.#grid = null;

        this.showStartMessage();

        this.#button.disabled = false;
        this.#button.textContent = "Simulera kvartsfinal";
    }

    showStartMessage() {
        const startBox = document.createElement("div");
        startBox.classList.add("start-box");

        startBox.innerHTML = `
            <h2>Redo för Robotarenan</h2>
            <p>Klicka på knappen för att simulera kvartsfinalen.</p>
        `;

        this.#container.appendChild(startBox);
    }

    createGridIfNeeded() {
        if (this.#grid) return;

        this.#container.innerHTML = "";

        this.#grid = document.createElement("div");
        this.#grid.classList.add("tournament-grid");
        this.#container.appendChild(this.#grid);
    }

    simulateRound() {
        this.createGridIfNeeded();

        const roundDiv = document.createElement("section");
        roundDiv.classList.add("round");

        const title = document.createElement("h2");
        title.textContent = this.#roundNames[this.#roundIndex];
        roundDiv.appendChild(title);

        this.#matches = [];

        for (let i = 0; i < this.#currentPlayers.length; i += 2) {
            const match = new Match(this.#currentPlayers[i], this.#currentPlayers[i + 1]);
            this.#matches.push(match);
            roundDiv.appendChild(match.createElement());
        }

        this.#grid.appendChild(roundDiv);

        this.#matches.forEach(match => {
            match.compete();
        });

        this.#currentPlayers = this.#matches.map(match => match.winner);

        if (this.#currentPlayers.length === 1) {
            this.showWinner();
            this.#button.disabled = true;
            this.#button.textContent = "Turneringen är klar";
            return;
        }

        this.#roundIndex++;
        this.updateButtonText();
    }

    updateButtonText() {
        const nextRound = this.#roundNames[this.#roundIndex];

        if (nextRound === "Semifinal") {
            this.#button.textContent = "Simulera semifinal";
        }

        if (nextRound === "Final") {
            this.#button.textContent = "Simulera final";
        }
    }

    showWinner() {
        const winner = this.#currentPlayers[0];

        const winnerBox = document.createElement("section");
        winnerBox.classList.add("winner-box");

        winnerBox.innerHTML = `
            <h2>Vinnare</h2>
            <img src="${winner.image}" alt="${winner.name}">
            <h3>${winner.name}</h3>
            <p>Skill: ${winner.skillLevel ?? "Okänd"}</p>
            <p>${winner.catchphrase ?? "Ingen catchphrase"}</p>
        `;

        this.#grid.appendChild(winnerBox);
    }
}