// const { response } = require("express")
// const StrategyManager = require("./designPatternStrategy/strategyMng") 
// const LoginForm = require("./designPatternStrategy/strategyLoginForm")
import StrategyManager from "./designPatternStrategy/strategyMng.js"
import LoginForm from "./designPatternStrategy/strategyLoginForm.js"
/* --------------------------------------------------------------------------------------------------------- */
let form = document.getElementById('form')
const feedDisplay = document.querySelector('#feed')
const strategyManager = new StrategyManager
/* --------------------------------------------------------------------------------------------------------- */
fetch('http://localhost:3000/data',)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        data.forEach(element => {
            const card = `<h2>Nombre: ${element.nombre} Precio: ${element.precio_venta} Peso:${element.cantidad}${element.medida}</h2> `
            feedDisplay.insertAdjacentHTML("beforeend",card)
        });
    })
/* --------------------------------------------------------------------------------------------------------- */
    form.addEventListener("submit", (e) => {
        e.preventDefault()
        // console.log(datos)
        const loginForm = new LoginForm
        strategyManager.strategy = loginForm
        strategyManager.doAction(form)
    })    

