const db = require('../db')
const Trening = require('../models/Trening')

module.exports = class TreningRepository {

    constructor(){
        this.treninzi = []
    }

    async getAll(){
        this.treninzi = []
        try{
            const sql = `SELECT trening.id AS id, trening.naziv AS naziv, trening.opis AS opis, vrsta_trening.id AS vrstaid, vrsta_trening.naziv AS vrsta FROM trening JOIN vrsta_trening ON vrsta = vrsta_trening.id`;
            const result = await db.query(sql);
            let result_rows = result.rows;
            result_rows.forEach(trening=> {
                let t = new Trening(trening.id, trening.naziv, trening.opis, trening.vrstaid, trening.vrsta)
                this.treninzi.push(t)
            });
        }
        catch(err){}
        return this.treninzi;
    }

    async remove(trening){
        try{
            const sql = `DELETE FROM trening WHERE id = ` + trening;
            await db.query(sql);
            return true
        }catch(err){
            return false
        }
    }

    async getTrening(idTrening){
        try{
            const sql = `SELECT trening.id AS id, trening.naziv AS naziv, trening.opis AS opis, vrsta_trening.id AS vrstaid, vrsta_trening.naziv AS vrsta FROM trening JOIN vrsta_trening ON vrsta = vrsta_trening.id WHERE trening.id = ` + idTrening;
            let result = await db.query(sql);
            if(result.rowCount!=1){
                return undefined
            }
            let trening = result.rows[0]
            let t = new Trening(trening.id, trening.naziv, trening.opis, trening.vrstaid, trening.vrsta)
            return t
        }catch(err){
            return undefined
        }
    }

    async edit(id, naziv, opis, idVrsta){
        try{
            let  sql = `UPDATE trening SET naziv = '` + naziv + `', opis = '` + opis + `', vrsta = ` + idVrsta +  ` WHERE id = ` + id;
            await db.query(sql);
            return true;
        }catch(err){
            return false
        }
    }
}
