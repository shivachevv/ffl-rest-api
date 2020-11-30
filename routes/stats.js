const { Router } = require('express')
const { getPlayersMid, lightPlayersMid } = require('../controllers/players-controller')
const axios = require('axios')

const router = Router()

router.get('/stats', getPlayersMid, lightPlayersMid, (req, res) => {

    const { players } = req

    res
        .status(200)
        .json({
            players
        })
})

module.exports = router