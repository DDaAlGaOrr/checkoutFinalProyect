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
fetch('http://localhost:3000/data', )
    .then(response => response.json())
    .then(data => {
        console.log(data)
        data.forEach(element => {
            const card = `
                              <div class="col-lg-4 mb-3">
                                    <div class="card h-100">
                                        <img src="..." class="card-img-top" alt="...">
                                        <div class="card-body">
                                        <h5 class="card-title">${element.nombre}</h5>
                                        <p class="card-text">Precio: ${element.precio_venta}</p>
                                        <a href="" class=" btn btn-primary mt-2">Ver detalles</a>
                                        <!-- <a href="" class=" btn btn-success mt-2">Añadir al carrito </a> -->
                                        <a href="" class=" btn btn-success mt-2">Comprar</a>
                                    </div>
                                </div>
                            </div><!-- /.col-lg-4 -->`
            feedDisplay.insertAdjacentHTML("beforeend", card)
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