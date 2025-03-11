// inmmportando el juguete services
import JugueteService from "../services/juguetes.services.js"
import JugueteService from "../services/juguetes.services.js"
const jugueteService = new JugueteService()

class JugueteController{
    async crearJuguete(req,res){
        try {
            const juguete = await jugueteService.crearJuguete(req.body)
            res.json(juguete)
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
    async obtenerJuguetes(req,res){
        try {
            const juguetes.
        } catch (error) {
            
        }
    }
}

export default JugueteController