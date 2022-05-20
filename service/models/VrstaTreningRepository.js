const db = require('../db')
const VrstaTrening = require('../models/VrstaTrening')

module.exports = class VrstaTreningRepository {

    constructor(){
        this.vrsteTreninga = []
        this.init = false
    }

    async getAll(){
        if(this.init==false){
            try{
                const sql = `SELECT * FROM vrsta_trening`;
                const result = await db.query(sql);
                let result_rows = result.rows;
                result_rows.forEach(vrsta_trening=> {
                    let t = new VrstaTrening(vrsta_trening.id, vrsta_trening.naziv)
                    this.vrsteTreninga.push(t)
                });
                this.init = true
            }
            catch(err){}
        }
        return this.vrsteTreninga;
    }

    async add(naziv){
        try{
            const sql = `INSERT INTO vrsta_trening(naziv) VALUES('` + naziv + `') RETURNING id`;
            let result = await db.query(sql);
            let novi = new VrstaTrening(result.id, naziv)
            this.vrsteTreninga.push(novi)
            return true
        }
        catch(err){
            return false
        }
    }
}
