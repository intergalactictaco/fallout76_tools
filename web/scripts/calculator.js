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
