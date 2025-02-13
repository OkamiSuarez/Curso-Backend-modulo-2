// se instala npm i passport junto con la estrategia elegida
// npm i passport passport-local
// importamos los modulos
import passport from "passport";
import local from "passport-local"

import UserModel from "../models/user.model.js";
import { createHash, isValidPassword } from "../utils/hashBcrypt.js";
import { create } from "connect-mongo";

const localStrategy = local.Strategy;

const initializePassport = () =>{
    passport.use("register", new localStrategy({
        passReqToCallback:true,
        // le permite acceder al objeto request con esta configuracion
        usernameField: "email"
    }, async (req,username, password,done)=>{
        const {first_name,last_name,email,age,password} = req.body
        try {
            // verificamos si ya existe un registro con ese email 
            let user = await UserModel.findOne({email})
            if(user) return done(null,false)
                // si no existe un usuario con ese email en mi base de datos, se crea un registro nuevo 
            let newUser={
                first_name,
                last_name,
                email,
                age,
                password:createHash(password)
            }

            const result = await UserModel.create(newUser)
            return done(null,result)

        } catch (error) {
            return done(error)
        }
    }))
    // se agrega otra estrategia para el login 
    passport.use("login", new localStrategy({
        usernameField:"email"
    },async(email,password,done)=>{
        try {
            // se busca el user por el email
            const user = await UserModel.findOne({email})
            if(!user){
                console.log('este usuario no existe, nos estan robando')
                return done(null,false)
            }
            if(!isValidPassword(password,user)) return done(null,false)
        } catch (error) {
            return done(error)
        }
    }))

    // tenemos que serializar y deserializar usuarios 
    passport.serializeUser((user,done)=>{
        done(null,user._id)
    })
    passport.deserializeUser(async(id,done)=>{
        let user = await UserModel.findById({_id:id})
        done(null,user)
    })
}

export default initializePassport