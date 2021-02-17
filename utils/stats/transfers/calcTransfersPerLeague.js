const calcTransfersPerLeague = (transfers, leagues, users) => {
    const allTransfers = flattenTransfers(transfers)

    const transfersPerLeague = calcTransPerLeague(allTransfers, leagues, users)

    return Object.values(transfersPerLeague)
}

module.exports = calcTransfersPerLeague

function flattenTransfers(transfers) {
    const transfersArr = Object.values(transfers)
    const flat = transfersArr
        .map(x => Object.entries(x))
        .flat()
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
        const userLeagueId = users[transfer[0]].league
        const userLeagueName = leagues[userLeagueId].name
        const transfersCount = Object.keys(transfer[1]).length
        result[userLeagueName].value = result[userLeagueName].value + transfersCount
    }
    return result
}