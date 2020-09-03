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
    const temp = document.querySelector("template");
    const container = document.querySelector("section");

    console.log(menu);
    container.innerHTML = "";

    menu.feed.entry.forEach(ret => {
        if (filter == "alle" || filter == ret.gsx$kategori.$t) {
            console.log(menu);

            const klon = temp.cloneNode(true).content;
            klon.querySelector("h1").textContent = ret.gsx$navn.$t;
            klon.querySelector("img").src = "/imgs/small/" + ret.gsx$billede.$t + "-sm.jpg";
            klon.querySelector("img").alt = ret.gsx$billede.$t;

            //Åbn popup når der klikkes på en article
            klon.querySelector("article").addEventListener("click", () => visDetaljer(ret));

            container.appendChild(klon);
        }
    })

}

//Vis detaljer om ret i popup
function visDetaljer(ret) {
    popup.style.display = "block";
    popup.querySelector("h1").textContent = ret.gsx$navn.$t;
    popup.querySelector("img").src = "/imgs/large/" + ret.gsx$billede.$t + ".jpg";
    popup.querySelector("img").alt = ret.gsx$billede.$t;
    popup.querySelector(".oprindelse").textContent = "Oprindelse: " + ret.gsx$oprindelse.$t;
    popup.querySelector(".lang_info").textContent = ret.gsx$lang.$t;
    popup.querySelector(".pris").textContent = "Pris: " + ret.gsx$pris.$t + " kr.";
}

//Luk popup
document.querySelector("#luk").addEventListener("click", () => popup.style.display = "none");


function addEventListenerToButtons() {
    document.querySelectorAll(".filter").forEach((btn) => {
        btn.addEventListener("click", filterBTNs);
    });
}

function filterBTNs() {
    filter = this.dataset.kategori;
    document.querySelector("h1").textContent = this.textContent;
    document.querySelectorAll(".filter").forEach((btn) => {
        btn.classList.remove("valgt");
    })
    this.classList.add("valgt");
    vis(json);
}

hentData();
