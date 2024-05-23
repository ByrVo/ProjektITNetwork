class Zaznam {
    constructor(jmeno, prijmeni, vek, telefon) {
        this.jmeno = jmeno;
        this.prijmeni = prijmeni;
        this.vek = vek;
        this.telefon = telefon;
    }

    toString() {
        return `Jméno: ${this.jmeno}, Příjmení: ${this.prijmeni}, Věk: ${this.vek}, Telefon: ${this.telefon}`;
    }
}
