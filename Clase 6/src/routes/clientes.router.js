import { Router } from "express";
const router = Router()

// // ejemplo 1 espero un nombre de producto
// router.get("/nombre/:cliente([a-z]+)",(req,res)=>{
//     // esperando un param por url, el nombre de un cliente 
//     //Que pasa si el user ingresa nums o caracteres especiales en lugar de palabras?

//     if(req.params.cliente){
//         res.send('cliente valido ' + req.params.cliente)
//     }else{
//         res.send('cliente invalido')
//     }
// })

// ejemplo con mail 
router.get("/email/:email",(req,res)=>{

    const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let email = req.params.email

    if (patronCorreo.test(email)) {
        res.send('es correcto, pasele ' + email)
    } else {
        res.send('no es correcto, afuera')
    }
})

////////////////////////////////
// validando multiples params en una query repetida
// suponiendo que al crecer la app se tiene que generar muchas rutas que reciban el mismo param por ejemplo:

// metodo get 
router.get("/nombre/:cliente([a-z]+)",(req,res)=>{
    // voy a obtener un recurso a partir del parametro cliente 
    res.send("obteniendo recurso para el cliente "+ req.params.cliente)
})

// metodo  post
router.post("/nombre/:cliente([a-z]+)",(req,res)=>{
    // voy a enviar un recurso a partir del parametro cliente 
    res.send("Enviando recurso para el cliente "+ req.params.cliente)
})

// metodo  put
router.put("/nombre/:cliente([a-z]+)",(req,res)=>{
    // voy a actualizar un recurso a partir del parametro cliente 
    res.send("Actualizando recurso para el cliente "+ req.params.cliente)
})

// metodo  delete
router.delete("/nombre/:cliente([a-z]+)",(req,res)=>{
    // voy a eliminar un recurso a partir del parametro cliente 
    res.send("eliminando recurso para el cliente "+ req.params.cliente)
})

// nos encontramos que en los 4 hay lineas iguales que se repiten lo cual es 
/* obtener el param cliente
buscar el param en la db
una vez validado, continuar con la operacion que corresponde */

// esto se simplifica creando un middleware a nivel de router llamado router.param

router.param("cliente",(req,res,next, cliente)=>{
    const clientes = ['firulais','lionel','pepe']

    if(clientes.includes(cliente)){
        req.cliente=cliente
        next()
    }else{
        res.status(404).send("cliente no encontrado")
    }
})


export default router