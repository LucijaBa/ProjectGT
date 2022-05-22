const db = require('../db')
module.exports = class Termin {

    constructor(id, trener, datum, vrijeme) {
        this.id = id
        this.trener = trener
        this.datum = datum
        this.vrijeme = vrijeme 
    }

    static async remove(termin){
        try{
            const sql = `DELETE FROM termin WHERE id = ` + termin;
            await db.query(sql);
            return true
        }catch(err){
            return false;
        }
    }

    static async add(idTrener, idTrening, datum, vrijeme){
        try{
            const sql = `INSERT INTO termin(idTrener, idTrening, vrijeme, datum) VALUES (` + idTrener + `, ` + idTrening + `, '` + vrijeme + `'::TIME, '` + datum + `'::DATE )`;
            await db.query(sql);
            return true
        }catch(err){
            return false;
        }
    }

    static async changeTrainer(termin, trener){
        try{
            const sql = `UPDATE termin SET idTrener = ` + trener + ` WHERE id = ` + termin;
            await db.query(sql);
            return true
        }catch(err){
            return false;
        }
    }
}