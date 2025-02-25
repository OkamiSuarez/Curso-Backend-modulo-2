import passport from "passport";
export const passportCall = (strategy) =>{
    return async (req,res,next) =>{
        passport.authenticate(strategy,function(error,user,info){
            if(error){
                return next(error)
            }

            if(!user){
                return res.status(401).send({error: info.message ? info.message : info.toString()})
            }
            req.user = user
            next()
        })(req,res,next)
        // esto es una invocacion inmediata de la funcion middleware devuelta por passportcall
        // en js una funcion se puede invocar agregando parentesis despues de su definicion 
    }
}

// combinando un middleware de autorizacion con passport
export const authorization = (role) =>{
    return async(req,res,next)=>{
        if(req.user.role !== role){
            return res.status(403).send({error:"no tienes permiso para pasar"})
        }
        next()
    }
}