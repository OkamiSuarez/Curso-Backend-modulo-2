import mongoose from "mongoose";

const urlMongo = ("mongodb+srv://okami97backdev:coderhouse@cluster0.tfr60.mongodb.net/PruebaSingleton?retryWrites=true&w=majority&appName=Cluster0")

class ConnectionDB{
    static #instance;
    constructor(){
        mongoose.connect(urlMongo)
    }

    static getInstance(){
        if(ConnectionDB.#instance){
            console.log("ya hay una instancia de la DB")
            return ConnectionDB.#instance
        }else{
            this.#instance = new ConnectionDB()
            console.log('se ha creado una instancia')
            return this.#instance
        }

    }
}

export {ConnectionDB}