const express = require("express")
const server = express()

// Configurando rotas.
// Página inicial
server.get("/", (req, res) => {
    return res.sendFile("../views/index.html")
})

// Iniciar o servidor
server.listen(3000)