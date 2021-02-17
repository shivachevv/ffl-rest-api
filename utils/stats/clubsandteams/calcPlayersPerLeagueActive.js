const getCurrentRound = require('../../getCurrentRound')

const calcPlayersPerLeagueActive = async (league, players, users) => {

    const leaguesMap = {
        'pele': '33c46ff1-1756-41a1-a80f-01b2f4fb4b3c',
        'maradona': '60e2f9e6-af52-4b5e-8918-94d9c79fd1c4',
        'total': undefined
    }
    // const lastRound = await getCurrentRound()
    const lastRound = 15
    const activePlayers = Object.values(users)
        .filter(x => {
            if (leaguesMap[league]) {
                return x.code > 0 && x.league === leaguesMap[league]
            } else { return x.code > 0 }
        })
        .map(x => Object.values(x.rounds[`r${lastRound}`].team))
        .flat()

    const uniqueActivePlayers = [...new Set(activePlayers)]

    const resultObject = uniqueActivePlayers.reduce((acc, x) => {
        const player = players[x]
        if (!acc[player.country]) acc[player.country] = 0
        acc[player.country] = acc[player.country] + 1
        return acc
    }, {})

    return Object.entries(resultObject)
        .map(x => { return { name: x[0], value: x[1] } })
        .sort((a, b) => { return b.value - a.value })

}

module.exports = calcPlayersPerLeagueActive