const getAllPlayers = require('../utils/getAllPlayers')
const getAllUsers = require('../utils/getAllUsers')
const calcPlayersBestCaptainEfficiency = require('../utils/stats/players/calcPlayersBestCaptainEfficiency')
const calcPlayersTop10 = require('../utils/stats/players/calcPlayersTop10')
const calcMostTimesOver15 = require('../utils/stats/players/calcMostTimesOver15')
const calcMostPtsInRnd = require('../utils/stats/players/calcMostPtsInRnd')
const calcUserBestScore = require('../utils/stats/players/calcUserBestScore')
const calcMostCptPts = require('../utils/stats/players/calcMostCptPts')

// const players = require('../tempdata/players.json')
// const users = require('../tempdata/users.json')

const loadResourcesMid = async (req, res, next) => {
    const players = await getAllPlayers()
    const users = await getAllUsers()
    req.players = players
    req.users = users
    next()
}

const createPlayersStatsMid = (req, res, next) => {
    const { players } = req
    const { users } = req

    const playersBestCaptainEfficiency = calcPlayersBestCaptainEfficiency(players, users)
    const playersTop10 = calcPlayersTop10(players, 'none')

    const playersGKTop10 = calcPlayersTop10(players, 'position', 'GK')
    const playersDLTop10 = calcPlayersTop10(players, 'position', 'DL')
    const playersDCTop10 = calcPlayersTop10(players, 'position', 'DC')
    const playersDRTop10 = calcPlayersTop10(players, 'position', 'DR')
    const playersMLTop10 = calcPlayersTop10(players, 'position', 'ML')
    const playersMCTop10 = calcPlayersTop10(players, 'position', 'MC')
    const playersMRTop10 = calcPlayersTop10(players, 'position', 'MR')
    const playersSTTop10 = calcPlayersTop10(players, 'position', 'ST')

    const playersEnglandTop10 = calcPlayersTop10(players, 'country', 'Premier League')
    const playersFranceTop10 = calcPlayersTop10(players, 'country', 'Ligue 1')
    const playersGermanyTop10 = calcPlayersTop10(players, 'country', 'Bundesligs')
    const playersItalyTop10 = calcPlayersTop10(players, 'country', 'Serie A')
    const playersSpainTop10 = calcPlayersTop10(players, 'country', 'La Liga')
    const playersNetherlandsTop10 = calcPlayersTop10(players, 'country', 'Eredivisie')
    const playersPortugalTop10 = calcPlayersTop10(players, 'country', 'Primeira Liga')
    const playersTurkeyTop10 = calcPlayersTop10(players, 'country', 'Superlig')

    const mostTimesOver15 = calcMostTimesOver15(players)
    const mostPtsInRnd = calcMostPtsInRnd(players)
    const userBestScore = calcUserBestScore(players, users)
    const mostCptPts = calcMostCptPts(players, users)

    req.players = ''
    req.users = ''
    req.stats = {
        playersBestCaptainEfficiency,
        playersTop10,
        playersGKTop10,
        playersDLTop10,
        playersDCTop10,
        playersDRTop10,
        playersMLTop10,
        playersMCTop10,
        playersMRTop10,
        playersSTTop10,
        playersEnglandTop10,
        playersFranceTop10,
        playersGermanyTop10,
        playersItalyTop10,
        playersSpainTop10,
        playersNetherlandsTop10,
        playersPortugalTop10,
        playersTurkeyTop10,
        mostTimesOver15,
        mostPtsInRnd,
        userBestScore,
        mostCptPts
    }

    next()
}

module.exports = {
    loadResourcesMid,
    createPlayersStatsMid
}