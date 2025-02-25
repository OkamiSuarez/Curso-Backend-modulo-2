import Router from "./router.js";

class UserRouter extends Router {
    init() {
        // aca se colocan las rutas
        this.get("/",(req,res)=>{
            // res.send('Get de usuarios')
            // res.sendSuccess('exito, ganamos')
            res.sendServerError('error del server, moriremos y chatgpt esta vivo')
        })
    }
}

export default UserRouter