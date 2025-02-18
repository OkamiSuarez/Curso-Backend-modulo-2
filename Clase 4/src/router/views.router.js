import { Router } from "express";
const router = Router()

router.get("/login",(req,res)=>{
    // verificando si el user esta logueado 
    // if(req.session.user){
    //     return res.redirect("/profile")
    // }
    res.render("login")
})

router.get("/register",(req,res)=>{
    // verificando si el user esta logueado 
    // if(req.session.user){
    //     return res.redirect("/profile")
    // }
    res.render("register")
})

router.get("/profile",(req,res)=>{
    // verificando si el user esta logueado 
    if(!req.session.user){
        return res.redirect("/login")
    }
    res.render("profile", {user: req.session.user})
})

export default router