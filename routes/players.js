const { Router } = require('express')
const { getPlayersMid, lightPlayersMid, uploadLightPlayersMid } = require('../controllers/players-controller')

const router = Router()

router.get('/', (req, res) => {
    console.log(req.protocol + '://' + req.get('host') + req.originalUrl);
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
        .json({
            result: "Players updated!"
        })
})

module.exports = router