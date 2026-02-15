import { inlamningar } from "./inlamning.js";

export function createNavigation(currentPage) {
    const navList = document.querySelector("nav ul");
    navList.innerHTML = "";

    inlamningar.forEach(item => {
        const li = document.createElement("li");
        const a = document.createElement("a");

    const isGithub = window.location.hostname.includes("github.io");

        a.textContent = item.title;
        a.href = item.link;

           a.href = isGithub 
            ? "/webbprojekt/" + item.link.replace("../", "") 
            : item.link;

        if (item.id === currentPage){
            a.classList.add("active");
        }

        li.appendChild(a);
        navList.appendChild(li);
    });
}
