const {databaseUrl} = require('../config/config')
const axios = require('axios')

const getAllUsers = async () => {
    const response = await axios(`${databaseUrl}users.json`)
    const users = response.data
    return users
}

module.exports = getAllUsers