const calcMostTimesOver15 = (players) => {
    return Object.keys(players)
        .map(id => {
            const playerRounds = Object.values(players[id].points)
            const totalOver15 = playerRounds.reduce((acc, rnd) => {
                return Number(rnd.roundPts) >= 15 ? ++acc : acc
            }, 0)
            return {
                name: players[id].name,
                totalOver15
            }
        })
        .sort((a, b) => {
            return b.totalOver15 - a.totalOver15
        })
        .filter((x, i) => {
            if (i < 20) { return x }
        })

}

module.exports = calcMostTimesOver15
