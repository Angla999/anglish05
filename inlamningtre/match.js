export default class Match {
    #player1;
    #player2;
    #winner = null;
    #element = null;

    constructor(player1, player2) {
        this.#player1 = player1;
        this.#player2 = player2;
    }

    get player1() {
        return this.#player1;
    }

    get player2() {
        return this.#player2;
    }

    get winner() {
        return this.#winner;
    }

    get isPlayed() {
        return this.#winner !== null;
    }

    compete() {
        if (this.isPlayed) return;

        const skill1 = this.#player1.skillLevel ?? 4;
        const skill2 = this.#player2.skillLevel ?? 4;

        const totalSkill = skill1 + skill2;
        const randomValue = Math.random() * totalSkill;

        this.#winner = randomValue < skill1 ? this.#player1 : this.#player2;

        this.updateUI();
    }

    createElement() {
        const div = document.createElement("article");
        div.classList.add("match");

        div.innerHTML = `
            <div class="player">
                <img src="${this.#player1.image}" alt="${this.#player1.name}">
                <h3>${this.#player1.name}</h3>
                <p>Skill: ${this.#player1.skillLevel ?? "Okänd"}</p>
                <p>${this.#player1.catchphrase ?? "Ingen catchphrase"}</p>
            </div>

            <div class="vs">VS</div>

            <div class="player">
                <img src="${this.#player2.image}" alt="${this.#player2.name}">
                <h3>${this.#player2.name}</h3>
                <p>Skill: ${this.#player2.skillLevel ?? "Okänd"}</p>
                <p>${this.#player2.catchphrase ?? "Ingen catchphrase"}</p>
            </div>
        `;

        this.#element = div;
        return div;
    }

    updateUI() {
        const players = this.#element.querySelectorAll(".player");

        const winnerDiv = this.#winner === this.#player1 ? players[0] : players[1];
        const loserDiv = this.#winner === this.#player1 ? players[1] : players[0];

        winnerDiv.classList.add("winner");
        loserDiv.classList.add("loser");
    }
}