// trabajando  con passport jwt
// se instala npm i passport passport-jwt
// recordar instalar cookie parser 

import passport from "passport";
import jwt from "passport-jwt";

const JWTStrategy = jwt.Strategy //core de la estrategia 
const ExtractJWT = jwt.ExtractJwt //extractor de jwt ya sea de header, cookies,etc

const initializePassport = () =>{
    passport.use("jwt", new JWTStrategy({
        jwtFromRequest:ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey:"coderhouse"
        }, async(jwt_payload,done)=>{
            try {
                return done(null,  jwt_payload)
            } catch (error) {
                return done(error)
            }
        }))
}
// creando el cookie extractor

const cookieExtractor = (req) =>{
    let token = null
    // corroboramos que hay alguna  cookie que tomar
    if(req&&req.cookies){
        token = req.cookies["coderCookieToken"]
        // tomamos la cookie que necesitamos 
    }
    return token
}

// no olvidarse de configurar la  app

export default initializePassport