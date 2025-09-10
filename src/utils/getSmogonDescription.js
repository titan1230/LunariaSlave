function getSmogonDescription(smogonData) {
    if (!smogonData) return "No data available.";

    const { ability, item, moves, evs, nature, teratypes } = smogonData;

    const abilityText = Array.isArray(ability) ? `**Ability:** ${ability.join(" / ")}\n` : `**Ability:** ${ability}\n`;
    const itemText = Array.isArray(item) ? `**Item:** ${item.join(" / ")}\n` : `**Item:** ${item}\n`;
    const movesText = moves && moves.length > 0 ? `**Moves:**\n- ${moves.map(move => Array.isArray(move) ? move.join(" / ") : move).join("\n- ")}\n` : "";
    
    const evsText = Object.entries(evs)
        .map(([key, value]) => `${key}: ${value}`)
        .join(" | ");
    const evsLine = evsText ? `**EVs:** ${evsText}\n` : "";

    const natureText = Array.isArray(nature) ? `**Nature:** ${nature.join(" / ")}\n` : `**Nature:** ${nature}\n`;
    const teraTypesText = teratypes ? Array.isArray(teratypes) ? `**Tera Type:** ${teratypes.join(" / ")}\n` : `**Tera Type:** ${teratypes}\n` : "";

    return `${abilityText}${itemText}${movesText}${evsLine}${natureText}${teraTypesText}`.trim();
}

module.exports = { getSmogonDescription };