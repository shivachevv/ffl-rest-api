const calcMostCptPts = (players, users) => {
    const getCptTotal = (roundInfo, rndNumber) => {
        if (roundInfo.cpt) {
            return players[roundInfo.cpt].points[rndNumber].roundPts
        } else {
            return 0
        }
    }


    const result = Object.keys(users)
        .filter(uid => {
            if (users[uid].code) {
                return uid
            }
        })
        .reduce((acc, id) => {
            const user = users[id]

            const cptTotal = Object.entries(user.rounds)
                .reduce((acc, rnd) => {
                    return acc + getCptTotal(rnd[1], rnd[0])
                }, 0)
            acc.push({
                name: user.userTeam,
                value: cptTotal
            })

            return acc
        }, [])
        .sort((a,b)=>{
            return Number(b.value) - Number(a.value)
        })

    // .sort((a, b) => {
    //     return b.userBest - a.userBest
    // })
    return result
}

module.exports = calcMostCptPts
