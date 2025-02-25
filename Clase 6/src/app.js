// Clase 6 ruteo avanzado y manejo de politicas

/* temas
expresiones regulares
restringiendo params
validando params
custom router
custom response  */

// expresiones regulares: actualmente ya es lo mas practico pedirselo al AI
// Son herramientas que nos permiten validar diferentes patrones en algunas cadenas de texto 
// ejemplo: Validar si el texto ingresado por el usuario corresponde a un email, nombre@dominio.com
// Ejemplo con correo 

// let correoIngresado = 'lionel@messi.com'
// let correoFalso = 'tinkiwinki'
// const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// console.log(patronCorreo.test(correoIngresado))
// console.log(patronCorreo.test(correoFalso))

// // ejemplo de numero de telefono
// // numero con el siguiente formato.(xxx) xxx-xxx
// let telefonoIngresado = "(223) 669-3878"
// let telefonoFalso = '1234'
// const patronTelefono = /\(\d{3}\) \d{3}-\d{4}/;

// console.log(patronTelefono.test(telefonoIngresado))
// console.log(patronTelefono.test(telefonoFalso))

// levantando un server
import express from "express"
import clientesRouter from "./routes/clientes.router.js"
const app = express()
const PUERTO = 8080

// middlewares
app.use(express.json())
// app.use(express.static('src/public'))
app.use(express.urlencoded({extended:true}))

// traemos la info para el CUSTOM ROUTER
import UserRouter from "./routes/user.router.js"
const userRouter = new UserRouter()

//rutas
app.use("/clientes", clientesRouter)

// nueva ruta
app.use("/users", userRouter.getRouter())

////////////////////////////////
app.get("*",(req,res)=>{
    res.status(404).send('recurso no encontrado')
})


/////////////////////////////////



// listener
app.listen(PUERTO,()=> console.log('trabajando en ' + PUERTO))