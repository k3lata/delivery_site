import { useNavigate } from 'react-router-dom';
import PageWrapper from '../../components/layout/PageWrapper';

export default function MainPage() {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <section className="main-hero vintage-main">
        <div className="main-hero__overlay" />

        <div className="container main-hero__content vintage-main__content">
          <div className="main-top-brand">Deliver with care</div>

          <img src="/assets/bird1.png" alt="bird" className="main-bird" />

          <div className="main-suitcase-wrap" aria-hidden="true">
            <img src="/assets/package.png" alt="suitcase" className="main-suitcase" />
            <span className="main-suitcase-question">???</span>
          </div>

          <button
            type="button"
            className="thought-bubble thought-bubble--cluster"
            onClick={() => navigate('/dishes')}
            aria-label="Открыть страницу кухонь"
          >
            <img src="/assets/bubble-cut.png" alt="thought bubble" className="thought-bubble__image" />
            <div className="thought-bubble__dishes">
              <img src="/assets/japanese-dish.png" alt="Japanese dish" className="bubble-dish bubble-dish--one" />
              <img src="/assets/greek-dish.png" alt="Greek dish" className="bubble-dish bubble-dish--two" />
              <img src="/assets/chinese-dish.png" alt="Chinese dish" className="bubble-dish bubble-dish--three" />
            </div>
            <span className="thought-bubble__arrow">→</span>
          </button>
        </div>
      </section>
    </PageWrapper>
  );
}
