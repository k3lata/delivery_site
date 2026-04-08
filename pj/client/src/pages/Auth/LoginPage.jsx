import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../../components/layout/PageWrapper';
import useAuth from '../../hooks/useAuth';

const API_URL = 'http://localhost:5000/api/auth';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, loading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validate = () => {
    if (!email.trim() || !password.trim()) {
      return 'Заполни все поля.';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return 'Некорректная почта.';
    }

    if (password.length < 8) {
      return 'Пароль минимум 8 символов.';
    }

    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
  
    try {
      const result = await login(
        email.trim().toLowerCase(),
        password
      );
  
      if (result.success) {
        navigate('/profile');
      } else {
        setError(result.message || 'Ошибка входа');
      }
    } catch {
      setError('Сервер недоступен. Проверь, запущен ли backend.');
    }
  };

  return (
    <PageWrapper>
      <section className="auth-shell">
        <div className="container">
          <div className="paper-panel auth-card">
            <p className="eyebrow">Welcome back</p>
            <h1>Вход</h1>

            {error && <div className="message error">{error}</div>}

            <form className="auth-form" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Почта"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
              />

              <input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
              />

              <button type="submit" className="primary-button" disabled={loading}>
                {loading ? 'Загрузка...' : 'Войти'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}