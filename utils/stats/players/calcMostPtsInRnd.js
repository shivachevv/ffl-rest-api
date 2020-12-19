const calcMostPtsInRnd = (players) => {
    return Object.keys(players)
        .map(id => {
            const playerRounds = Object.values(players[id].points)
            const best = playerRounds.sort((a, b) => {
                return b.roundPts - a.roundPts
            })[0]
            return {
                name: players[id].name,
                value: best.roundPts
            }
        })
        .sort((a, b) => {
            return b.value - a.value
        })
        .filter((x, i) => {
            if (i < 20) { return x }
        })
        

}

module.exports = calcMostPtsInRnd
