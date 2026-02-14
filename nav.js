import { inlämningar } from "./inlämning.js";

export function createNavigation(currentPage) {
    const navList = document.querySelector("nav ul");
    navList.innerHTML = "";

    inlämningar.forEach(item => {
        const li = document.createElement("li");
        const a = document.createElement("a");

        a.textContent = item.title;
        a.href = item.link;

        if (item.id === currentPage){
            a.classList.add("active");
        }

        li.appendChild(a);
        navList.appendChild(li);
    });
}
