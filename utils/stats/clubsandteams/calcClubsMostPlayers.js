const lightenPlayers = require("../../lightenPlayers")
const getCurrentRound = require('../../getCurrentRound')


const calcClubsMostPlayers = (league, players, users) => {
    const leaguesMap = {
        'pele': '33c46ff1-1756-41a1-a80f-01b2f4fb4b3c',
        'maradona': '60e2f9e6-af52-4b5e-8918-94d9c79fd1c4',
        'total': undefined
    }
    const lastRound = await getCurrentRound()
    // const lastRound = 15

    const lightPlayers = lightenPlayers(players, users)
    const lightArray = Object.values(lightPlayers)

    let clubsObject

    if (leaguesMap[league]) {
        const activePlayers = getActivePlayers(users, leaguesMap, league, lastRound).map(x => lightPlayers[x])

        clubsObject = activePlayers.reduce((obj, player) => {
            if (!obj[player.club]) obj[player.club] = 0

            if (typeof player.points.r1.roundStats !== "string") obj[player.club] = obj[player.club] + 1

            return obj
        }, {})
    } else {

        clubsObject = lightArray.reduce((obj, player) => {
            if (!obj[player.club]) obj[player.club] = 0

            if (typeof player.points.r1.roundStats !== "string") obj[player.club] = obj[player.club] + 1

            return obj
        }, {})
    }

    return sortedTop10Clubs = Object.entries(clubsObject)
        .sort((x, y) => {
            return y[1] - x[1]
        })
        .filter((x, i) => i < 10)
        .map(x => {
            return {
                name: x[0],
                value: x[1]
            }
        })
}

function getActivePlayers(users, leaguesMap, league, lastRound) {

    const activePlayers = Object.values(users)
        .filter(x => {
            if (leaguesMap[league]) {
                return x.code > 0 && x.league === leaguesMap[league]
            } else { return x.code > 0 }
        })
        .map(x => Object.values(x.rounds[`r${lastRound}`].team))
        .flat()

    return [...new Set(activePlayers)]
}





module.exports = calcClubsMostPlayers
