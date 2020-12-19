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
            return b.best - a.best
        })
        .filter((x, i) => {
            if (i < 20) { return x }
        })
        .sort((a,b)=>{
            return Number(b.value) - Number(a.value)
        })

}

module.exports = calcMostPtsInRnd
