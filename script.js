// ==========================================
// NALOGA 1: Interaktivni pozdrav in ura
// ==========================================
function posodobiPozdravInUro() {
    const elementPozdrav = document.getElementById("pozdrav-ura");
    if (!elementPozdrav) return; // Če nismo na pravi strani, preskoči

    const zdaj = new Date();
    const ure = zdaj.getHours();
    
    // Oblikovanje časa z vodilnimi ničlami (npr. 07:05:09)
    const ureNiz = String(ure).padStart(2, "0");
    const minuteNiz = String(zdaj.getMinutes()).padStart(2, "0");
    const sekundeNiz = String(zdaj.getSeconds()).padStart(2, "0");
    const cas = `${ureNiz}:${minuteNiz}:${sekundeNiz}`;

    let pozdrav = "";
    if (ure < 12) {
        pozdrav = "Dobro jutro";
    } else if (ure < 18) {
        pozdrav = "Dober dan";
    } else {
        pozdrav = "Dober večer";
    }

    elementPozdrav.textContent = `${pozdrav} - ${cas}`;
}

// Zaženi takoj in posodabljaj vsako sekundo
posodobiPozdravInUro();
setInterval(posodobiPozdravInUro, 1000);


// ==========================================
// NALOGA 2: Dinamične kartice iz polja objektov
// ==========================================
const storitve = [
    {
        naziv: "Žensko striženje in fen",
        opis: "Umivanje las, nega, striženje in oblikovanje pričeske.",
        cena: "30 €",
        prostaMesta: 3
    },
    {
        naziv: "Moško klasično striženje",
        opis: "Hitro in natančno striženje s škarjami ali strojčkom.",
        cena: "18 €",
        prostaMesta: 5
    },
    {
        naziv: "Barvanje narastka",
        opis: "Barvanje z nežnimi barvami brez amoniaka in nega.",
        cena: "45 €",
        prostaMesta: 0 // Tukaj se bo izpisalo "Zasedeno"
    },
    {
        naziv: "Prameni (Balayage)",
        opis: "Naravni prehodi svetlih pramenov z zaščito las.",
        cena: "75 €",
        prostaMesta: 1
    },
    {
        naziv: "Svečana večerna pričeska",
        opis: "Oblikovanje spete pričeske za posebne priložnosti.",
        cena: "40 €",
        prostaMesta: 2
    }
];

function prikaziStoritve() {
    const vsebnik = document.getElementById("seznam-storitev");
    if (!vsebnik) return; // Če nismo na tej podstrani, preskoči

    vsebnik.innerHTML = ""; // Počistimo vsebnik

    storitve.forEach(storitev => {
        const kartica = document.createElement("div");
        kartica.className = "kartica";

        // Preverimo število prostih mest
        const statusMest = storitev.prostaMesta === 0 
            ? `<span style="color: #d9534f; font-weight: bold;">Zasedeno</span>` 
            : `<span style="color: #28a745; font-weight: bold;">Prosta mesta: ${storitev.prostaMesta}</span>`;

        kartica.innerHTML = `
            <h3>${storitev.naziv}</h3>
            <p>${storitev.opis}</p>
            <p><strong>Cena:</strong> ${storitev.cena}</p>
            <p>${statusMest}</p>
        `;

        vsebnik.appendChild(kartica);
    });
}

prikaziStoritve();


// ==========================================
// NALOGA 3: Interaktivni izračun (Kalkulator)
// ==========================================
const gumbIzracunaj = document.getElementById("gumb-izracunaj");
if (gumbIzracunaj) {
    gumbIzracunaj.addEventListener("click", function () {
        const trenutna = Number(document.getElementById("trenutna-dolzina").value);
        const ciljna = Number(document.getElementById("ciljna-dolzina").value);
        const prikazRezultata = document.getElementById("rezultat-izracuna");

        // Preverjanje veljavnosti vnosov
        if (isNaN(trenutna) || isNaN(ciljna) || trenutna <= 0 || ciljna <= 0) {
            prikazRezultata.textContent = "Prosimo, vnesite veljavne številke večje od 0.";
            return;
        }

        if (trenutna >= ciljna) {
            prikazRezultata.textContent = "Želena dolžina mora biti večja od trenutne dolžine!";
            return;
        }

        // Izračun: povprečna rast las je približno 1.2 cm na mesec
        const razlikaCm = ciljna - trenutna;
        const potrebniMeseci = razlikaCm / 1.2;

        prikazRezultata.textContent = `Do želene dolžine potrebuješ približno ${potrebniMeseci.toFixed(1)} mesecev rasti.`;
    });
}