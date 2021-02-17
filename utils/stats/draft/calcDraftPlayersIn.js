const getCurrentRound = require("../../getCurrentRound")

const calcDraftPlayersIn = async (users) => {
    // const lastRound = await getCurrentRound()
    const lastRound = 15

    const firstRound = 1
    const result = Object.values(users)
        .filter(x => x.code)
        .map(x => {
            const draftTeam = x.rounds[`r${firstRound}`].team
            const lastTeam = x.rounds[`r${lastRound}`].team
            const playersStillIn = calcDraftStillIn(draftTeam, lastTeam)
            return {
                name: x.userTeam,
                value: playersStillIn
            }
        })
        .sort((a, b) => b.value - a.value)
    return result
}

module.exports = calcDraftPlayersIn

function calcDraftStillIn(draftTeam, lastTeam) {
    let result = 0

    for (const pos in draftTeam) {
        if (draftTeam[pos] === lastTeam[pos]) result++
    }

    return result
}