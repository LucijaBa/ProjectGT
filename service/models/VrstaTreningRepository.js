const db = require('../db')
const VrstaTrening = require('../models/VrstaTrening')

module.exports = class VrstaTreningRepository {

    constructor(){
        this.vrsteTreninga = []
        this.init = false
    }

     async populate(){
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

    async getAll(){
        if(this.init==false){
            await this.populate()
        }
        return this.vrsteTreninga;
    }

    async add(naziv){
        if(this.init==false){
            await this.populate()
        }
        try{
            const sql = `INSERT INTO vrsta_trening(naziv) VALUES('` + naziv + `') RETURNING id`;
            let result = await db.query(sql);
            let novi = new VrstaTrening(result.rows[0].id, naziv)
            this.vrsteTreninga.push(novi)
            return true
        }
        catch(err){
            return false
        }
    }

    async remove(vrsta_trening){
        if(this.init==false){
            await this.populate()
        }
        for(let i=0; i< this.vrsteTreninga.length; i++){
            if(vrsta_trening == this.vrsteTreninga[i].id){
                this.vrsteTreninga.splice(i, 1);
                const sql = `DELETE FROM vrsta_trening WHERE id = ` + vrsta_trening;
                await db.query(sql);
                return true
            }
        }
        return false
    }

    async edit(id, naziv){
        if(this.init==false){
            await this.populate()
        }
        for(let i=0; i< this.vrsteTreninga.length; i++){
            if(id == this.vrsteTreninga[i].id){
                this.vrsteTreninga[i].naziv = naziv
                const sql = `UPDATE vrsta_trening SET naziv = '` + naziv + `' WHERE id = ` + id;
                console.log(sql)
                await db.query(sql);
                return true
            }
        }
        return false
    }
}
