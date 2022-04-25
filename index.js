const express = require('express')
const { json } = require('express/lib/response')
const app = express()
const cors = require('cors')
const session = require('express-session')
const dotEnv = require('dotenv')
const cnx = require('./db/connection')
let port = 3000
// app.use(cors)
/* --------------------------------------------------------------------------------------------------------- */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
app.set('view engine', 'ejs');
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))
//configuracion de archivos estaticos 
app.use(express.static('public'));
app.get('/',(req,res)=>{
    res.render('index.ejs')
})
/* --------------------------------------------------------------------------------------------------------- */
app.get('/data', (req,res)=>{
    cnx.query('select * from producto;',(error,results)=>{
        if(error){
            console.log('Error en la consulta'+error)
        }
        else{
            res.json(results)
        }
    })
})
app.post('/user',(req,res)=>{
    let username = 'caja1'
    let password = 'caja1'
    console.log(req.body)
    // console.log(username,password)
    cnx.query('select usuario, contrasenia, tipo from usuarios where usuario = ? and contrasenia =?',[username,password],(error,results)=>{
        if(error){
            console.log('Error'+ error)
        }
        else{
            if(results.length > 0){
                res.json(results)
                // console.log(results)
            }
            else{
                res.json(false)
            }
        }
    })
})
/* --------------------------------------------------------------------------------------------------------- */
app.get('/login',(req,res)=>{
    res.render('login.ejs')
})
/* --------------------------------------------------------------------------------------------------------- */
app.listen(port,()=>console.log(`Server on port ${port}`))