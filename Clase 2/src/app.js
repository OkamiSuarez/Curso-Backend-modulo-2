// clase 2  cookies session y storage 2
// una sesion es un vinculo generado entre el cliente y el server 
// la data se guarda en el server pero el cliente almacena el sessionId

// Practicando memory storage, almacenaje en el espacio volatil  del server

// file  storage
// se instala el npm i session-file-store
// se inicializa  conectandose  a la sesion 

// se instala npm i connect-mongo
// se importa mongo store
// se usa a nivel middleware

import express from "express";
const app = express()
const PUERTO = 8080
import session from "express-session";
import FileStore from "session-file-store";
// no olvidar el inicializarlo
// const fileStore = FileStore(session)
import { engine } from "express-handlebars";

import MongoStore from "connect-mongo";
import "./database.js"
import viewsRouter from "./router/views.router.js";
import sessionsRouter from "./router/sessions.router.js"

// Middleware
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views","./src/views")
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(session({
    // creando una sesion con memory storage
    secret: 'secretCoder',
    resave:  true,
    saveUninitialized: true,

    // utilizando file storage
    // store: new fileStore({path: "./src/sessions", ttl: 1000, retries: 1})
    // path es la ruta  donde se guardan los archivos de sesion 
    // tltl es  time to leave
    // retries es cantidades de veces que se  intenta leer el archivo en el server 

        // utilizando mongo store
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://okami97backdev:coderhouse@cluster0.tfr60.mongodb.net/Sessions?retryWrites=true&w=majority&appName=Cluster0", ttl:100
    })
        // mongodb+srv://okami97backdev:<db_password>@cluster0.tfr60.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
}))

// rutas
app.use("/",viewsRouter)
app.use("/api/sessions", sessionsRouter)



// rutas
// app.use("/",)

// login simple de usuario 
// app.get("/login",(req,res)=>{
//     let usuario = req.query.usuario
//     req.session.usuario = usuario
//     res.send("Guardado el user mediante query")
// })

// verificando el user
// app.get("/usuario",(req,res)=>{
//     if(req.session.usuario){
//         return res.send(`El usuario registrado es ${req.session.usuario}`)
//     }
//     res.send('No hay usuario registrado, es  hora de morir')
// })

app.listen(PUERTO, ()=> console.log(`Escuchando en ${PUERTO}`))