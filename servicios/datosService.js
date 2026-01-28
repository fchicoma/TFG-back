const MongoLib = require('../lib/mongo');


class DatosService{
    constructor(){
        this.collection = 'datos'
        this.mongoDB = new MongoLib()
    }

    async getDatos(){
        const datos = await this.mongoDB.getAllDatos(this.collection)
        return datos || []
    }

    async createHumedad(dato){
         const created = await this.mongoDB.addDato(this.collection, dato);
         return created || []
    }

    async updateRegistro(id, litros) {
        const mensaje = await this.mongoDB.modifyLitros(this.collection,id,litros)
        return mensaje || []
    }

} 

module.exports = DatosService