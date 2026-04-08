import { Link } from "react-router-dom";
import PageWrapper from "../../components/layout/PageWrapper";

export default function NotFoundPage() {
  return (
    <PageWrapper>
      <section className="container" style={{ padding: "60px 0" }}>
        <h1 style={{ fontSize: "48px", marginBottom: "16px" }}>404</h1>
        <p style={{ marginBottom: "16px" }}>Страница не найдена.</p>
        <Link to="/">Вернуться на главную</Link>
      </section>
    </PageWrapper>
  );
}