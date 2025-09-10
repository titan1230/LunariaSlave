function formatPokemonName(name) {
    return name
        .toLowerCase()
        .replace(/\s+/g, "-")   // spaces → hyphen
        .replace(".", "")       // remove dots like in Mr. Mime
        .replace("é", "e")      // remove accents
        .replace("'", "");      // remove apostrophes
}


async function getPokemonSprite(name) {
    const apiName = formatPokemonName(name);

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${apiName}`);
    if (!res.ok) throw new Error(`Pokémon ${name} not found`);

    const data = await res.json();
    return data.sprites.front_default; // normal sprite
}

module.exports = { getPokemonSprite };