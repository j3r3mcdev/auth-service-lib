export function deepMerge(target: any, source: any): any {
  const output = { ...target };

  for (const key in source) {
    const value = source[key];

    // Règle choisie : les tableaux remplacent totalement
    if (Array.isArray(value)) {
      output[key] = [...value];
      continue;
    }

    // Merge récursif pour les objets
    if (value && typeof value === "object") {
      output[key] = deepMerge(target[key] || {}, value);
      continue;
    }

    // Valeurs simples : on écrase
    output[key] = value;
  }

  return output;
}
