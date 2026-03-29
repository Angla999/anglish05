import Match from "./match.js";

export default class Tournament {

    #container;

    constructor(container) {
        this.#container = container;
    }

    start(players) {
        this.#container.innerHTML = "";

        this.players = players;
        this.roundIndex = 0;
        this.roundNames = ["Kvartsfinal", "Semifinal", "Final"];

        this.wrapper = document.createElement("div");
        this.wrapper.classList.add("tournament-grid");
        this.#container.appendChild(this.wrapper);

        this.run();
    }

    run() {

        if (this.players.length === 1) {
            const win = document.createElement("div");
            win.classList.add("winner-box");
            win.innerHTML = `<p>${this.players[0].name}</p>`;
            this.wrapper.lastChild.appendChild(win);
            return;
        }

        const roundDiv = document.createElement("div");
        roundDiv.classList.add("round");

        const h2 = document.createElement("h2");
        h2.textContent = this.roundNames[this.roundIndex];
        roundDiv.appendChild(h2);

        const winners = [];

        for (let i = 0; i < this.players.length; i += 2) {
            const match = new Match(this.players[i], this.players[i + 1]);
            roundDiv.appendChild(match.createElement());
            match.compete();
            winners.push(match.winner);
        }

        this.wrapper.appendChild(roundDiv);

        this.players = winners;
        this.roundIndex++;

        let frames = 0;

        const wait = () => {
            frames++;
            if (frames > 60) { 
                this.run();
            } else {
                requestAnimationFrame(wait);
            }
        };

        requestAnimationFrame(wait);
    }
}