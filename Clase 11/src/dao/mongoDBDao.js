import ProductoModel from "../models/producto.model.js"

class MongoDBDao {
    async crearProducto(datosProducto){
        try {
            const producto = new ProductoModel(datosProducto)
            return await producto.save()
        } catch (error) {
            throw new Error('error al crear el producto en mongodb')
        }
    }

    async obtenerProductos(){
        try {
            return await ProductoModel.find()
        } catch (error) {
            throw new Error('Error al obtener los productos de mongodb')
        }
    }
}

export default MongoDBDao