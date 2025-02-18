import { Router } from "express"
const router = Router()
import UserModel from "../models/user.model.js"
import { createHash, isValidPassword } from "../utils/hashBcrypt.js"
// import { generate } from "jsonwebtoken"
import generateToken from "../utils/jsonwebtoken.js"
// import { appendFile } from "fs"
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
// import passport from "passport"

// router.post("/register", passport.authenticate("register",{failureRedirect:"/api/sessions/failedRegister"}), async(req,res)=>{
//     // res.send("usuario registrado")
//     res.redirect('/login')
// })

// router.get("/failedRegister",(req,res)=>{
//     res.send("has tenido un error de registro, te toca morir")
// })



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
// router.post("/login",passport.authenticate("login",{failureRedirect:"/api/sessions/faillogin"}), async(req,res)=>{
//     // aqui se crea la sesion
//     req.session.user ={
//         first_name: req.user.first_name,
//         last_name:req.user.last_name,
//         age:req.user.age,
//         email: req.user.email
//     }
//     res.redirect("/profile")
// }) 

// router.get("/faillogin",(req,res)=>{
//     res.send('fallo el login, se suspende el invierno')
// })

// logout
// router.get("/logout", (req,res)=>{
//     if(req.session.user){
//         req.session.destroy()
//     }
//     res.redirect("/login")
// })

// VERSION CON GITHUB

// router.get("/github", passport.authenticate('github',{scope:["user:email"]}),async(req,res)=>{

// })

// router.get("/githubcallback",passport.authenticate("github",{failureRedirect:"/login"}), async(req,res)=>{
//     // la estrategia nos retormara el usuario entonces lo agregamos a nuestro objeto de session
//     req.session.user = req.user;
//     res.redirect("/profile")
// })

////////////////////////
// Registro con json webtoken 
router.post("/register", async(req,res)=>{
    const {first_name,last_name,email,password,age} = req.body

    try {
        const existeUsuario = await UserModel.findOne({email:email})
        if(existeUsuario){
            return res.status(400).send("El email ya esta usado en la DB, muchos errores, falta estudiar")
        }
        // creando un nuevo user
        const nuevoUsuario = await UserModel.create({
            first_name,
            last_name,
            email,
            password:createHash(password),
            age
        })

        // generando un token 
        const token = generateToken({
            id:nuevoUsuario._id, 
            nombre: nuevoUsuario.first_name, 
            apellido:nuevoUsuario.last_name
        })
        res.status(201).send({mensaje:"usuario creado con exito",token})
    } catch (error) {
        console.log(error)
        res.status(500).send('Dedicate a otra cosa')
    }
})

// login para json webtoken
router.use("/login", async(req,res)=>{
    const {email, password} = req.body

    try {
        const usuario = await UserModel.findOne({email:email})

        if(!usuario){
            return res.status(200).send('esto no existe')
        }

        if(!isValidPassword(password,usuario)){
            return res.status(401).send('vete hacker malvado')
        }

        // si la contrase;a es correcta generamos el token 
        const token = generateToken({
            id:usuario._id,
            first_name: usuario.first_name,
            apellido:usuario.last_name,
            email:usuario.email
        })

        res.send({mensaje:'todo perfecto, se  puede pasar',token})
    } catch (error) {
        console.log(error)
        res.status(500).send('error terrible horrible')
    }
})

export default router