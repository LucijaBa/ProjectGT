const {Pool} = require('pg');

const pool = new Pool({
    user: 'postgres',
	host: 'localhost',
	database: 'GT',
	password: 'bazepodataka',
	port: 5432
});

module.exports = {
    query: (text) => {
        return pool.query(text)
        .then(res => {
            console.log(res.rows[0]);
            return res})
    },
    pool: pool
}


