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
    let recipe = getFromAmount(target, 1);
    let filteredInventory = {};
    for(let iKey of Object.keys(inventory)) {
        filteredInventory[iKey] = inventory[iKey];
    }
    filteredInventory[target] = 0;
    let toCraft = Object.fromEntries(
        Object.keys(filteredInventory).map(key => [key, 0])
    );
    const relevanceOrder = Object.keys(filteredInventory).sort((a, b) => b.localeCompare(a));
    const maximum = 10000;
    let iterations = 0;
    while(iterations <= maximum) {
        iterations++;
        let crafteable = true;
        let tempToCraft = Object.fromEntries(
            Object.keys(toCraft).map(key => [key, 0])
        );
        let tempRecipe = Object.fromEntries(
            Object.keys(recipe).map(key => [key, recipe[key]])
        );
        for (let index = 0; index < relevanceOrder.length; index++) {
            const key = relevanceOrder[index];
            let needed = tempRecipe[key];
            let having = filteredInventory[key];
            if((needed > having) && BASIC_ITEMS.includes(key)) {
                crafteable = false;
                break;
            }
            if(having > 0) {
                if(!BASIC_ITEMS.includes(key)) {
                    let toRemove = Math.min(needed, having);
                    let resources = getFromAmount(key, toRemove);
                    filteredInventory[key] -= toRemove;
                    for (let rKey of Object.keys(resources)) {
                        tempRecipe[rKey] -= resources[rKey];
                    }
                }
            }
            if(tempRecipe[key] > 0) {
                tempToCraft[key] += tempRecipe[key];
                filteredInventory[key] -= tempRecipe[key];
            }
        }
        if(crafteable) {
            for(let cKey of Object.keys(tempToCraft)) {
                toCraft[cKey] += tempToCraft[cKey];
            }
        } else {
            break;
        }
    }
    return toCraft;
}
