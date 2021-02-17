const usersMap = {
    'Foolosophy Wanderers': 'qM55Gg1xhBbgB5QsWP5FvXEqQrB3',
    'Big Boys': '7tjzW3pudtWpQd5cqQzBK2uOrLo2',
    'Red Glory': 'Wh4kUmCfz6b7MpBAWSlP4v9K6sX2',
    'Cowpocalypse': 'bPMzc3E7h6OnYOZQCzGJG4otli72',
    'The Tardigrades': 'vMZTRw7JtYdN22OR7IZ6B410oIm1',
    'Bohemians': '1UEjAKUq3hU1ZaoXtTLSzkdlqWB3',
    'Trolley N10': 'k7WxaNO7bdgQipF8I2g3iOyIn0Z2',
    'Hornets': 'nsC36KbkTLeUJOzLidGqage2gL23',
    'Unchosen Ones': 'zg8NJkbTohelzFomiLZMmrHwQhJ3',
    'Pinky and de Bruyne': 'USEqk1zX3bg8saW9biddsDm9P4R2',
    'SS Lazio Chirpan': 'HXGFtVTMwyeYxkW8eVCfXw9EJEY2',
    'Atletico Plovdiv': 'UFD3ccSLkZcfOhS1gEeiGu9COng2',
    'Kar6iaka Pedestrians': 'fwWpwxGuLMUJbHIpcP5ctXdYqXr1',
    'Arbitragers': 'BXf8jQ6xiDZJlwUj1zoi0m6TDPM2',
    'Zlodeite': 'VPcWnGqQ6GXFr0w9gfOMX6FHork1',
    'Cocky Caucasians': 'iRA9PssA87f1njtVMSHYksLQNKM2',
    'FC Madrid': 'Xa0MdkBqkOM84E2bCBm1egKXZB43',
    'Smaky Team': '6VTr2lfia9auyWY568XGoglpIHQ2',
    'Cheloprachene': '6fbtewcbmdYPRngaIpYGSJue3Th2',
    'The Asses': 'rtm22gY184WAKNNwDIxHwFYycwk2',
    'Thracian Separatists': '4242f8vV7HVbiEWpBffhg5PoB9E3',
    'Opalchencite': 'EQKc4OEkbESENPKutkY208Sx54j2',
    "total": undefined
}
const calcTransfersPerPosition = (transfers, user) => {
    const allTransfers = flattenTransfers(transfers)

    if (usersMap[user]) {
        const filteredTransfers = filterTransfers(allTransfers, usersMap[user])
        const transfersPerPos = calcTransPerPos(filteredTransfers)
        console.log(user, transfersPerPos);
        return Object.values(transfersPerPos)
    }
    
    const transfersPerPos = calcTransPerPos(allTransfers)
    return Object.values(transfersPerPos)
}

module.exports = calcTransfersPerPosition

function flattenTransfers(transfers) {
    const transfersArr = Object.values(transfers)
    const flat = transfersArr
        .map(x => Object.values(x))
        .flat()
        .map(x => Object.values(x))
        .flat()
    return flat
}

function calcTransPerPos(transfers) {
    return transfers.reduce((acc, x) => {
        if (!acc[x.position]) acc[x.position] = { name: x.position, value: 0 }

        acc[x.position].value = acc[x.position].value + 1

        return acc
    }, {})
}

function filterTransfers(transfers, user) {
    return transfers.filter(x => x.team === user)
}