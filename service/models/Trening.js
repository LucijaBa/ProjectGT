const db = require('../db')
const Termin = require('../models/Termin')

module.exports = class Trening {

    constructor(id, naziv, opis, vrsta) {
        this.id = id
        this.naziv = naziv
        this.opis = opis
        this.vrsta = vrsta 
    }

    static async getAllTermins(trening){
        let termini = []
        try{
            const sql = `SELECT termin.id, vrijeme, datum, korisnik.ime || ' ' || korisnik.prezime AS trener FROM termin  JOIN korisnik ON idTrener = korisnik.id WHERE idTrening = ` + trening;
            const result = await db.query(sql);
            let result_rows = result.rows;
            result_rows.forEach(termin=> {
                let t = new Termin(termin.id, termin.trener, termin.datum, termin.vrijeme)
                termini.push(t)
            });

        }catch(err){}
        return termini;
    }

    static async addNewTermin(idTrener, idTrening, datum, vrijeme){

    }

    static async changeTrainer(trening, trener){

    }

    static async changeTrainingData(){

    }
}