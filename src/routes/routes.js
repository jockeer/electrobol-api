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


router.get('/api/obtenerSectores', async (req, res, next) => {
    let all = await pool.query(`select * from sector`)
    json = all.rows
    // console.log(json)
    res.json(all.rows)
})
router.get('/api/obtenerPuesto/:id', async (req, res, next) => {
    let all = await pool.query(`select * from puesto where id=${req.params.id}`)
    json = all.rows
    // console.log(json)
    res.json(all.rows)
})


module.exports = router, json