const express = require('express')
const knex = require('./knex/knex.js')
const app = express()
const PORT = 3333
const HOST = '0.0.0.0'

app.get('/', (req, res) => {
    res.send("Hello world!")
})

app.listen(PORT, HOST, () => {
    console.log(`Server started at ${PORT}`)
})