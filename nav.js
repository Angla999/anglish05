import { inlämningar } from "./inlämning.js";
import { inlämningar } from ".Inlämning2.js";

export function createNavigation(currentPage) {
    const navList = document.querySelector("nav ul");
    navList.innerHTML = "";

    inlämningar.forEach(item => {
        const li = document.createElement("li");
        const a = document.createElement("a");

        a.textContent = item.title;
        a.href = item.link;

    
        if (item.id === currentPage) {
            a.style.pointerEvents = "none"; 
            a.style.opacity = "1";        
        }

        li.appendChild(a);
        navList.appendChild(li);
    });
}
