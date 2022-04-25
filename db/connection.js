const mysql = require('mysql')

const conexion = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'PuntoVenta'
    // database:'sakila'
})
/* --------------------------------------------------------------------------------------------------------- */
conexion.connect((error)=>{
    if(error){
        console.log('error en la conexion' + error)
        return
    }
    else{
        console.log('conectado')
    }
})
/* --------------------------------------------------------------------------------------------------------- */
module.exports = conexion;