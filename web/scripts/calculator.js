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

function getMaxCraftable(target, inventory) {
    const perUnit = getFromAmount(target, 1, {});

    let max = Infinity;

    for (let item in perUnit) {
        if (item === target) continue;

        const have = inventory[item] || 0;
        const need = perUnit[item];

        max = Math.min(max, Math.floor(have / need));
    }

    if (max === Infinity) max = 0;

    const missing = {};
    for (let item in perUnit) {
        if (item === target) continue;

        const required = perUnit[item] * (max + 1);
        const have = inventory[item] || 0;

        if (have < required) {
            missing[item] = required - have;
        }
    }

    return {
        maxCraftable: max + 1,
        missingForNext: missing
    };
}
