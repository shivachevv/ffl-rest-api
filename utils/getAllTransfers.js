const { databaseUrl } = require('../config/config')
const axios = require('axios')

const getAllTransfers = async () => {
    const response = await axios(`${databaseUrl}transfers.json`)
    const users = response.data
    return users
}

module.exports = getAllTransfers