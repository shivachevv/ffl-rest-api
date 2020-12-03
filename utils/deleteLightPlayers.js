const axios = require('axios')
const { databaseUrl } = require('../config/config')

const deleteLightPlayers = () => {
    console.log('players deleted');
    return axios.delete(`${databaseUrl}lightPlayers.json`)
   
}

module.exports = deleteLightPlayers