const { Router } = require('express')
const { getPlayersMid, lightPlayersMid, uploadLightPlayersMid } = require('../controllers/players-controller')

const router = Router()

router.get('/', (req, res) => {
    res
        .status(200)
        .json({
            player1: 'player1',
            player2: 'player2',
        })
})

router.get('/light-upload', getPlayersMid, lightPlayersMid, uploadLightPlayersMid, (req, res) => {

    res
        .status(200)
        .send("Players updated!")
})

module.exports = router