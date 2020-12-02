const { Router } = require('express')
const { getPlayersMid, lightPlayersMid } = require('../controllers/players-controller')
const axios = require('axios')

const router = Router()

router.get('/stats', getPlayersMid, lightPlayersMid, (req, res) => {

    const { players, cache } = req
    console.log('cache', cache);

    res
        .status(200)
        .json({
            players:'players',
            cache
        })
})

module.exports = router