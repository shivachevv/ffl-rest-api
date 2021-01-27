const {databaseUrl} = require('../config/config')
const axios = require('axios')

const getCurrentRound = async () => {
    const response = await axios(`${databaseUrl}round/currentRound.json`)
    const users = response.data
    return users
}

module.exports = getCurrentRound