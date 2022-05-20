const db = require('../db')
const Trening = require('../models/Trening')

module.exports = class TreningRepository {

    constructor(){
        this.treninzi = []
        this.init = false
    }

    async getAll(){
        if(this.init==false){
            try{
                const sql = `SELECT trening.id AS id, trening.naziv AS naziv, trening.opis AS opis, vrsta_trening.naziv AS vrsta FROM trening JOIN vrsta_trening ON vrsta = vrsta_trening.id`;
                const result = await db.query(sql);
                let result_rows = result.rows;
                result_rows.forEach(trening=> {
                    let t = new Trening(trening.id, trening.naziv, trening.opis, trening.vrsta)
                    this.treninzi.push(t)
                });
                this.init = true
            }
            catch(err){}
        }
        return this.treninzi;
    }

    async remove(trening){
        for(let i=0; i< this.treninzi.length; i++){
            if(trening == this.treninzi[i].id){
                this.treninzi.splice(i, 1);
                const sql = `DELETE FROM trening WHERE id = ` + trening;
                await db.query(sql);
                return true
            }
        }
        return false
    }

    getTrening(idTrening){
        for(let i=0; i< this.treninzi.length; i++){
            if(idTrening == this.treninzi[i].id){
               return this.treninzi[i]
            }
        }
        return undefined;
    }
}
