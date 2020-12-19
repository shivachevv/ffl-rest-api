

const calcPlayersTop10 = (players, filterProp, filterPropValue) => {
    return Object.keys(players)
        .filter(id => {
            if (players[id][filterProp] === filterPropValue) {
                return id
            }
            if (filterProp === 'none') {
                return id
            }

        })
        .map(id => {
            const playerRounds = Object.values(players[id].points)
            const total = playerRounds.reduce((acc, rnd) => {
                return acc + rnd.roundPts
            }, 0)
            return {
                name: players[id].name,
                value: total
            }
        })
        .sort((a, b) => {
            return b.value - a.value
        })
        .filter((x, i) => {
            if (i < 10) { return x }
        })
        

}

module.exports = calcPlayersTop10
