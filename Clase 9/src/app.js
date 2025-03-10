/* Clase 8 proceso principal del server + GLOBAL & CHILD PROCESS 
npm i express mongoose

TEMAS
    Objeto process
    manejo de argumentos
    commande js
    variables de entorno 
    listeners
    child process
*/

/* 
    // objeto process, cada que ejecuto un node/app.js se crea en automatico un objeto llamado process el cual contiene la informacion de dicho proceso 
    // console.log(process)
    // algunos elementos importantes entonces son
    // directorio actual del proceso
    console.log(process.cwd()) 
    // obtengo el id del proceso en el sistema operativo
    console.log(process.pid)
    // obtengo el uso de la memoria en bytes
    console.log(process.memoryUsage())
    // obtengo la version
    console.log(process.version)
    // finalizar o permite salir del proceso
    process.exit()
    console.log('texto adicional')
*/

// // manejo de argumentos
// console.log(process.argv)

// levantando el server
import express from "express";
const app = express()
import configObject from "./config/config.js";
import mongoose from "mongoose";
import UserModel from "./models/usuario.model.js"

const {mongo_url,puerto} = configObject

mongoose.connect(mongo_url)
    .then(()=>console.log('conectado a la db'))
    .catch((error)=>console.log('error mortal ' + error))


app.get('/', async(req,res)=>{
    // res.send('hola que hace')
    try {
        const usuarios = await UserModel.find()
        res.send(usuarios)
    } catch (error) {
        res.status(500).send('error terrible ' + error)
    }
})

app.listen(puerto,()=> console.log('todo funciona'))





// // listeners
// // process.on() permite registrar listeners para eventos especificos en ejecucion

// // algunos de los mas conocidos 
// // exit
//     // ejecuta codigo antes de la finalizacion del proceso
// process.on("exit",(code)=>{
//     // console.log('este codigo se ejecuta antes de la finalizacion del proceso')
//     console.log('finalizamos con el siguiente codigo ' +code)
// })

// console.log('y esto cuando?')

// // uncaught exception atrapa alguna excepcion no considerada en algun catch

// // generamos un error para determinar esto

// process.on("uncaughtException",(error)=>{
//     console.log('se capturo un error ', error)
//     process.exitCode = 1
// })

// firulais()
// // esta linea sirve para registrar un error pero no reemplaza el trycatch por que en caso de error la ejecucion se detiene

// // si en algun punto se comete un error 