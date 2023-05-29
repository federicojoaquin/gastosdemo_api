const { Client } = require('pg'); 
require('dotenv').config(); 

// Conexión a base de datos (ir cambiando cada día en railway)
const databaseClient = {
  user: process.env.PGUSER, 
  host: process.env.PGHOST, 
  database: process.env.PGDATABASE, 
  password: process.env.PGPASSWORD, 
  port: process.env.PGPORT,
  ssl: {
    rejectUnautorized: false,
  }
}

const getGastos = async (req, res) => { 
    
    const offset = req.query.change 
    console.log(offset); 
    const client = new Client(databaseClient); 
    
    try {
        client.connect(); 
        const response = await client.query(`select * from gastos order by gas_fecinsercion desc limit 4 offset ${offset}`); 
        client.end(); 
        res.status(200).json(response.rows);
    } catch(err) {
        console.log(err);
        res.status(500).send("Error al insertar el gasto");
    } finally {
        await client.end(); 
    }
      
}

const setGastos = async (req, res) => { 
    const { desc, monto, fecha, tipo, frec } = req.body; 

    const client = new Client(databaseClient); 

    const insert = "INSERT INTO gastos (gas_descripcion, gas_monto, gas_fecha, gas_tipo, gas_fecuencia, gas_fecinsercion) VALUES ($1, $2 ,$3, $4, $5, current_timestamp)"

    try {
    client.connect();
    const response = await client.query(insert, [desc, monto, fecha, tipo, frec]); 
    console.log(response); 
    client.end(); 
    res.send('gasto insertado')
    } catch(err) {
        console.log(err); 
        res.status(500).send("Error al insertar el gasto");
    } finally {
        await client.end(); 
    }
}

const deleteGastos = async (req, res) => {
    const id = req.params.id;
    console.log(id)
    const client = new Client(databaseClient);
  
    try {
      await client.connect();
      const result = await client.query("DELETE FROM gastos WHERE gas_id = $1", [id]);
      console.log(result.rowCount + " rows deleted");
      res.send("Gasto borrado");
    } catch (err) {
      console.error(err);
      res.status(500).send("Error al borrar el gasto");
    } finally {
      await client.end();
    }
  };

const putGastos = async (req, res) => {
    const { gas_descripcion, gas_monto, gas_fecha, gas_tipo, gas_frec } = req.body;
    const id = req.params.id; 
    console.log(req.body)
    
    const client = new Client(databaseClient);
  
    try {
      await client.connect();
      const result = await client.query("UPDATE GASTOS SET gas_descripcion = $1, gas_monto = $2, gas_fecha = $3, gas_tipo = $4 ,gas_fecuencia = $5 WHERE gas_id = $6", [gas_descripcion, gas_monto, gas_fecha, gas_tipo, gas_frec, id]);
      console.log(result.rowCount + " filas actualizadas");
      res.send("Gasto modificado");
    } catch (err) {
      console.error(err);
      res.status(500).send("Error al modificar el gasto");
    } finally {
      await client.end();
    }
};

module.exports = { 
    getGastos, 
    setGastos,  
    deleteGastos, 
    putGastos
}