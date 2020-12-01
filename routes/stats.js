const { Router } = require('express')
const { getPlayersMid, lightPlayersMid } = require('../controllers/players-controller')
const axios = require('axios')

const router = Router()

router.get('/stats', getPlayersMid, lightPlayersMid, (req, res) => {
    console.log(5, new Date());

    const { players, cache } = req
    console.log(6, new Date());

    res
        .status(200)
        .json({
            players:'players',
            cache
        })
})

module.exports = router