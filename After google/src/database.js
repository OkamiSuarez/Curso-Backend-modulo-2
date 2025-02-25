import mongoose from "mongoose";
mongoose.connect("mongodb+srv://okami97backdev:coderhouse@cluster0.tfr60.mongodb.net/Sessions?retryWrites=true&w=majority&appName=Cluster0")
    .then(()=> console.log("Conectado con exito"))
    .catch((error)=> console.log('Houston tenemos un error ' + error))
