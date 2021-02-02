const getCurrentRound = require("../../getCurrentRound")

const calcDraftTop5 = async (league, players, users) => {
    const lastRound = await getCurrentRound()
    // const lastRound = 15
    const leaguesMap = {
        'pele': '33c46ff1-1756-41a1-a80f-01b2f4fb4b3c',
        'maradona': '60e2f9e6-af52-4b5e-8918-94d9c79fd1c4',
    }
    const firstRound = 1
    const result = Object.values(users)
        .filter(x => x.league === leaguesMap[league])
        .map(x => {
            const team = x.rounds[`r${firstRound}`].team
            const top5Total = calcBestPick(lastRound, team, players)
            return {
                name: x.userTeam,
                value: top5Total
            }
        })
        .sort((a, b) => b.value - a.value)
 
        return result
}

module.exports = calcDraftTop5

function calcBestPick(lastRound, team, players) {
    let result = Object.entries(team).map(x => {
        const id = x[1]
        let total = 0
        for (let i = 1; i <= lastRound; i++) {
            const rndTotal = players[id].points[`r${i}`].roundPts
            total += rndTotal
        }
        return {
            name: players[id].name,
            total
        }
    })
        .sort((a, b) => b.total - a.total)
        .reduce((acc, x, i) => {
            if (i < 5) {
                acc += x.total
            }
            return acc
        }, 0)

    return result
}