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
router.post('/api/registrarCliente', async (req, res, next) => {
    let body = req.body
    // console.log(body)
    let all = await pool.query(`insert into cliente(ci,nombre,apellido,telefono,correo)values('${body.ci}','${body.nombre}','${body.apellido}', '${body.telefono}', '${body.correo}')`)
    json = all.rows
    // console.log(json)
    res.json(all.rows)
})


module.exports = router