const { Router } = require('express')
const { loadResourcesMid, createPlayersStatsMid, deletePreviousStatsMid, uploadNewStatsMid } = require('../controllers/stats-controller')

const router = Router()

router.get('/', loadResourcesMid, createPlayersStatsMid, deletePreviousStatsMid, uploadNewStatsMid, (req, res) => {

    // const { stats } = req
    res
        .status(200)
        .json({
            status:"updated"
        })
})

module.exports = router