const HUMAN_READABLE = {
    en: {
        a: "Dirty Water",
        b: "Nuclear Material",
        c: "Carnal Weeper",
        d: "Radlily",
        e: "Crystalcup",
        f: "Embergold",
        g: "Green Invader",
        h: "Starlace",
        i: "Glorybell",
        j: "Candykill",
        k: "Seesprout",
        l: "Gigablossom",
        m: "Black-Eyed Susan's soothin'",
    },
    es_la: {
        a: "Agua Sucia",
        b: "Residuos Nucleares",
        c: "Lagrima Carnal",
        d: "Radnolia",
        e: "Copa de Cristal",
        f: "Llama Dorada",
        g: "Invasora Esmeralda",
        h: "Estrella del Yermo",
        i: "Campana Gloriosa",
        j: "Marchitacea",
        k: "Brotunia",
        l: "Megaflor",
        m: "Plato Reconfortante de Susan Ojos Negros",
    }
}
const RECIPES = {
    a: {},
    b: {},
    c: {},
    d: {},
    e: {},
    f: {c: 2, d: 2, b: 1},
    g: {e: 2, d: 1, b: 1},
    h: {e: 2, c: 2, b: 1},
    i: {f: 2, g: 1, b: 1},
    j: {c: 1, i: 2, b: 1},
    k: {g: 2, h: 1, b: 1},
    l: {j: 2, i: 1, k: 1, b: 1},
    m: {a: 1, i: 1, k: 1, l: 1},
}

const BASIC_ITEMS = Object.keys(RECIPES).filter(
  key => Object.keys(RECIPES[key]).length === 0
);