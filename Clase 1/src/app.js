// cookies

// Peque;os archivos de texto que viven en el navegador del usuario
// esta info viaja entre las peticiones del cliente y las respuestas del servidor 

// Datos que se pueden guardar
/* Preferencias del usuario de navegacion
        Modo claro, oscuro, idioma
    Nombres de usuario
    Productos o servicios deseados
    ID de las sesiones*/

// Levantando un mini server
import cookieParser from "cookie-parser";
import session from "express-session";
import express from "express";
const app = express()
const PUERTO = 8080

// middlewares
let miAltaClaveSecreta = "TinkiWinki"
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser(miAltaClaveSecreta))
app.use(session({

    secret:"secretCoder",
    resave: true,
    // resave permite mantener activa la sesion frente a la inactividad del usuario
    saveUninitialized: true
    // permite guardar cualquier sesion aun cuando el objeto de sesioin no tiene nada para contener
    }))

// rutas
app.get("/",(req,res)=>{
    res.send('Hola mundo, aguante el clima del verano')
})

app.listen(PUERTO,()=> console.log('10 grados en cdmx'))

// primero se instala el cookie parser
// se importa el cookieparser
// se usa el middleware del cookieparser
// se hace la ruta para setear la cookie
app.get("/setcookie",(req,res)=>{
    // se usa el objeto res para asignarle una cookie al cliente
    //se almacena en formato clave valor o key value
    res.cookie('coderCookie','Mi primera cookie, hola cookie',{maxAge:10000}).send("cookie seteada")
})

// leyendo el valor de la cookie
app.get("/leercookie",(req,res)=>{
    res.send(req.cookies.coderCookie)
})

// borrando una cookie
app.get('/borrarcookie',(req,res)=>{
    res.clearCookie('coderCookie').send('CookieEliminada')
})

// enviando una cookie firmada
app.get("/cookiefirmada",(req,res)=>{
    res.cookie("cookieFirmada","Esto es  un mensaje secreto",{signed:true}).send('cookie firmada enviada')
})

// recuperando la cookiefirmada
app.get('/recuperandocookiefirmada',(req,res)=>{
    // para recuperar la cookie tenemos que usar "signedCookies"
    let valorCookie = req.signedCookies.cookieFirmada
    //si el valor de la cookie se modifica, esto es false
    if(valorCookie){
        res.send("cookie recuperada" + valorCookie)
    }else{
        res.send("cookie invalida")
    }
})

// sesiones
// Podemos mantener info del cliente

// caracteristicas
/* La info que se quiere guardar se almacena  de lado del server
Del lado del cliente se crea un identificador unico para acceder a la informacion
Ruta de ejemplo de sesion*/

app.get("/session",(req,res)=>{
    // si al conectarme la sesion existe aumento el contador
    if(req.session.counter){
        req.session.counter++
        res.send("se visito el sitio : " + req.session.counter + "veces")
    }else{
        req.session.counter = 1
        res.send("bienvenidoooo")
    }
})

// para desloguear, destruimos la sesion 
app.get("/logout",(req,res)=>{
    // para eliminar datos de una variable de session, se usa request y el metodo destroyy le pasamos un callback
    req.session.destroy((error)=>{
        if(!error){
            res.send('la sesion se cerro')
        }else{
            res.send({status:"error de logout", body:error})
        }

    })  
})

// se hace un login con query
app.get("/login",(req,res)=>{
    let {usuario,pass} = req.query;
    if(usuario==="tinky"&&pass==="winky"){
        req.session.user = usuario;
        res.send('inicio de sesion exitoso')
    }else{
        res.send("Datos  incorrectos, moriremos")
    }
})

// previo a la ruta privada creamos el middleware
function auth(req,res,next){
    if(req.session.user === "tinki"){
        return next()
    }else{
        res.status(401).send("error de autorizacion")
    }
}

// ruta privada que requiere que el usuario se identifique
app.get("/privado",(req,res)=>{
    res.send("Si llegas hasta aca es por que estas logueado correctamente")
})