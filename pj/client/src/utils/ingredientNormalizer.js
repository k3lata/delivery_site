const ingredientAliases = {
    egg: ["egg", "eggs", "яйцо", "яйца", "яичный", "яичные"],
    peanut: ["peanut", "peanuts", "арахис"],
    milk: ["milk", "молоко"],
    cheese: ["cheese", "сыр", "сыры"],
    chicken: ["chicken", "курица", "куриный", "куриное"],
    beef: ["beef", "говядина"],
    pork: ["pork", "свинина"],
    fish: ["fish", "рыба"],
    seafood: ["seafood", "морепродукты", "креветки", "shrimp", "prawn", "prawns"],
    mushroom: ["mushroom", "mushrooms", "гриб", "грибы"],
    onion: ["onion", "лук"],
    garlic: ["garlic", "чеснок"],
    tomato: ["tomato", "tomatoes", "томат", "томаты", "помидор", "помидоры"],
    nuts: ["nut", "nuts", "орех", "орехи"],
    soy: ["soy", "soya", "соя"],
    gluten: ["gluten", "глютен"],
    rice: ["rice", "рис"],
    cucumber: ["cucumber", "огурец", "огурцы"],
    potato: ["potato", "potatoes", "картофель", "картошка"],
    lamb: ["lamb", "баранина"],
    spicy: ["spicy", "острое", "острый", "острая", "острые"],
  };
  
  function cleanText(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/ё/g, "е")
      .replace(/[^\p{L}\p{N}\s,.-]/gu, " ")
      .replace(/\s+/g, " ")
      .trim();
  }
  
  export function normalizeIngredientWord(word) {
    const cleaned = cleanText(word);
  
    for (const [key, aliases] of Object.entries(ingredientAliases)) {
      if (aliases.includes(cleaned)) {
        return key;
      }
    }
  
    return cleaned;
  }
  
  export function parseExcludedIngredients(input) {
    return String(input || "")
      .split(",")
      .map((item) => normalizeIngredientWord(item))
      .filter(Boolean);
  }
  
  export function normalizeDishIngredients(ingredients) {
    if (!ingredients) return [];
  
    let list = [];
  
    if (Array.isArray(ingredients)) {
      list = ingredients;
    } else if (typeof ingredients === "string") {
      list = ingredients.split(",");
    } else {
      return [];
    }
  
    return list
      .map((item) => normalizeIngredientWord(item))
      .filter(Boolean);
  }