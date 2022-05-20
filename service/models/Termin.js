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
}