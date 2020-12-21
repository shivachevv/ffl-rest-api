const { databaseUrl } = require('../../config/config')
const axios = require('axios')

const deleteStats = async () => {
    try {
        const response = await axios.delete(`${databaseUrl}stats.json`)
        return
    } catch (error) {
        console.log("Error in deleting old stats" + error);
    }
}

module.exports = deleteStats
