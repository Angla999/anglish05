import { inlamningar } from "./inlamning.js";

export function createNavigation(currentPage) {

    const navList = document.querySelector("nav ul");
    navList.innerHTML = "";

    inlamningar.forEach(item => {
        const li = document.createElement("li");
        const a = document.createElement("a");

        a.textContent = item.title;
        a.href = item.link;

        if (item.id === currentPage){
            a.classList.add("active");
        }
        
        let link = item.link;

        if (currentPage !== "Start") {
            link = "../" + item.link;
        }

        li.appendChild(a);
        navList.appendChild(li);
    });
}
