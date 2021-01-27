const lightenPlayers = require("../../lightenPlayers")

const calcTeamsByLeague = (players, users) => {

    const lightPlayers = lightenPlayers(players, users)
    const lightArray = Object.values(lightPlayers)

    let clubsObject = lightArray.reduce((obj, player) => {
            if (!obj[player.country]) obj[player.country] = []

            if (typeof player.points.r1.roundStats !== "string") {
                obj[player.country].push(player.club)
                obj[player.country] = [...new Set(obj[player.country])];
            }

            return obj
        }, {})
    
        console.log(clubsObject);
    return Object.entries(clubsObject)
        .sort((x, y) => {
            return y[1].length - x[1].length
        })
        .map(x => {
            return {
                name: x[0],
                value: x[1].length
            }
        })
}





module.exports = calcTeamsByLeague
