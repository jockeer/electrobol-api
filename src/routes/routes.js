const express = require('express')
const router = express.Router()
const pool = require('../database')

//-------------ROUTES-------------------
router.get('/', function (req, res, next) {
    res.json({
        message: 'Hola'
    })
});



//----------------API---------------------------
let json = {}

router.get('/api/getUsers', async (req, res, next) => {
    let all = await pool.query('Select * from usuarios')
    json = all.rows
    // console.log(json)
    res.json(all.rows)
})


router.get('/api/verificarCliente/:ci', async (req, res, next) => {
    let all = await pool.query(`select * from cliente where ci = '${req.params.ci}'`)
    json = all.rows
    // console.log(json)
    res.json(all.rows)
})
router.get('/api/traerDetalles/:id', async (req, res, next) => {
    let all = await pool.query(`select * from detallereparacion where idreparacion = ${req.params.id}`)
    json = all.rows
    // console.log(json)
    res.json(all.rows)
})
router.put('/api/actualizarDatosElectrodomesticos/:id', async (req, res, next) => {
    let body=req.body
    let all = await pool.query(`update reparacion set estado='${body.estado}',precio=${body.precio} where id=${req.params.id}`)
    json = all.rows
    // console.log(json)
    res.json(all.rows)
})
router.get('/api/traerListaTareas/:ci', async (req, res, next) => {
    let all = await pool.query(`select re.id as "idreparacion",el.id, re.estado, re.precio, el.tipo, cl.nombre || ' ' || cl.apellido as "cliente", cl.telefono, cl.correo
                                from electrodomestico el join cliente cl
                                    on(el.idcliente = cl.id)
                                    join reparacion re
                                    on(re.idelectrodomestico = el.id)
                                    join tecnico
                                    on(tecnico.id = re.idtecnico)
                                    where tecnico.ci = '${req.params.ci}'`)
    json = all.rows
    // console.log(json)
    res.json(all.rows)
})
router.get('/api/traerInfoElectrodomestico/:id', async (req, res, next) => {
    let all = await pool.query(`select re.id, re.estado, el.detalleproblema, el.fechaingreso, re.precio, el.tipo, cl.nombre || ' ' || cl.apellido as "nombre", cl.telefono, cl.correo
                                from electrodomestico el join cliente cl
                                    on(el.idcliente = cl.id)
                                    join reparacion re
                                    on(re.idelectrodomestico = el.id)
                                    join tecnico
                                    on(tecnico.id = re.idtecnico)
                                    where el.id=${req.params.id}`)
    json = all.rows
    // console.log(json)
    res.json(all.rows)
})
router.post('/api/registrarCliente', async (req, res, next) => {
    let body = req.body
    // console.log(body)
    let all = await pool.query(`insert into cliente(ci,nombre,apellido,telefono,correo)values('${body.ci}','${body.nombre}','${body.apellido}', '${body.telefono}', '${body.correo}')`)
    json = all.rows
    // console.log(json)
    res.json(all.rows)
})
router.post('/api/registrarElectrodomestico', async (req, res, next) => {
    let body = req.body
    // console.log(body)
    let all = await pool.query(`insert into electrodomestico(tipo,detalleproblema,fechaingreso,fechasalida,idcliente) 
    values('${body.tipo}','${body.detalleproblema}','${body.fechaingreso}','${body.fechasalida}',(select id from cliente where ci = '${body.ci}'))`)
    json = all.rows
    // console.log(json)
    res.json(all.rows)
})
router.post('/api/registrarTecnico', async (req, res, next) => {
    let body = req.body
    // console.log(body)
    let all = await pool.query(`insert into tecnico(ci,nombre,apellido,telefono,correo)values('${body.ci}','${body.nombre}','${body.apellido}', '${body.telefono}', '${body.correo}')`)
    json = all.rows
    // console.log(json)
    res.json(all.rows)
})
router.post('/api/registroDetalleElectro', async (req, res, next) => {
    let body = req.body
    // console.log(body)
    let all = await pool.query(`insert into detallereparacion(fecha,detalle,idreparacion) values('${body.fecha}','${body.detalle}',${body.idreparacion})`)
    json = all.rows
    // console.log(json)
    res.json(all.rows)
})


module.exports = router