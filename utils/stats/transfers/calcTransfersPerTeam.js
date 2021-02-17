const usersMap = {
    'qM55Gg1xhBbgB5QsWP5FvXEqQrB3': 'Foolosophy Wanderers',
    '7tjzW3pudtWpQd5cqQzBK2uOrLo2': 'Big Boys',
    'Wh4kUmCfz6b7MpBAWSlP4v9K6sX2': 'Red Glory',
    'bPMzc3E7h6OnYOZQCzGJG4otli72': 'Cowpocalypse',
    'vMZTRw7JtYdN22OR7IZ6B410oIm1': 'The Tardigrades',
    '1UEjAKUq3hU1ZaoXtTLSzkdlqWB3': 'Bohemians',
    'k7WxaNO7bdgQipF8I2g3iOyIn0Z2': 'Trolley N10',
    'nsC36KbkTLeUJOzLidGqage2gL23': 'Hornets',
    'zg8NJkbTohelzFomiLZMmrHwQhJ3': 'Unchosen Ones',
    'USEqk1zX3bg8saW9biddsDm9P4R2': 'Pinky and de Bruyne',
    'HXGFtVTMwyeYxkW8eVCfXw9EJEY2': 'SS Lazio Chirpan',
    'UFD3ccSLkZcfOhS1gEeiGu9COng2': 'Atletico Plovdiv',
    'fwWpwxGuLMUJbHIpcP5ctXdYqXr1': 'Kar6iaka Pedestrians',
    'BXf8jQ6xiDZJlwUj1zoi0m6TDPM2': 'Arbitragers',
    'VPcWnGqQ6GXFr0w9gfOMX6FHork1': 'Zlodeite',
    'iRA9PssA87f1njtVMSHYksLQNKM2': 'Cocky Caucasians',
    'Xa0MdkBqkOM84E2bCBm1egKXZB43': 'FC Madrid',
    '6VTr2lfia9auyWY568XGoglpIHQ2': 'Smaky Team',
    '6fbtewcbmdYPRngaIpYGSJue3Th2': 'Cheloprachene',
    'rtm22gY184WAKNNwDIxHwFYycwk2': 'The Asses',
    '4242f8vV7HVbiEWpBffhg5PoB9E3': 'Thracian Separatists',
    'EQKc4OEkbESENPKutkY208Sx54j2': 'Opalchencite'
}
const calcTransfersPerTeam = (transfers) => {
    const allTransfers = flattenTransfers(transfers)

    const transfersPerTeam = calcTransPerTeam(allTransfers, usersMap)
    return Object.values(transfersPerTeam)
}

module.exports = calcTransfersPerTeam

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

function calcTransPerTeam(transfers, usersMap) {
    return transfers.reduce((acc, x) => {
        if (!acc[x.team]) acc[x.team] = { name: usersMap[x.team], value: 0 }

        acc[x.team].value = acc[x.team].value + 1

        return acc
    }, {})
}