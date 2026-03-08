import Match from "./match.js";

export default class Tournament {

    #container;

    constructor(container) {
        this.#container = container;
    }

    start(players) {
        this.#container.innerHTML = "";
        
        const quater = this.playRound(players, "kvartsfinal");
        const semi = this.playRound(quater, "Semifinal");
        const final = this.playRound(semi, "Final");

        const winner = final[0];

        const result = document.createElement("h1");
        result.textContent = `Vinnare: ${winner.name}`;
        this.#container.appendChild(result);
    }

    playRound(players, title){

        const roundDiv = document.createElement("div");
        roundDiv.classList.add("round");

        const h2 = document.createElement("h2");
        h2.textContent = title;

        roundDiv.appendChild(h2);

        const winners = [];

        for(let i=0;i<players.length;i+=2){

            const match = new Match(players[i], players[i+1]);
            roundDiv.appendChild(match.createElement());
            
            match.compete();
            winners.push(match.winner);
            
        }

        this.#container.appendChild(roundDiv);

        return winners;
    }

}


    