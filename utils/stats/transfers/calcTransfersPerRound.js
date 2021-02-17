const leagueMap = {
    'pele': '33c46ff1-1756-41a1-a80f-01b2f4fb4b3c',
    'maradona': '60e2f9e6-af52-4b5e-8918-94d9c79fd1c4',
    'all': undefined
}
const calcTransfersPerRound = (transfers, league, leagues) => {
    const allTransfers = flattenTransfers(transfers)

    if (leagueMap[league]) {
        const filteredTransfers = filterTransfers(allTransfers, leagueMap[league], leagues)
        const transfersPerRnd = calcTransPerRnd(filteredTransfers)

        return Object.values(transfersPerRnd)
    }

    const transfersPerRnd = calcTransPerRnd(allTransfers)
    return Object.values(transfersPerRnd)
}

module.exports = calcTransfersPerRound

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

function calcTransPerRnd(transfers) {
    return transfers.reduce((acc, x) => {
        if (!acc[x.round]) acc[x.round] = { name: x.round, value: 0 }

        acc[x.round].value = acc[x.round].value + 1

        return acc
    }, {})
}

function filterTransfers(transfers, league, leagues) {
    return transfers.filter(x => leagues[league].teams.includes(x.team))
}