const db = require('../db')

module.exports = class TrenerRepository {

     async remove(termin){
        try{
            const sql = `DELETE FROM termin WHERE id = ` + termin;
            await db.query(sql);
            return true
        }catch(err){
            return false;
        }
    }

     async add(idTrener, idTrening, datum, vrijeme){
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


}
