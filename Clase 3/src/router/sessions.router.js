import { Router } from "express"
const router = Router()
import UserModel from "../models/user.model.js"
import { createHash, isValidPassword } from "../utils/hashBcrypt.js"
// // ruta para registrar nuevo archivo

// router.post("/register", async(req,res)=>{
//     const {first_name,last_name,email,password,age} = req.body

//     try {
//         // verificamos  que el correo ya esta registrado 
//         const existeUsuario = await UserModel.findOne({email:email})
//         if(existeUsuario){
//             return res.status(400).send("El email ya esta registrado Rata!!")
//         }

//         // se crea un nuevo usuario 
//         // AQUI es donde se hace el hash
//         // const nuevoUsuario = await UserModel.create({first_name,last_name,email,password,age})
//         const nuevoUsuario = await UserModel.create({first_name,last_name,email,password:createHash(password),age})

//         // res.status(200).send("usuario creado con exito")
//         res.redirect("/login")
//     } catch (error) {
//         console.log(error)
//         res.send("Error fatal, todos moriremos")
//     }
// })



// version de registro usando passport
// no olvidarse de  importar passport
import passport from "passport"

router.post("/register", passport.authenticate("register",{failureRedirect:"/api/sessions/failedRegister"}), async(req,res)=>{
    // res.send("usuario registrado")
    res.redirect('/login')
})

router.get("/failedRegister",(req,res)=>{
    res.send("has tenido un error de registro, te toca morir")
})



// // ruta para hacer el login 
// router.post("/login", async(req,res)=>{
//     const {email,password} = req.body
//     try {
//         const usuario = await UserModel.findOne({email:email})

//         if(usuario){
//             // if(usuario.password === password){
//             if(isValidPassword(password,usuario)){
//                 req.session.user = {
//                     email: usuario.email,
//                     age: usuario.age,
//                     first_name: usuario.first_name,
//                     last_name: usuario.last_name
//                 }

//                 res.redirect("/profile")
//             }else{
//                 res.send("Contrasena no valida, vete hacker, no me robes")
//             }
//         }else{
//             res.status(404).send("el usuario no existe, escribe bien")
//         }
//     } catch (error) {
        
//     }
// })


//Login version passport
router.post("/login",passport.authenticate("login",{failureRedirect:"/api/sessions/faillogin"}), async(req,res)=>{
    // aqui se crea la sesion
    req.session.user ={
        first_name: req.user.first_name,
        last_name:req.user.last_name,
        age:req.user.age,
        email: req.user.email
    }
    res.redirect("/profile")
}) 

router.get("/faillogin",(req,res)=>{
    res.send('fallo el login, se suspende el invierno')
})

// logout
router.get("/logout", (req,res)=>{
    if(req.session.user){
        req.session.destroy()
    }
    res.redirect("/login")
})

export default router