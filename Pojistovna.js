class Pojistovna {
    constructor(jazyk = "cs-CZ") {
        this.zaznamy = [];
        this.jazyk = jazyk;

        this.jmenoInput = document.getElementById("name");
        this.prijmeniInput = document.getElementById("surname");
        this.vekInput = document.getElementById("age");
        this.telefonInput = document.getElementById("phone");
        this.ulozTlacitko = document.getElementById("add");
        this.ulozZmenyTlacitko = document.getElementById("save");

        this._nastavUdalost();
        this.nactiZaznamy();
        this.vypisZaznamy();
    }

    _nastavUdalost() {
        this.ulozTlacitko.onclick = (event) => {
            event.preventDefault(); // Zabránit výchozímu odeslání formuláře

            const jmeno = this.jmenoInput.value;
            const prijmeni = this.prijmeniInput.value;
            const vek = this.vekInput.value;
            const telefon = this.telefonInput.value;

            if (jmeno && prijmeni && vek && telefon) {
                const zaznam = new Zaznam(jmeno, prijmeni, vek, telefon);
                this.zaznamy.push(zaznam);
                this.ulozZaznamy();
                this.vypisZaznamy();
            } else {
                alert("Vyplňte všechny údaje");
            }
        };

        this.ulozZmenyTlacitko.onclick = (event) => {
            event.preventDefault(); // Zabránit výchozímu odeslání formuláře

            const jmeno = this.jmenoInput.value;
            const prijmeni = this.prijmeniInput.value;
            const vek = this.vekInput.value;
            const telefon = this.telefonInput.value;

            if (jmeno && prijmeni && vek && telefon !== null) {
                this.zaznamy[this.editIndex] = new Zaznam(jmeno, prijmeni, vek, telefon);
                this.editIndex = null;
                this.ulozZaznamy();
                this.vypisZaznamy();
                this.smazFormular();
            } else {
                alert("Vyplňte všechna pole");
            }
        };
    }

    ulozZaznamy() {
        localStorage.setItem("zaznamy", JSON.stringify(this.zaznamy));
    }

    nactiZaznamy() {
        const ulozeneZaznamy = localStorage.getItem("zaznamy");
        if (ulozeneZaznamy) {
            this.zaznamy = JSON.parse(ulozeneZaznamy);
        }
    }

    vypisZaznamy() {
        const tableBody = document.getElementById("peopleTableBody");
        tableBody.innerHTML = ""; // Vyčistit stávající obsah tabulky

        // Projdeme záznamy v opačném pořadí, abychom měli nejnovější záznamy na začátku tabulky
        for (let i = this.zaznamy.length - 1; i >= 0; i--) {
            const zaznam = this.zaznamy[i];
            const radek = tableBody.insertRow(); // Vložení řádku na začátek tabulky

            // Vložení jednotlivých buněk s daty záznamu
            radek.insertCell(0).innerText = `${zaznam.jmeno} ${zaznam.prijmeni}`;
            radek.insertCell(1).innerText = zaznam.vek;
            radek.insertCell(2).innerText = zaznam.telefon;

            // Přidání tlačítka pro mazání
            const smazBunku = radek.insertCell(3);
            const smazTlacitko = document.createElement("button");
            smazTlacitko.innerText = "Smazat";
            smazTlacitko.className = "btn btn-danger btn-sm";
            smazTlacitko.onclick = () => this.smazatZaznam(i); // Použití indexu v opačném pořadí
            smazBunku.appendChild(smazTlacitko);

            // Přidání tlačítka pro editaci
            const editujBunku = radek.insertCell(4);
            const editujTlacitko = document.createElement("button");
            editujTlacitko.innerText = "Editovat";
            editujTlacitko.className = "btn btn-warning btn-sm";
            editujTlacitko.onclick = () => this.editovatZaznam(i); // Použití indexu v opačném pořadí
            editujBunku.appendChild(editujTlacitko);
        }
    }

    smazatZaznam(index) {
        this.zaznamy.splice(index, 1); // Odstranit záznam ze seznamu
        this.ulozZaznamy(); // Aktualizovat uložené záznamy
        this.vypisZaznamy(); // Aktualizovat tabulku
    }

    editovatZaznam(index) {
        const zaznam = this.zaznamy[index];
        this.jmenoInput.value = zaznam.jmeno;
        this.prijmeniInput.value = zaznam.prijmeni;
        this.vekInput.value = zaznam.vek;
        this.telefonInput.value = zaznam.telefon;
        this.editIndex = index;
        this.ulozTlacitko.style.display = 'none';
        this.ulozZmenyTlacitko.style.display = 'block';
    }

    //Vyčištění formuláře
    smazFormular() {
        this.jmenoInput.value = '';
        this.prijmeniInput.value = '';
        this.vekInput.value = '';
        this.telefonInput.value = '';
        this.ulozTlacitko.style.display = 'block';
        this.ulozZmenyTlacitko.style.display = 'none';
    }
}



