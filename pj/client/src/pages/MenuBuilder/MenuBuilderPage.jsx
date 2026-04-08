import { useMemo, useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import useCart from '../../hooks/useCart';
import { cuisines, dishes } from '../../data/menuData';
import formatPrice from '../../utils/formatPrice';

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

  const excludedList = useMemo(
    () => excludedIngredients.split(',').map((item) => item.trim().toLowerCase()).filter(Boolean),
    [excludedIngredients]
  );

  const handleGenerate = () => {
    let filtered = [...dishes];

    if (cuisine) filtered = filtered.filter((dish) => dish.cuisine === cuisine);
    if (category) filtered = filtered.filter((dish) => dish.category === category);
    if (texture) filtered = filtered.filter((dish) => dish.texture === texture || dish.category === texture);
    if (excludedList.length) {
      filtered = filtered.filter((dish) => !dish.ingredients.some((ingredient) => excludedList.includes(String(ingredient).toLowerCase())));
    }

    filtered.sort((a, b) => a.price - b.price);

    const result = [];
    let total = 0;
    for (const dish of filtered) {
      if (result.length >= Number(maxItems || 0 || 3)) break;
      if (total + dish.price <= Number(budget || 0)) {
        result.push(dish);
        total += dish.price;
      }
    }

    setGeneratedMenu(result);
    setSummary(
      result.length
        ? `Подобрано ${result.length} блюд на ${formatPrice(total)}.`
        : 'По этим параметрам ничего не подошло. Попробуй увеличить бюджет или убрать часть фильтров.'
    );
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
                <input value={excludedIngredients} onChange={(e) => setExcludedIngredients(e.target.value)} placeholder="например eggs, peanuts" />
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
