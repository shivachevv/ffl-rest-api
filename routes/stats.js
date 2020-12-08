const { Router } = require('express')
const { loadResourcesMid, createPlayersStatsMid } = require('../controllers/stats-controller')

const router = Router()

router.get('/', loadResourcesMid, createPlayersStatsMid, (req, res) => {

    const { stats } = req

    console.log(stats);

    res
        .status(200)
        .json({
            stats: "stats"
        })
})

module.exports = router