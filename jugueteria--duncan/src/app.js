import express from "express";
const app = express()
const PUERTO = 8080
import './database.js'
import jugueteRouter from "./routes/juguetes.router.js"

// middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    res.send("hola")
})

// rutas
app.use("/juguetes",jugueteRouter)

app.listen(PUERTO,()=>console.log('escuchando el puerto ' + PUERTO))