import fs from "fs"
import { json } from "stream/consumers"

class FileSystemDao {
    // metodos auxiliares
    async leerArchivo(){
        const data =await fs.promises.readFile("./src/data/productos.json")
        return JSON.parse(data)
    }
    async escribirArchivo(data){
        await fs.promises .writeFile("./src/data.productos.json", JSON.stringify(data,null,2))
    }
    async crearProducto(datosProductos){
        try {
            // leer el archivo
            const productos = await this.leerArchivo()
            // se agrega el nuevo producto
            productos.push(datosProductos)

            // escribimos el archivo actualizandolo
            await this.escribirArchivo(productos)

            return datosProductos
        } catch (error) {
            throw new Error('error al crear un producto en archivo')
        }
    }

    async obtenerProductos(){
        try {
            // leemos el archivo 
            const productos = await this.leerArchivo()
            return productos
        } catch (error) {
            throw new Error('error al recibir productos en el archivo')
        }
    }
}

export default FileSystemDao