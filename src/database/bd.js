// Configurando conexão com o banco de dados
const Pool = require('pg').Pool
const db = new Pool({
    user: 'postgres',
    password: '5718',
    host: 'localhost',
    port: 5432,
    database: 'ecoleta'
})

module.exports = db