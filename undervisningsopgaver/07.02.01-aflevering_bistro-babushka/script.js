document.addEventListener("DOMContentLoaded", start);

function start() {
    console.log("DOM Content Loadet");
}

let temp = document.querySelector("template");
let container = document.querySelector("section");
let json;
let filter = "alle";

const link = "https://spreadsheets.google.com/feeds/list/17Dd7DvkPaFamNUdUKlrFgnH6POvBJXac7qyiS6zNRw0/od6/public/values?alt=json";

//Funktion henter data fra url
async function hentData() {
    const respons = await fetch(link);
    json = await respons.json();
    addEventListenerToButtons();
    vis(json);
}

function vis(menu) {
    console.log(menu);
    container.innerHTML = "";

    menu.feed.entry.forEach(ret => {
        if (filter == "alle" || filter == ret.gsx$kategori.$t) {
            console.log(menu);

            const klon = temp.cloneNode(true).content;
            klon.querySelector("h4").textContent = ret.gsx$navn.$t;
            klon.querySelector("img").src = "/imgs/small/" + ret.gsx$billede.$t + "-sm.jpg";
            klon.querySelector("img").alt = ret.gsx$billede.$t;

            //klon.querySelector(".kort_info").textContent = "Job: " + ret.gsx$kort.$t;
            //klon.querySelector(".lang_info").textContent = "By: " + ret.gsx$long.$t;
            //klon.querySelector(".kategori").textContent = "Hobby: " + ret.gsx$kategori.$t;
            //klon.querySelector(".oprindelse").textContent = "Oprindelse: " +ret.gsx$oprindelse.$t;
            //klon.querySelector(".pris").textContent = "Pris: " + ret.gsx$pris.$t; + "kr.";

            container.appendChild(klon);
        }
    })

}

function addEventListenerToButtons() {
    document.querySelectorAll(".filter").forEach((btn) => {
        btn.addEventListener("click", filterBTNs);
    });
}

function filterBTNs() {
    filter = this.dataset.kategori;
    document.querySelector("h3").textContent = this.textContent;
    document.querySelectorAll(".filter").forEach((btn) => {
        btn.classList.remove("valgt");
    })
    this.classList.add("valgt");
    vis(json);
}

hentData();
