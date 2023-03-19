const express = require('express');
const app = express();
const cors = require('cors')
const { json } = require('express')

app.use(express.json())
app.use(cors())
app.use('/', require('./router'));

const puerto = process.env.PUERTO || 5000
app.listen (puerto, ()=> {
    console.log("Servidor Ok en puerto " + puerto)
});

