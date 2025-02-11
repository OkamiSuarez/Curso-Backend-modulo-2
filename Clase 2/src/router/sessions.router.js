import { Router } from "express"
const router = Router()
import UserModel from "../models/user.model.js"

// ruta para registrar nuevo archivo

router.post("/register", async(req,res)=>{
    const {first_name,last_name,email,password,age} = req.body

    try {
        // verificamos  que el correo ya esta registrado 
        const existeUsuario = await UserModel.findOne({email:email})
        if(existeUsuario){
            return res.status(400).send("El email ya esta registrado Rata!!")
        }

        // se crea un nuevo usuario 
        const nuevoUsuario = await UserModel.create({first_name,last_name,email,password,age})

        // res.status(200).send("usuario creado con exito")
        res.redirect("/login")
    } catch (error) {
        console.log(error)
        res.send("Error fatal, todos moriremos")
    }
})

// ruta para hacer el login 
router.post("/login", async(req,res)=>{
    const {email,password} = req.body
    try {
        const usuario = await UserModel.findOne({email:email})

        if(usuario){
            if(usuario.password === password){
                req.session.user = {
                    email: usuario.email,
                    age: usuario.age,
                    first_name: usuario.first_name,
                    last_name: usuario.last_name
                }

                res.redirect("/profile")
            }else{
                res.send("Contrasena no valida, vete hacker, no me robes")
            }
        }else{
            res.status(404).send("el usuario no existe, escribe bien")
        }
    } catch (error) {
        
    }
})

// logout
router.get("/logout", (req,res)=>{
    if(req.session.user){
        req.session.destroy()
    }
    res.redirect("/login")
})

export default router