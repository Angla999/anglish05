export function getScareLevelText(level) {
  const levels = [
    "Mysigt",
    "Lite läskigt",
    "Obehagligt",
    "Skräckinjagande",
    "Ren terror"
  ];
  return levels[level - 1];
}

export async function fetchData(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Fel vid hämtning");
    return await res.json();
  } catch (err) {
    throw err;
  }
}