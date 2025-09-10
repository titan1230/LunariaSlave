const fs = require("fs");

async function loadSets() {

  for (let gen = 1; gen <= 9; gen++) {
    const cacheFile = process.cwd() + `/sets/gen${gen}_sets.json`;

    // If cached file exists, load from disk
    if (fs.existsSync(cacheFile)) {
      const data = fs.readFileSync(cacheFile, "utf-8");
      return JSON.parse(data);
    }

    // Otherwise, fetch online
    const url = `https://pkmn.github.io/smogon/data/sets/gen${gen}.json`;
    const res = await fetch(url);
    const data = await res.json();

    // Save to disk for future use
    fs.writeFileSync(cacheFile, JSON.stringify(data, null, 2));
  }
}

async function refreshSet(gen) {
  const cacheFile = process.cwd() + `/sets/gen${gen}_sets.json`;

  // If cached file exists, load from disk
  if (fs.existsSync(cacheFile)) {
    const data = fs.readFileSync(cacheFile, "utf-8");
    return JSON.parse(data);
  }

  // Otherwise, fetch online
  const url = `https://pkmn.github.io/smogon/data/sets/gen${gen}.json`;
  const res = await fetch(url);
  const data = await res.json();

  // Save to disk for future use
  fs.writeFileSync(cacheFile, JSON.stringify(data, null, 2));
}

module.exports = {
  loadSets,
  refreshSet,
};