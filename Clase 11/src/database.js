import mongoose from "mongoose";

mongoose.connect('mongodb+srv://okami97backdev:coderhouse@cluster0.tfr60.mongodb.net/dao?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('conectado'))
    .catch((err) => console.log(err))