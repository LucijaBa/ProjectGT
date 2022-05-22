const db = require('../db')
const Trener = require('../models/Trener')

module.exports = class TrenerRepository {

    constructor(){
        this.treneri = []
    }

    async getAll(){
        this.treneri = []
        try{
            const sql = `SELECT id, ime || ' ' || prezime as ime FROM korisnik WHERE status = 'T' OR status = 'A' `;
            const result = await db.query(sql);
            let result_rows = result.rows;
            result_rows.forEach(trener=> {
                let t = new Trener(trener.id, trener.ime)
                this.treneri.push(t)
            });
        }
        catch(err){}
        return this.treneri;
    }
}
