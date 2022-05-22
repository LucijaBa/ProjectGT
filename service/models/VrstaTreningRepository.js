const db = require('../db')
const VrstaTrening = require('../models/VrstaTrening')

module.exports = class VrstaTreningRepository {

    constructor(){
        this.vrsteTreninga = []
    }

     async getAll(){
        this.vrsteTreninga = []
        try{
            const sql = `SELECT * FROM vrsta_trening`;
            const result = await db.query(sql);
            let result_rows = result.rows;
            result_rows.forEach(vrsta_trening=> {
                let t = new VrstaTrening(vrsta_trening.id, vrsta_trening.naziv)
                this.vrsteTreninga.push(t)
            });
        }
        catch(err){}
        return this.vrsteTreninga
    }

    async add(naziv){
        try{
            const sql = `INSERT INTO vrsta_trening(naziv) VALUES('` + naziv + `') RETURNING id`;
            await db.query(sql);
            return true
        }
        catch(err){
            return false
        }
    }

    async remove(vrsta_trening){
        try{
            const sql = `DELETE FROM vrsta_trening WHERE id = ` + vrsta_trening;
            await db.query(sql);
            return true
        }catch(err){
            return false;
        }
    }

    async edit(id, naziv){
        try{
            const sql = `UPDATE vrsta_trening SET naziv = '` + naziv + `' WHERE id = ` + id;
            await db.query(sql);
            return true
        }catch(err){
            return false;
        }
    }
}
