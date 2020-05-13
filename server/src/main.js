const express = require('express')
const router = require('./routes')
const cors = require('cors')
const PORT = 3333
const HOST = '0.0.0.0'

const app = express()

app.use(cors())
app.use(express.json())
app.use(router)

app.listen(PORT, HOST, () => {
    console.log(`Server started at ${PORT}`)
})