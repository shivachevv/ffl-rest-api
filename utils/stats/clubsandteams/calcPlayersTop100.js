
// const getCurrentRound = require('../../getCurrentRound')

const calcPlayersTop100 = (type, players) => {

    const typesMap = {
        'teams': {
            prop: 'club',
            count: 10
        },
        'leagues': {
            prop: 'country',
            count: 8
        },
    }
    // const lastRound = await getCurrentRound()
    const top100 = Object.values(players)
        .sort((a, b) => {
            return calcTotalPts(b) - calcTotalPts(a)
        })
        .filter((x, i) => i < 100)

    let result = {}

    const { prop } = typesMap[type]
    for (const player of top100) {
        if (!result[player[prop]]) result[player[prop]] = 0
        result[player[prop]] = result[player[prop]] + 1
    }

    const { count } = typesMap[type]
    return Object.entries(result)
        .map(x => { return { name: x[0], value: x[1] } })
        .sort((a, b) => b.value - a.value)
        .filter((x, i) => i < count)

}

function calcTotalPts(player) {
    return Object.values(player.points).reduce((acc, x) => {
        return acc + Number(x.roundPts)
    }, 0)
}

module.exports = calcPlayersTop100