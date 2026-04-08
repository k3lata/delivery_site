import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import PageWrapper from '../../components/layout/PageWrapper';
import useCart from '../../hooks/useCart';
import formatPrice from '../../utils/formatPrice';
import { getCuisineById, getDishesByCuisine } from '../../data/menuData';
import './CuisinePage.css';

export default function CuisinePage() {
  const { cuisineId } = useParams();
  const { addToCart } = useCart();

  const cuisine = useMemo(() => getCuisineById(cuisineId), [cuisineId]);
  const cuisineDishes = useMemo(() => getDishesByCuisine(cuisineId), [cuisineId]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [cuisineId]);

  if (!cuisine) {
    return (
      <PageWrapper>
        <section className="container page-spacer">
          <h1>Кухня не найдена</h1>
        </section>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div
        className="cuisine-page cuisine-page--tiles"
        style={{
          '--cuisine-bg': `url(${cuisine.tileImage})`,
          '--cuisine-tint': cuisine.theme,
        }}
      >
        {cuisineDishes.map((dish, index) => {
          const isLeft = index % 2 === 0;

          return (
            <section key={dish._id} className="cuisine-screen">
              <div className="cuisine-screen__bg" />

              <div
                className={`container cuisine-screen__grid ${
                  isLeft ? 'cuisine-screen__grid--left' : 'cuisine-screen__grid--right'
                }`}
              >
                <div className="cuisine-plate-wrap">
                  <div className="cuisine-plate-shadow" />
                  <img src={dish.image} alt={dish.name} className="cuisine-plate" />
                </div>

                <div className="cuisine-copy menu-card">
                  <div className="menu-card__frame" />

                  <p className="dish-meta">
                    {cuisine.title} · {dish.category} · {dish.texture}
                  </p>

                  <h2>{dish.name}</h2>

                  <p className="dish-description">{dish.description}</p>

                  <p className="dish-ingredients-text">
                    <span>Состав:</span> {dish.ingredients.join(', ')}
                  </p>

                  <div className="dish-bottom-row">
                    <strong>{formatPrice(dish.price)}</strong>

                    <button
                      type="button"
                      className="primary-button"
                      onClick={() => addToCart(dish)}
                    >
                      Добавить
                    </button>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </PageWrapper>
  );
}