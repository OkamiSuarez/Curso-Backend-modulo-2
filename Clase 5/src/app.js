// passport avanzado clase 5
import express from "express";
const app = express()
const PUERTO = 8080

import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import passport from "passport"; 
import initializePassport from  "./config/passport.config.js"
import { authorization, passportCall } from "./utils/utils.js";

// middlewares
app.use(express.static("./src/public"))
app.use(express.json)
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(passport.initialize())
initializePassport()

// ruta
app.post("/login",(req,res)=>{
    let {usuario, pass} = req.body

    if (usuario === "tinky" & pass === "winki"){
        // si las credenciales coinciden creamos el token
        // let token = jwt.sign({usuario, pass}, "coderhouse", {expiresIn:"24h"})

        let token = jwt.sign({usuario, pass}, "coderhouse", {expiresIn:"24h"})
        // el texto string de arriba es la secret password pero por ahora lo hardcodeamos
        // lo enviamos ahora
        // res.send({mensaje:'login exitoso', token})

        // Enviamos desde la cookie 
        // esta vez en lugar de enviar el token directamente se coloca en una cookie para almacenarla del lado del cliente 
        res.cookie("coderCookieToken",token,{maxAge: 60*60*1000, httpOnly:true}).send({mensaje:'login  exitoso la vida sonrie '})
        // esa expresion matematica es  una hora en milisegundos 
        // el http only bloquea la cookie y la pasa solo al protocolo http 
    }else{
        res.send('login fallido')
    }
})

// se genera una ruta privada que requiere que estemos identificados 
// app.get("/current", passport.authenticate("jwt",{session:false}), (req,res)=>{
//     res.send(req.user)

// })

// utilizando el passportcall
app.get("/current", passportCall("jwt",{session:false}), authorization("admin"), (req,res)=>{
    res.send(req.user)

})


// listen
app.listen(PUERTO,()=> console.log('escuchando en ' + PUERTO))