

const lightenPlayers = (players, users) => {

    const teams = Object.values(users).map(x => {
        return x.rounds
    })
        .map(x => {
            return Object.values(x)
        })
        .flat()
        .map(x => {
            return Object.values(x.team)
        })
        .flat()

    const uniqueTeamPlayers = [...new Set(teams)];

    let result = {}

    Object.keys(players).forEach(id => {
        const isActive = uniqueTeamPlayers.includes(id)

        if (isActive) {
            result[id] = players[id]
        } else {
            let copy = JSON.parse(JSON.stringify(players[id]))

            for (const key in copy.points) {
                copy.points[key].roundStats = ''
            }

            result[id] = copy

        }

    })
    return result
}

module.exports = lightenPlayers