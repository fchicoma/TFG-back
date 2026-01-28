const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId




const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${DB_HOST}/?appName=${DB_NAME}`

class MongoLib {
    constructor(){
        this.veces = 0;
    }

    async connect() {
            this.veces++;     
            console.log(`Connect invocado ${this.veces} veces`);

            if (MongoLib.connection != null) {
                return MongoLib.connection.db(DB_NAME);
            } else {
                try {
                    MongoLib.connection = await MongoClient.connect(MONGO_URI)
                    return MongoLib.connection.db(DB_NAME)
                } catch(e){
                    console.log('error en conexión a BBDD')
                    return e
                }
            }
    }
    async  getAllDatos(collection) {
        try {
            let db = await this.connect()
            let result = await db.collection(collection).find().toArray();
            return result;
        } catch (e) {
            return e;
        }
    }
    async addDato(collection, datos) {
         try {
                let db = await this.connect()
                let result = await db.collection(collection).insertOne(datos)
                return result.insertedId
         } catch(e){
            console.log('error al insertar')
            return e
         }

    }
    
    async modifyLitros(collection, id, litros) {
        try {
                let db = await this.connect()
                let result = await db.collection(collection).updateOne({ _id: new ObjectId(id) }, { $set: { litros: litros } }, { upsert: false })
                return result
         } catch(e){
            console.log('error al modificar')
            return e
         }  
    }

  
}

module.exports = MongoLib;

