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
const players = require('../tempdata/players.json')
const users = require('../tempdata/users.json')
const calcClubsMostPlayers = require('../utils/stats/clubsandteams/calcClubsMostPlayers')
const calcPlayersPerLeagueActive = require('../utils/stats/clubsandteams/calcPlayersPerLeagueActive')
const calcPlayersTop100 = require('../utils/stats/clubsandteams/calcPlayersTop100')
const calcTeamsByLeague = require('../utils/stats/clubsandteams/calcTeamsByLeague')
const calcDraftOriginal = require('../utils/stats/draft/calcDraftOriginal')
const calcDraftBestPick = require('../utils/stats/draft/calcDraftBestPick')
const calcDraftTop5 = require('../utils/stats/draft/calcDraftTop5')
const calcDraftPlayersIn = require('../utils/stats/draft/calcDraftPlayersIn')
const calcBestNonDraft = require('../utils/stats/transfers/calcBestNonDraft')
const getAllLeagues = require('../utils/getAllLeagues')
const getAllTransfers = require('../utils/getAllTransfers')
const calcTransfersPerLeague = require('../utils/stats/transfers/calcTransfersPerLeague')
const calcTransfersPerPosition = require('../utils/stats/transfers/calcTransfersPerPosition')
const calcTransfersPerRound = require('../utils/stats/transfers/calcTransfersPerRound')
const calcTransfersPerTeam = require('../utils/stats/transfers/calcTransfersPerTeam')

const loadResourcesMid = async (req, res, next) => {

    // Comment 2 lines bellow when in dev mode
    // const players = await getAllPlayers()
    // const users = await getAllUsers()
    const transfers = await getAllTransfers()
    const leagues = await getAllLeagues()
    req.players = players
    req.users = users
    req.transfers = transfers
    req.leagues = leagues
    next()
}

const createPlayersStatsMid = async (req, res, next) => {
    const { players, users, leagues, transfers } = req

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

    // TRANSFERS
    const bestNonDraft = calcBestNonDraft(players, users)
    const transfersPerLeague = calcTransfersPerLeague(transfers, leagues, users)
    const transfersPerPosition = calcTransfersPerPosition(transfers, 'total')

    const transfersPerPositionFoolosophyWanderers = calcTransfersPerPosition(transfers, 'Foolosophy Wanderers')
    const transfersPerPositionBigBoys = calcTransfersPerPosition(transfers, 'Big Boys')
    const transfersPerPositionRedGlory = calcTransfersPerPosition(transfers, 'Red Glory')
    const transfersPerPositionCowpocalypse = calcTransfersPerPosition(transfers, 'Cowpocalypse')
    const transfersPerPositionTheTardigrades = calcTransfersPerPosition(transfers, 'The Tardigrades')
    const transfersPerPositionBohemians = calcTransfersPerPosition(transfers, 'Bohemians')
    const transfersPerPositionTrolleyN10 = calcTransfersPerPosition(transfers, 'Trolley N10')
    const transfersPerPositionHornets = calcTransfersPerPosition(transfers, 'Hornets')
    const transfersPerPositionUnchosenOnes = calcTransfersPerPosition(transfers, 'Unchosen Ones')
    const transfersPerPositionPinkyanddeBruyne = calcTransfersPerPosition(transfers, 'Pinky and de Bruyne')
    const transfersPerPositionSSLazioChirpan = calcTransfersPerPosition(transfers, 'SS Lazio Chirpan')
    const transfersPerPositionAtleticoPlovdiv = calcTransfersPerPosition(transfers, 'Atletico Plovdiv')
    const transfersPerPositionKar6iakaPedestrians = calcTransfersPerPosition(transfers, 'Kar6iaka Pedestrians')
    const transfersPerPositionArbitragers = calcTransfersPerPosition(transfers, 'Arbitragers')
    const transfersPerPositionZlodeite = calcTransfersPerPosition(transfers, 'Zlodeite')
    const transfersPerPositionCockyCaucasians = calcTransfersPerPosition(transfers, 'Cocky Caucasians')
    const transfersPerPositionFCMadrid = calcTransfersPerPosition(transfers, 'FC Madrid')
    const transfersPerPositionSmakyTeam = calcTransfersPerPosition(transfers, 'Smaky Team')
    const transfersPerPositionCheloprachene = calcTransfersPerPosition(transfers, 'Cheloprachene')
    const transfersPerPositionTheAsses = calcTransfersPerPosition(transfers, 'The Asses')
    const transfersPerPositionThracianSeparatists = calcTransfersPerPosition(transfers, 'Thracian Separatists')
    const transfersPerPositionOpalchencite = calcTransfersPerPosition(transfers, 'Opalchencite')

    const transfersPerRound = calcTransfersPerRound(transfers, 'all', undefined)
    const transfersPerRoundPele = calcTransfersPerRound(transfers, 'pele', leagues)
    const transfersPerRoundMaradona = calcTransfersPerRound(transfers, 'maradona', leagues)
    const transfersPerTeam = calcTransfersPerTeam(transfers)

    req.players = ''
    req.users = ''
    req.transfers = ''
    req.leagues = ''
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
        },
        transfers: {
            bestNonDraft,
            transfersPerLeague,
            transfersPerPosition,
            transfersPerPositionFoolosophyWanderers,
            transfersPerPositionBigBoys,
            transfersPerPositionRedGlory,
            transfersPerPositionCowpocalypse,
            transfersPerPositionTheTardigrades,
            transfersPerPositionBohemians,
            transfersPerPositionTrolleyN10,
            transfersPerPositionHornets,
            transfersPerPositionUnchosenOnes,
            transfersPerPositionPinkyanddeBruyne,
            transfersPerPositionSSLazioChirpan,
            transfersPerPositionAtleticoPlovdiv,
            transfersPerPositionKar6iakaPedestrians,
            transfersPerPositionArbitragers,
            transfersPerPositionZlodeite,
            transfersPerPositionCockyCaucasians,
            transfersPerPositionFCMadrid,
            transfersPerPositionSmakyTeam,
            transfersPerPositionCheloprachene,
            transfersPerPositionTheAsses,
            transfersPerPositionThracianSeparatists,
            transfersPerPositionOpalchencite,
            transfersPerRound,
            transfersPerRoundPele,
            transfersPerRoundMaradona,
            transfersPerTeam
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