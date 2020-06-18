const express = require("express")
const server = express()
const db = require('../src/database/bd')

// Configurar pasta pública
server.use(express.static("public"))

// Habilitando o body do formulário
server.use(express.urlencoded({ extended: true }))

// Utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

// Configurando rotas.
// Página inicial
server.get("/", (req, res) => {
    return res.render("index.html")
})

server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})

server.get("/search", (req, res) => {

    const search = req.query.search

    if(search == "") {
        return res.render("search-results.html", { total: 0 })
    }

    db.query(`SELECT * FROM places WHERE city = '${search}'`, function(err, result) {
        if(err) {
            return console.log(err)
        }
        const places = result.rows
        const total = places.length
        return res.render("search-results.html", { places, total })
    })
})

server.post("/savepoint", function(req, res) {
    const image = req.body.image
    const name = req.body.name
    const address = req.body.address
    const address2 = req.body.address2
    const state = req.body.state
    const city = req.body.city
    const items = req.body.items

    const query = `
        INSERT INTO places ("image", "name", "address", "address2", "state", "city", "items")
        VALUES ($1, $2, $3, $4, $5, $6, $7)`

    const values = [image, name, address, address2, state, city, items]
    console.log(values)

    db.query(query, values, function(err) {
        var alert
        if(err) {
            console.log(err)
            return res.send("Erro nno banco de dados!")
        }
        return res.render("create-point.html", { saved: true })
    })
})

// Iniciar o servidor
server.listen(3000)