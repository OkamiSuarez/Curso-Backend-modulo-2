import express from "express";
const app = express()
const PUERTO = 8080
import productosRouter from "./routes/producto.router.js"
import './database.js'

// middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// rutas
app.use("/productos",productosRouter)

// listener
app.listen(PUERTO,()=> console.log('escuchando el puerto '+ PUERTO))