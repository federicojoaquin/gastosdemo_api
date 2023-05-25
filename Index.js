const { query } = require('express');
const express = require('express'); 
const app = express(); 
const { Client } = require('pg');
const cors = require('cors'); 
require('dotenv').config(); 

const PUERTO = process.env.PORT; 

app.listen(PUERTO, () => { 
    console.log(`El servidor está escuchando en el puerto ${PUERTO}`); 
}); 

// middlewares
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({extended: false})); 

// routers 
app.use('/gastos', require('./routes/gastos'));

