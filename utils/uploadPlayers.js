const { databaseUrl } = require('../config/config')
const axios = require('axios')

const uploadPlayers = (type, players) => {
    const playersPath = type === "normal" ? "players" : "lightPlayers"
    const options = {
        method: "PATCH",
        mode: "cors",
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        headers: {
            "Content-Type": "application/json"
        }
    }
    return axios.patch(`${databaseUrl + playersPath}.json`, players, options)
}

module.exports = uploadPlayers