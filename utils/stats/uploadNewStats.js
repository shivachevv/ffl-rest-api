const { databaseUrl } = require('../../config/config')
const axios = require('axios')

const uploadNewStats = async (stats) => {
    try {
        const response = await axios.patch(`${databaseUrl}stats.json`, stats)
        return
    } catch (error) {
        console.log("Error in uploading new stats" + error);
    }
}

module.exports = uploadNewStats
