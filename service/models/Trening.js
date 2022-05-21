const db = require('../db')
const Termin = require('../models/Termin')

module.exports = class Trening {

    constructor(id, naziv, opis, vrstaId, vrsta) {
        this.id = id
        this.naziv = naziv
        this.opis = opis
        this.vrstaId = vrstaId
        this.vrsta = vrsta 
    }

    static async getAllTermins(trening){
        let termini = []
        try{
            const sql = `SELECT termin.id, vrijeme, datum, korisnik.id AS trener FROM termin  JOIN korisnik ON idTrener = korisnik.id WHERE idTrening = ` + trening;
            const result = await db.query(sql);
            let result_rows = result.rows;
            result_rows.forEach(termin=> {
                let t = new Termin(termin.id, termin.trener, termin.datum, termin.vrijeme)
                termini.push(t)
            });

        }catch(err){}
        return termini;
    }
}