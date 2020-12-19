

const calcPlayersBestCaptainEfficiency = (players, users) => {
    const getPoints = (id, round) => {
        if (id && round) {
            return players[id].points[round].roundPts
        } else return 0
    }

    const getHighest = (team, round) => {
        return Object.values(team).map(id => {
            if (id) {
                return players[id].points[round].roundPts
            }
        })
            .sort((a, b) => {
                return Number(b) - Number(a)
            })[0]
    }

    const result = Object.keys(users)
        .filter(uid => {
            if (users[uid].code) {
                return uid
            }
        })
        .reduce((acc, id) => {
            const user = users[id]

            const userCptStats = Object.entries(user.rounds)
                .sort((a, b) => {
                    const r1 = Number(a[0].substring(1, 3))
                    const r2 = Number(b[0].substring(1, 3))
                    return r1 - r2
                })
                .reduce((acc, round) => {
                    const cpt = round[1].cpt
                    const cptPts = getPoints(cpt, round[0])
                    const highestPts = getHighest(round[1].team, round[0])

                    if (!acc.cptSum && !acc.totalSum) {
                        acc.cptSum = 0
                        acc.totalSum = 0
                    }
                    acc.cptSum = acc.cptSum + cptPts
                    acc.totalSum = acc.totalSum + highestPts
                    return acc
                }, {})


            acc.push({
                name: user.userTeam,
                value: (userCptStats.cptSum / userCptStats.totalSum * 100).toFixed(0)
            })

            return acc
        }, [])
        .sort((a,b)=>{
            return Number(b.value) - Number(a.value)
        })

    return result
}

module.exports = calcPlayersBestCaptainEfficiency
