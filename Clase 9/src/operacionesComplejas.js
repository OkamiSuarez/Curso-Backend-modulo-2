// function operacionCompleja(){
//     let resultado = 0
    
//     for(let i=0;i <5e9;i++){
//         resultado += i
//     }
//     return resultado
// }

// aplicando los cambios de la comunicacion de procesos
// se ejecutara solo cuando el padre lo pida 
process.on("message",(message)=>{
    function operacionCompleja(){
        let resultado = 0
        
        for(let i=0;i <5e9;i++){
            resultado += i
        }
        // return resultado
        process.send({resultado})
    }
})