const { databaseUrl } = require('../config/config')
const axios = require('axios')

const getAllPlayers = async () => {

    const response = await axios(`${databaseUrl}players.json`)
    const players = response.data

    return players
}

module.exports = getAllPlayers