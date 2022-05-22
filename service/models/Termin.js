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
            let sql = `SELECT * FROM termin WHERE  idTrener = ` + idTrener + ` AND datum = '` + datum + `'::DATE AND vrijeme < '` + vrijeme + `'::TIME AND vrijeme + '1 hour'::INTERVAL > '` + vrijeme + `'::TIME`
            let result = await db.query(sql);
            if(result.rowCount >=1)
                return false
            sql = `SELECT * FROM termin WHERE idTrener = ` + idTrener + ` AND datum = '` + datum + `'::DATE AND vrijeme > '` + vrijeme + `'::TIME AND vrijeme - '1 hour'::INTERVAL < '` + vrijeme + `'::TIME`
            result = await db.query(sql);
            if(result.rowCount >=1)
                return false
            sql = `INSERT INTO termin(idTrener, idTrening, vrijeme, datum) VALUES (` + idTrener + `, ` + idTrening + `, '` + vrijeme + `'::TIME, '` + datum + `'::DATE )`;
            await db.query(sql);
            return true
        }catch(err){
            return false;
        }
    }

    static async changeTrainer(termin, trener){
        try{
            let sql = `SELECT * FROM termin where id = ` + termin
            let result = await db.query(sql);
            let datum = result.rows[0].datum
            let vrijeme = result.rows[0].vrijeme
            sql = `SELECT * FROM termin WHERE  idTrener = ` + trener + ` AND datum = (SELECT datum from termin where id = `+ termin + `) AND vrijeme < '` + vrijeme + `'::TIME AND vrijeme + '1 hour'::INTERVAL > '` + vrijeme + `'::TIME`
            result = await db.query(sql);
            if(result.rowCount >=1)
                return false
            sql = `SELECT * FROM termin WHERE idTrener = ` + trener + ` AND datum =  (SELECT datum from termin where id = `+ termin + `)  AND vrijeme > '` + vrijeme + `'::TIME AND vrijeme - '1 hour'::INTERVAL < '` + vrijeme + `'::TIME`
            result = await db.query(sql);
            if(result.rowCount >=1)
                return false
            sql = `UPDATE termin SET idTrener = ` + trener + ` WHERE id = ` + termin;
            await db.query(sql);
            return true
        }catch(err){
            return false;
        }
    }
}