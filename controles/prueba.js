;
let config = require('../knexfile')
let env = 'development'
let db = require('knex')(config[env])

let getDatos = (req,res)=>{
    let tabla = req.query.tabla
    let campos = req.query.tabla
    db.select(campos).from(tabla)
    .then(resultado => {
        return res.status(200).json({
            ok: true,
            datos: resultado
        })
    })

    .catch((error) => {
        return res.status(500).json({
            ok: false,
            datos: null,
            sms: `Error del servidor ${error}`
        })
    })
}

let postDatos = (req, res) =>{
    let tabla = req.body.tabla
    let retorno = req.body.retorno
    let datos = req.body.datos
    db(tabla).returning(retorno).insert(datos)
    .then(resultado => {
        return res.status(200).json({
            ok:true,
            datos: resultado,
            mensaje: `Se insertaron los datos`
        })
    })

    .catch((error) => {
        return res.status(500).json({
            ok:false,
            datos: null,
            mensaje: `Error del servidor: ${error}`
        })
    })
}

let updateDatos = (req,res) => {
    let tabla = req.body.tabla
    let datos = req.body.tabla
    let contenedor = ''
    datos.forEach(element => {
        contenedor = element
    })
    db(tabla).where('id', contenedor.id).update(contenedor)
    .then(resultado => {
        return res.status(200).json({
            ok:true,
            datos:resultado
        })
    })

    .catch((error) => {
        return res.status(500).json({
            ok:false,
            datos: null,
            sms: `Error en el servidor ${error}`
        })
    })
}

let deleteDatos = (req,res) => {
    let tabla = req.body.tabla
    let id = req.body.id
    db(tabla).where('id', id).delete()
    .then(resultado => {
        return res.status(200).json({
            ok:true,
            datos:resultado
        })
    })

    .catch((error) => {
        return res.status(500).json({
            ok:false,
            datos: null,
            sms: `Error en el servidor ${error}`
        })
    })
}


module.exports = {
    getDatos,
    postDatos,
    updateDatos,
    deleteDatos
}