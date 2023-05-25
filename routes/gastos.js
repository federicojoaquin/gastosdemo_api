const express = require('express');
const app = express();
const router = express.Router()
const { Client } = require('pg');
const { getGastos, setGastos, deleteGastos, putGastos } = require('../controllers/index.controllers'); 

router.get('/', getGastos); 
router.post('/', setGastos);
router.delete('/:id', deleteGastos);
router.put('/:id', putGastos);

module.exports = router; 