import express from "express";
const router = express.Router()

class Router {
    constructor(){
        this.router = router;
        this.init()
    }

    getRouter(){
        //devuelve el objeto router o una instancia de router
        return this.router
    }

    get(path,...callbacks){
        //Definimos una ruta get en router 
        // el primer argumento es la ruta 
        // los siguientes son los 
        this.router.get(path, this.generateCustomResponse, this.applyCallbacks(callbacks))
    }

    applyCallbacks(callbacks){
        return callbacks.map(callback=> async(req,res,next) =>{
            try {
                await callback(req,res,next)
            } catch (error) {
                res.status(500).send("error mortal")
            }
        })
    }

    // custom responses
    generateCustomResponse(req,res,next){
        res.sendSuccess = payload => res.send({status:'success',payload})
        res.sendServerError = error => res.status(500).send({
            status:'error', error
        })
        res.sendUserError = error => res.status(400).send({status:'error terrible', error})
        next()
    }
}

export default Router