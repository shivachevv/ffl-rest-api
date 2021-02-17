const getCurrentRound = require("../../getCurrentRound")
const roundPointsCalculator = require("../../roundPointsCalculator")

const calcDraftOriginal = async (league, players, users) => {
    // const lastRound = await getCurrentRound()
    const lastRound = 15
    const leaguesMap = {
        'pele': '33c46ff1-1756-41a1-a80f-01b2f4fb4b3c',
        'maradona': '60e2f9e6-af52-4b5e-8918-94d9c79fd1c4',
    }
    const firstRound = 1
    const result = Object.values(users)
        .filter(x => x.league === leaguesMap[league])
        .map(x => {
            const team = x.rounds[`r${firstRound}`].team
            const value = calcTotalPts(lastRound, team, players, roundPointsCalculator)
            return {
                name: x.userTeam,
                value
            }
        })
        .sort((a, b) => b.value - a.value)

        return result
}

module.exports = calcDraftOriginal

function calcTotalPts(lastRound, team, players, roundPointsCalculator) {
    let result = 0
    for (let i = 1; i <= lastRound; i++) {
        const rndTotal = roundPointsCalculator(team, i, players)
        result += rndTotal
    }
    return result
}