const express = require('express')
const { json } = require('express/lib/response')
const app = express()
const cors = require('cors')
const session = require('express-session')
const dotEnv = require('dotenv')
const cnx = require('./db/connection')
let port = 3000
/* --------------------------------------------------------------------------------------------------------- */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
app.set('view engine', 'ejs');
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
})) 
app.use(express.static('public'));
app.use(express.json({limit:'50mb'}))
app.use(express.urlencoded({limit:'50mb',extended:true}))
/* --------------------------------------------------------------------------------------------------------- */
app.get('/dashboard',(req,res)=>{
    res.render('home.ejs')
})
/* --------------------------------------------------------------------------------------------------------- */
app.get('/login',(req,res)=>{
    res.render('login.ejs')
})
/* --------------------------------------------------------------------------------------------------------- */
app.get('/caja',(req,res)=>{
    res.render('caja.ejs')
})
/* --------------------------------------------------------------------------------------------------------- */
app.get('/data',(req,res)=>{
    cnx.query('select * from producto;',(error,results)=>{
        if(error){
            console.log('Error en la consulta'+error)
        }
        else{
            res.json(results)
        }
    })
})
/* --------------------------------------------------------------------------------------------------------- */
app.post('/user',(req,res)=>{
    let username = req.body.data.username
    let password = req.body.data.password
    cnx.query('select usuario, contrasenia, tipo from usuarios where usuario = ? and contrasenia =?',[username,password],(error,results)=>{
        if(error){
            console.log('Error'+ error)
        }
        else{
            if(results.length > 0){
                const typeUser = results[0].tipo
                switch (typeUser) {
                    case "caja":
                        res.json('/caja')
                        break;
                    case "Administrador":
                        res.json('/dashboard')
                        break;
                
                    default:
                        break;
                }
                
            }
            else{
                res.json(false)
            }
        }
    })
})

/* --------------------------------------------------------------------------------------------------------- */
app.listen(port,()=>console.log(`Server on port ${port}`))