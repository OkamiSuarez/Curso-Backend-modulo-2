import { Router } from "express"
const router = Router()
import UserModel from "../models/user.model.js"
import { createHash, isValidPassword } from "../utils/hashBcrypt.js"
import passport from "passport"
// import { generate } from "jsonwebtoken"
// import generateToken from "../utils/jsonwebtoken.js"
// import { appendFile } from "fs"
// // ruta para registrar nuevo archivo

// ruta google
router.get("/google",passport.authenticate("google",{scope:["profile","email"]}),async(req,res)=>{
    // no se necesita completar nada por que todo el trabajo lo hace passport 

})

// ruta callback
router.get("/googlecallback", passport.authenticate("google",{failerRedirect:"/login"}),async(req,res)=>{
    req.session.user = req.user
    res.redirect("profile")
})

// logout 
router.get("/logout",(req,res)=>{
    if(req.session.user){
        req.session.destroy()
    }
    res.redirect("/login")
})

export default router