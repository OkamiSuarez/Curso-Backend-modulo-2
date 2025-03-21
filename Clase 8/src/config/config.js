// npm i dotenv

import dotenv from "dotenv"
import program from "../utils/commander.js"

// guardo si es desarrollo o produccion
const {mode} = program.opts()

dotenv.config({
    path: mode === "produccion" ? "./.env.produccion" : "./.env.desarrollo"
})

const configObject = {
    puerto: process.env.PUERTO,
    mongo_url: process.env.MONGO_URL
}
export default configObject