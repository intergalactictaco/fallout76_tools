function getFromAmount(item, amount, totals = {}) {

    totals[item] = (totals[item] || 0) + amount;

    if (!RECIPES[item] || Object.keys(RECIPES[item]).length === 0) {
        return totals;
    }

    for (let ingredient in RECIPES[item]) {
        const needed = RECIPES[item][ingredient] * amount;
        getFromAmount(ingredient, needed, totals);
    }

    return totals;
}

function getMaxCrafteable(inventory, target) {
    let basicItems = getFromAmount(target, 1);
    let filteredInventory = Object.fromEntries(
        Object.entries(inventory).filter(([key]) => key in basicItems)
    );
    delete filteredInventory[target];
    const relevanceOrder = Object.keys(filteredInventory).sort((a, b) => b.localeCompare(a));
    console.log(BASIC_ITEMS)
    while(true) {
        relevanceOrder.forEach(key => {
            console.log(key);
        });
        console.log(relevanceOrder)
        if (1 == 1) {break}
    }
    return null;
}

const inventory = {
    a: 1,
    b: 35,
    c: 30,
    d: 34,
    e: 24,
    f: 0,
    g: 0,
    h: 0,
    i: 0,
    j: 0,
    k: 0,
    l: 0,
    m: 0
};

console.log(getMaxCrafteable(inventory, "f"));

/*
F
b: 1
c: 2
d: 2

const inventory = {
    a: 1,
    b: 34,
    c: 28,
    d: 32,
    e: 24,
    f: 1,
    g: 0,
    h: 0,
    i: 0,
    j: 0,
    k: 0,
    l: 0,
    m: 0
};

// M
const inventory = {
    a: 1,
    b: 35,
    c: 30,
    d: 34,
    e: 24,
    f: 0,
    g: 0,
    h: 0,
    i: 0,
    j: 0,
    k: 0,
    l: 0,
    m: 0
};
*/