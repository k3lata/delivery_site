import { useMemo, useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import useCart from '../../hooks/useCart';
import { cuisines, dishes } from '../../data/menuData';
import formatPrice from '../../utils/formatPrice';

import {
  parseExcludedIngredients,
  normalizeDishIngredients
} from "../../utils/ingredientNormalizer";

export default function MenuBuilderPage() {
  const { addToCart } = useCart();
  const [budget, setBudget] = useState('12000');
  const [cuisine, setCuisine] = useState('');
  const [category, setCategory] = useState('');
  const [texture, setTexture] = useState('');
  const [excludedIngredients, setExcludedIngredients] = useState('');
  const [maxItems, setMaxItems] = useState('3');
  const [generatedMenu, setGeneratedMenu] = useState([]);
  const [summary, setSummary] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

  const excludedList = useMemo(
    () => excludedIngredients.split(',').map((item) => item.trim().toLowerCase()).filter(Boolean),
    [excludedIngredients]
  );
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
    rice: ["rice", "рис"],
    potato: ["potato", "potatoes", "картофель", "картошка"],
  };
  
  const normalizeIngredient = (value) => {
    const cleaned = String(value || "")
      .toLowerCase()
      .replace(/ё/g, "е")
      .trim();
  
    for (const [key, aliases] of Object.entries(ingredientAliases)) {
      if (aliases.includes(cleaned)) {
        return key;
      }
    }
  
    return cleaned;
  };

  const handleGenerate = () => {
    let filtered = [...dishes];
  
    const normalizedExcludedList = excludedList.map((item) =>
      normalizeIngredient(item)
    );
  
    if (cuisine) {
      filtered = filtered.filter((dish) => dish.cuisine === cuisine);
    }
  
    if (category) {
      filtered = filtered.filter((dish) => dish.category === category);
    }
  
    if (texture) {
      filtered = filtered.filter(
        (dish) => dish.texture === texture || dish.category === texture
      );
    }
  
    if (excludedList.length) {
      const normalizedExcluded = excludedList.map((item) =>
        normalizeIngredient(item)
      );
    
      filtered = filtered.filter((dish) => {
        const dishIngredients = Array.isArray(dish.ingredients)
          ? dish.ingredients
          : String(dish.ingredients || "").split(",");
    
        const normalizedDishIngredients = dishIngredients.map((item) =>
          normalizeIngredient(item)
        );
    
        return !normalizedDishIngredients.some((ingredient) =>
          normalizedExcluded.includes(ingredient)
        );
      });
    }
  
    filtered.sort((a, b) => a.price - b.price);
  
    const result = [];
    let total = 0;
  
    for (const dish of filtered) {
      if (result.length >= Number(maxItems || 3)) break;
  
      if (total + dish.price <= Number(budget || 0)) {
        result.push(dish);
        total += dish.price;
      }
    }
  
    setGeneratedMenu(result);
    setTotalPrice(total);
  };

  const addWholeMenu = () => generatedMenu.forEach((dish) => addToCart(dish));

  return (
    <PageWrapper>
      <section className="menu-builder-page">
        <div className="container menu-builder-grid">
          <div className="builder-panel paper-panel">
            <h1>Составление меню</h1>

            <div className="builder-fields">
              <label>
                <span>Бюджет</span>
                <input value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="Например 12000" />
              </label>

              <label>
                <span>Кухня</span>
                <select value={cuisine} onChange={(e) => setCuisine(e.target.value)}>
                  <option value="">Любая кухня</option>
                  {cuisines.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}
                </select>
              </label>

              <label>
                <span>Тип блюда</span>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="">Любой тип</option>
                  <option value="main">Плотные блюда</option>
                  <option value="liquid">Жидкие блюда</option>
                  <option value="drink">Напитки</option>
                  <option value="dessert">Десерты</option>
                </select>
              </label>

              <label>
                <span>Плотность</span>
                <select value={texture} onChange={(e) => setTexture(e.target.value)}>
                  <option value="">Любая</option>
                  <option value="light">Лёгкие</option>
                  <option value="hearty">Сытные</option>
                </select>
              </label>

              <label>
                <span>Сколько позиций максимум</span>
                <input value={maxItems} onChange={(e) => setMaxItems(e.target.value)} placeholder="3" />
              </label>

              <label>
                <span>Исключить ингредиенты</span>
                <input value={excludedIngredients} onChange={(e) => setExcludedIngredients(e.target.value)} placeholder="например яйца, арахис" />
              </label>

              <button type="button" className="primary-button" onClick={handleGenerate}>Составить меню</button>
            </div>
          </div>

          <div className="builder-panel book-panel">
            <div className="book-panel__header">
              <h2>Результат</h2>
              {generatedMenu.length > 0 && <button type="button" className="secondary-button" onClick={addWholeMenu}>Добавить всё в корзину</button>}
            </div>
            <p className="builder-summary">{summary || 'Пока меню не собрано.'}</p>

            <div className="generated-list">
              {generatedMenu.map((dish) => (
                <article key={dish._id} className="generated-card">
                  <img src={dish.image} alt={dish.name} />
                  <div>
                    <p className="dish-meta">{dish.cuisine} · {dish.category}</p>
                    <h3>{dish.name}</h3>
                    <p>{dish.description}</p>
                    <div className="generated-card__bottom">
                      <strong>{formatPrice(dish.price)}</strong>
                      <button type="button" className="primary-button small" onClick={() => addToCart(dish)}>Добавить</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
