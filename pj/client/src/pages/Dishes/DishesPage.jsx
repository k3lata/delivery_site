import { useNavigate } from 'react-router-dom';
import PageWrapper from '../../components/layout/PageWrapper';
import { cuisines } from '../../data/menuData';

export default function DishesPage() {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <section className="dishes-page dishes-page--figma">
        <div className="dishes-page__overlay" />

        <div className="container">
          <div className="dishes-title-wrap">
            <img
              src="/assets/title-for-cuisines.png"
              alt="Кухни"
              className="dishes-title-image"
            />
          </div>

          <div className="teacups-grid teacups-grid--figma">
            {cuisines.map((cuisine, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={cuisine.id}
                  className={`tea-card tea-card-${index} ${isLeft ? 'tea-card--left' : 'tea-card--right'}`}
                  style={{ '--card-accent': cuisine.theme }}
                >
                  <button
                    type="button"
                    className="tea-card__cup"
                    onClick={() => navigate(`/cuisine/${cuisine.id}`)}
                    aria-label={`Открыть ${cuisine.title}`}
                  >
                    <span className="tea-card__steam tea-card__steam--one" />
                    <span className="tea-card__steam tea-card__steam--two" />
                    <img src={cuisine.cupImage} alt={cuisine.title} />
                  </button>

                  <button
                    type="button"
                    className="tea-card__tag"
                    onClick={() => navigate(`/cuisine/${cuisine.id}`)}
                    aria-label={`Открыть ${cuisine.title}`}
                  >
                    <span>{cuisine.label}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}