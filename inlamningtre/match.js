export default class Match{

    #player1;
    #player2;
    #winner = null;
    #element = null;

    constructor(player1, player2){
        this.#player1 = player1;
        this.#player2 = player2;
    }

    get winner(){
        return this.#winner;
    }

compete() {

    const skill1 = this.#player1.skillLevel ?? (Math.floor(Math.random() * 6) + 3);
    const skill2 = this.#player2.skillLevel ?? (Math.floor(Math.random() * 6) + 3);

    const totalSkill = skill1 + skill2;
    const randomValue = Math.random() * totalSkill;

    this.#winner = randomValue < skill1
        ? this.#player1
        : this.#player2;

    this.updateUI();
}

    createElement(){
        const div = document.createElement("div");
        div.classList.add("match");

        div.innerHTML = `
        <div class="player player1">
            <img src="${this.#player1.image}" alt="${this.#player1.name}">
            <h3>${this.#player1.name}</h3>
            <p>Skill: ${this.#player1.skillLevel ?? "Unknown"}</p>
        </div>

        <div class="vs">VS</div>

        <div class="player player2">
            <img src="${this.#player1.image}" alt="${this.#player1.name}">
            <h3>${this.#player2.name}</h3>
            <p>Skill: ${this.#player2.skillLevel ?? "Unknown"}</p>
        </div>

        `;

        this.#element = div;
        return div;
    }

updateUI() {
    const players = this.#element.querySelectorAll(".player");

    let winnerDiv;
    if(this.#winner === this.#player1) winnerDiv = players[0];
    else winnerDiv = players[1];

    winnerDiv.classList.add("winner");

    const phrase = document.createElement("p");
    phrase.innerHTML = `<em>"${this.#winner.catchphrase ?? ''}"</em>`;
    winnerDiv.appendChild(phrase);
  }
}