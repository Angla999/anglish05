import { createNavigation } from "./nav.js";
import { inlamningar } from "./inlamning.js";

document.addEventListener("DOMContentLoaded", () => {
    const currentPage = document.body.dataset.page; 


    createNavigation(currentPage);


    if (currentPage === "Start") {
        createCards();
    }
});

function createCards() {
    const container = document.querySelector(".kort");
    if (!container) return;

    inlamningar
        .filter(item => item.showAsCard !== false)
        .forEach(item => {
            const card = document.createElement("article");
            card.classList.add("card");

            card.innerHTML = `
                <h3>${item.title}</h3>
                <p>${item.description || ""}</p>
                <a href="${item.link}">Gå till uppgiften</a>
            `;

            container.appendChild(card);
        });
}