const mysql = require('mysql2')

const conexion = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: 'Pa$$w0rd',
    database: 'productosdb'
});

conexion.connect((error)=>{
    if (error){
        throw error
    } else {
        console.log("Conexion exitosa a la base de datos");
    }
})

module.exports=conexion;

