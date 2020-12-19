const calcUserBestScore = (players, users) => {
    const getTotal = (roundInfo, rndNumber) => {

        const multiplier = roundInfo.superCpt ? 3 : 2
        return Object.values(roundInfo.team).reduce((acc, id) => {
            // console.log(id);
            const total = roundInfo.cpt === id
                ?
                players[id].points[rndNumber].roundPts * multiplier
                :
                players[id].points[rndNumber].roundPts
            return acc + total
        }, 0)
    }


    const result = Object.keys(users)
        .filter(uid => {
            if (users[uid].code) {
                return uid
            }
        })
        .reduce((acc, id) => {
            const user = users[id]

            const userBest = Object.entries(user.rounds)
                .map(x => {
                    return getTotal(x[1], x[0])
                })
                .sort((a, b) => {
                    return b - a
                })[0]


            acc.push({
                name: user.userTeam,
                value: userBest
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

module.exports = calcUserBestScore
