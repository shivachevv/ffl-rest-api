const { databaseUrl } = require('../config/config')
const axios = require('axios')

const getAllLeagues = async () => {
    const response = await axios(`${databaseUrl}leagues.json`)
    const users = response.data
    return users
}

module.exports = getAllLeagues