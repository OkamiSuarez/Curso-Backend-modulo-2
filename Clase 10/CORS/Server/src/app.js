import express from "express"
import cors from "cors"
const PORT = 8080

const app = express()
app.use(cors({
    origin: 'https://localhost:5173',
    
}))

app.get('/',(req,res)=> res.json({message:'Hola mundo'}))
app.listen(PORT, ()=> console.log('conectado al puerto '+ PORT))

