import { Router } from "express";
const router = Router()

import JugueteController from "../controllers/juguetes.controller.js";
const jugueteController = new JugueteController

// importar el contolador 
router.post("/",jugueteController.crearJuguete)
router.get("/",jugueteController.obtenerJuguetes)

export default router