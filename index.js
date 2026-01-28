const express = require('express')
const cors = require('cors')
const app = express()
const datosAPI =require('./rutas/datos')


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors())

datosAPI(app)
app.use(express.static('public'))

var server = app.listen('8081', () => {
    console.log(`servidor escuchando en ${server.address().port}`)
})