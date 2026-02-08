import { inlämningar } from "./inlämning.js";

export function createNavigation(currentPage) {
    const navList = document.querySelector("nav ul");
    navList.innerHTML = "";

    inlämningar.forEach(item => {
        const li = document.createElement("li");
        const a = document.createElement("a");

        a.textContent = item.title;
        a.href = item.link;

        // Gör länken inaktiv om den är samma som currentPage
        if (item.id === currentPage) {
            a.style.pointerEvents = "none"; // gör länken oklickbar
            a.style.opacity = "0.5";        // visuellt avaktiverad
        }

        li.appendChild(a);
        navList.appendChild(li);
    });
}
