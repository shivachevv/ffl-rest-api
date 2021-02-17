const calcTransfersPerLeague = (transfers, leagues, users) => {
    const allTransfers = flattenTransfers(transfers)

    const transfersPerLeague = calcTransPerLeague(allTransfers, leagues, users)

    return Object.values(transfersPerLeague)
}

module.exports = calcTransfersPerLeague

function flattenTransfers(transfers) {
    const transfersArr = Object.values(transfers)
    const flat = transfersArr
        .map(x => Object.values(x))
        .flat()
        .map(x => Object.values(x))
        .flat()
        .filter(x => x.status === 'confirmed')
    return flat
}

function calcTransPerLeague(transfers, leagues, users) {
    let result = Object.values(leagues).reduce((acc, x) => {
        const league = {
            name: x.name,
            value: 0
        }
        acc[x.name] = league
        return acc
    }, {})
    for (const transfer of transfers) {
        const userLeagueId = users[transfer.team].league
        const userLeagueName = leagues[userLeagueId].name
        const transfersCount = 1
        result[userLeagueName].value = result[userLeagueName].value + transfersCount
    }
    return result
}