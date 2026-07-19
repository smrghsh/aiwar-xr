// Joins graph nodes to rows of aiwarcloud-table.csv. CSV "Weapon" names often
// differ from node names/ids ("The Gospel (Habsora)" vs "The Gospel", rows that
// cover several systems like "Sentry-Tech, Super Aegis III, Sentry Robot"), so
// rows are indexed under normalized name variants plus a few explicit aliases.

// node id (or name) -> the CSV name it should resolve to
export const RECORD_ALIASES = {
  ARCA: "Assault Rifle Combat Application System",
  "Pantir-SM": "Pantsir-SM",
  Maven: "Maven Smart System",
  SuperAegis: "Super Aegis III",
};

export function normalizeName(value) {
  if (value === undefined || value === null) return "";
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");
}

export function nameVariants(name) {
  const variants = new Set();
  const add = (value) => {
    const trimmed = value.replace(/\s+/g, " ").trim();
    if (trimmed) variants.add(trimmed);
  };
  const withoutParens = (value) => value.replace(/\([^)]*\)/g, " ");
  // Short parentheticals like "(US)" in "Skynet (US)" collide with node ids
  // of unrelated stakeholders, so only keep acronym-length ones (AIP, DIAS, …)
  const parenContents = (value) =>
    Array.from(value.matchAll(/\(([^)]*)\)/g), (m) => m[1]).filter(
      (content) => content.trim().length >= 3
    );

  add(withoutParens(name));
  parenContents(name).forEach(add);
  for (const part of name.split(",")) {
    add(part);
    add(withoutParens(part));
    parenContents(part).forEach(add);
  }
  for (const variant of [name, ...variants]) {
    if (/^the\s+/i.test(variant)) add(variant.replace(/^the\s+/i, ""));
  }
  return variants;
}

export function buildRecordIndex(rows) {
  const index = new Map();
  const addKey = (name, row) => {
    const key = normalizeName(name);
    if (key && !index.has(key)) index.set(key, row);
  };
  // Full names first so they always win over variant keys of other rows
  for (const row of rows) addKey(row.Weapon, row);
  for (const row of rows) {
    const weapon = row.Weapon === undefined ? "" : String(row.Weapon).trim();
    if (!weapon) continue;
    for (const variant of nameVariants(weapon)) addKey(variant, row);
  }
  return index;
}

export function findRecord(index, ...candidates) {
  if (!index || index.size === 0) return null;
  for (const candidate of candidates) {
    if (!candidate) continue;
    for (const name of [candidate, RECORD_ALIASES[candidate]]) {
      if (!name) continue;
      const record = index.get(normalizeName(name));
      if (record) return record;
    }
  }
  return null;
}
