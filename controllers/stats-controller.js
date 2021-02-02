const getAllPlayers = require('../utils/getAllPlayers')
const getAllUsers = require('../utils/getAllUsers')
const calcPlayersBestCaptainEfficiency = require('../utils/stats/players/calcPlayersBestCaptainEfficiency')
const calcPlayersTop10 = require('../utils/stats/players/calcPlayersTop10')
const calcMostTimesOver15 = require('../utils/stats/players/calcMostTimesOver15')
const calcMostPtsInRnd = require('../utils/stats/players/calcMostPtsInRnd')
const calcUserBestScore = require('../utils/stats/players/calcUserBestScore')
const calcMostCptPts = require('../utils/stats/players/calcMostCptPts')
const deleteStats = require('../utils/stats/deleteStats')
const uploadNewStats = require('../utils/stats/uploadNewStats')

// Comment 2 lines bellow when in prod mode
// const players = require('../tempdata/players.json')
// const users = require('../tempdata/users.json')
const calcClubsMostPlayers = require('../utils/stats/clubsandteams/calcClubsMostPlayers')
const calcPlayersPerLeagueActive = require('../utils/stats/clubsandteams/calcPlayersPerLeagueActive')
const calcPlayersTop100 = require('../utils/stats/clubsandteams/calcPlayersTop100')
const calcTeamsByLeague = require('../utils/stats/clubsandteams/calcTeamsByLeague')
const calcDraftOriginal = require('../utils/stats/draft/calcDraftOriginal')
const calcDraftBestPick = require('../utils/stats/draft/calcDraftBestPick')
const calcDraftTop5 = require('../utils/stats/draft/calcDraftTop5')
const calcDraftPlayersIn = require('../utils/stats/draft/calcDraftPlayersIn')

const loadResourcesMid = async (req, res, next) => {

    // Comment 2 lines bellow when in dev mode
    const players = await getAllPlayers()
    const users = await getAllUsers()
    req.players = players
    req.users = users
    next()
}

const createPlayersStatsMid = async (req, res, next) => {
    const { players } = req
    const { users } = req

    // PLAYERS STATS
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
    const playersGermanyTop10 = calcPlayersTop10(players, 'country', 'Bundesliga')
    const playersItalyTop10 = calcPlayersTop10(players, 'country', 'Serie A')
    const playersSpainTop10 = calcPlayersTop10(players, 'country', 'La Liga')
    const playersNetherlandsTop10 = calcPlayersTop10(players, 'country', 'Eredivisie')
    const playersPortugalTop10 = calcPlayersTop10(players, 'country', 'Primeira Liga')
    const playersTurkeyTop10 = calcPlayersTop10(players, 'country', 'Superlig')
    const mostTimesOver15 = calcMostTimesOver15(players)
    const mostPtsInRnd = calcMostPtsInRnd(players)
    const userBestScore = calcUserBestScore(players, users)
    const mostCptPts = calcMostCptPts(players, users)

    // CLUBS AND USER TEAMS
    const clubsMostPlayers = await calcClubsMostPlayers('total', players, users)
    const clubsMostPlayersPele = await calcClubsMostPlayers('pele', players, users)
    const clubsMostPlayersMaradona = await calcClubsMostPlayers('maradona', players, users)
    const playersPerLeagueActive = await calcPlayersPerLeagueActive('total', players, users)
    const playersPerLeagueActivePele = await calcPlayersPerLeagueActive('pele', players, users)
    const playersPerLeagueActiveMaradona = await calcPlayersPerLeagueActive('maradona', players, users)
    const teamsPlayersTop100 = calcPlayersTop100('teams', players)
    const leaguesPlayersTop100 = calcPlayersTop100('leagues', players)
    const teamsByLeague = calcTeamsByLeague(players, users)

    // DRAFT
    const draftOriginalPele = await calcDraftOriginal('pele', players, users)
    const draftOriginalMaradona = await calcDraftOriginal('maradona', players, users)
    const draftBestPickPele = await calcDraftBestPick('pele', players, users)
    const draftBestPickMaradona = await calcDraftBestPick('maradona', players, users)
    const draftTop5Pele = await calcDraftTop5('pele', players, users)
    const draftTop5Maradona = await calcDraftTop5('maradona', players, users)
    const draftPlayersIn = await calcDraftPlayersIn(users)

    req.players = ''
    req.users = ''
    req.stats = {
        players: {
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
        },
        clubs: {
            clubsMostPlayers,
            clubsMostPlayersPele,
            clubsMostPlayersMaradona,
            playersPerLeagueActive,
            playersPerLeagueActivePele,
            playersPerLeagueActiveMaradona,
            teamsPlayersTop100,
            leaguesPlayersTop100,
            teamsByLeague
        },
        draft: {
            draftOriginalPele,
            draftOriginalMaradona,
            draftBestPickPele,
            draftBestPickMaradona,
            draftTop5Pele,
            draftTop5Maradona,
            draftPlayersIn
        }
    }
    // console.log(req.stats);
    next()
}

const deletePreviousStatsMid = async (req, res, next) => {
    await deleteStats()
    next()
}


const uploadNewStatsMid = async (req, res, next) => {
    const { stats } = req
    await uploadNewStats(stats)
    next()
}

module.exports = {
    loadResourcesMid,
    createPlayersStatsMid,
    deletePreviousStatsMid,
    uploadNewStatsMid
}