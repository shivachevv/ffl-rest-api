const calcBestNonDraft = (players, users) => {
    const firstRound = 1
    const draftPlayers = calcDraftPlayers(users, firstRound)

    const everyoneElse = calcEveryoneElse(users, draftPlayers)

    const top10 = calcTop10(everyoneElse, players)
    return top10
}

module.exports = calcBestNonDraft

function calcTop10(playersArr, players) {
    return playersArr.map(id => {
        if (players[id]) {
            const playerRounds = Object.values(players[id].points)
            const total = playerRounds.reduce((acc, rnd) => {
                return acc + rnd.roundPts
            }, 0)
            return {
                name: players[id].name,
                value: total
            }
        }
    })
        .sort((a, b) => {
            return b.value - a.value
        })
        .filter((x, i) => {
            if (i < 10) { return x }
        })
}

function calcEveryoneElse(users, draft) {
    const pickedPlayers = Object.values(users).map(x => {
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

    const uniquePicked = [...new Set(pickedPlayers)];
    return uniquePicked.filter(x => !draft.includes(x))
}

function calcDraftPlayers(users, firstRound) {
    return Object.values(users)
        .filter(x => x.code)
        .reduce((acc, x) => {
            const team = Object.values(x.rounds[`r${firstRound}`].team)
            const copy = [...acc, ...team]
            const uniqueCopy = [...new Set(copy)];
            return uniqueCopy
        }, [])
}

// function calcBestPick(lastRound, team, players) {
//     let result = Object.entries(team).map(x => {
//         const id = x[1]
//         let total = 0
//         for (let i = 1; i <= lastRound; i++) {
//             const rndTotal = players[id].points[`r${i}`].roundPts
//             total += rndTotal
//         }
//         return {
//             name: players[id].name,
//             total
//         }
//     })
//         .sort((a, b) => b.total - a.total)

//     return result[0]
// }

// const lightenPlayers = async (players, users) => {
//     if (!users) {
//         users = await getAllUsers()
//     }
//     const a = new Date().getTime()

//     const teams = Object.values(users).map(x => {
//         return x.rounds
//     })
//         .map(x => {
//             return Object.values(x)
//         })
//         .flat()
//         .map(x => {
//             return Object.values(x.team)
//         })
//         .flat()

//     const uniqueTeamPlayers = [...new Set(teams)];

//     let result = {}

//     Object.keys(players).forEach(id => {
//         const isActive = uniqueTeamPlayers.includes(id)

//         if (isActive) {
//             result[id] = players[id]
//         } else {
//             let copy = JSON.parse(JSON.stringify(players[id]))

//             for (const key in copy.points) {
//                 copy.points[key].roundStats = ''
//             }

//             result[id] = copy

//         }

//     })
//     const b = new Date().getTime()
//     console.log(b - a);
//     return result
// }

// export default lightenPlayers