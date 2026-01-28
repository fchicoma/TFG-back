const express = require('express')
const DatosService = require('../servicios/datosService')
const enviarCorreo = require('../utils/mail'); 


function datosAPI(app){
    const router = express.Router()

    app.use('/api/datos', router)
    const datosService = new DatosService()

    router.get('/', async function (req, res, next){
        try{
            const datos = await datosService.getDatos()
            res.status(200).json({
                data: datos,
                message: 'datos recuperados con éxito'
            })
        } catch(err){
            console.log(`se produjo un error ${err}`)
            next(err)
        } 
    })

    router.post('/', async function (req, res, next){
        try{
            const dato = req.body;
            const data = await datosService.createHumedad(req.body);
            

            if (dato.humedad < 30) {
                await enviarCorreo(
                    "⚠️ Alerta: Humedad muy baja",
                    `La humedad es ${dato.humedad}%.  Está por debajo del mínimo ideal.`,
                    "fernandochicom@gmail.com"
                );
            }
            if (dato.humedad > 75 && dato.humedad <= 85){

                 await enviarCorreo(
                    "⚠️ Alerta: Humedad pasada de lo ideal",
                    `La humedad es ${dato.humedad}%. Está por encima del máximo ideal.`,
                    "fernandochicom@gmail.com"
                    
                );
            }
                

            if (dato.humedad > 85) {

                await enviarCorreo(
                    "⚠️ Alerta: Humedad muy alta",
                    `La humedad es ${dato.humedad}%. Está demasiado alta.`,
                    "fernandochicom@gmail.com"
                    
                );
            }
            res.status(201).json({
                data,
                message: 'dato insertado correctamente'
        });
        } catch(err){
             next(err);
        }
    });

    router.put('/:id', async function (req, res, next){
        try {
            const id  = req.params.id;
            const litros = req.body.litros;

            const resultado = await datosService.updateRegistro(id, litros);
            res.status(201).json(
                {
                    data: resultado,
                    message: 'Registro actualizado correctamente'
                }
            )
        } catch (err) {
            console.log(`Error actualizando registro: ${err}`);
            next(err);
        }
    })

}

module.exports = datosAPI
