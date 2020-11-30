const { Router } = require('express')

const router = Router()

router.get('/players', (req, res) => {
    res
        .status(200)
        .json({
            player1: 'player1',
            player2: 'player2',
        })
})

router.post('/players/new', (req, res) => {

    const { name } = req.body

    res
        .status(201)
        .json({
            name
        })
})

module.exports = router