import mongoose from "mongoose";

mongoose.connect("mongodb+srv://okami97backdev:coderhouse@cluster0.tfr60.mongodb.net/JugueteriaDuncan?retryWrites=true&w=majority&appName=Cluster0")
    .then(()=>console.log('conectado a la db'))
    .catch((error)=>console.log(error))