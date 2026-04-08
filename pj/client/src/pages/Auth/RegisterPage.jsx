import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../../components/layout/PageWrapper';
import useAuth from '../../hooks/useAuth';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register, loading } = useAuth();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    let value = e.target.value;

    if (e.target.name === 'phone') {
      value = value.replace(/[^\d+]/g, '');
    }

    setForm((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));

    setMessage('');
  };

  const validateForm = () => {
    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();
    const phone = form.phone.trim();
    const password = form.password;

    if (!name || !email || !phone || !password) {
      return 'Заполни все поля.';
    }

    if (name.length < 2) {
      return 'Имя должно быть минимум 2 символа.';
    }

    if (name.length > 30) {
      return 'Имя слишком длинное.';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return 'Некорректная почта.';
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10 || cleanPhone.length > 15) {
      return 'Некорректный номер телефона.';
    }

    if (password.length < 8) {
      return 'Пароль должен быть минимум 8 символов.';
    }

    if (password.length > 50) {
      return 'Пароль слишком длинный.';
    }

    if (!/[A-ZА-Я]/.test(password)) {
      return 'В пароле нужна хотя бы 1 заглавная буква.';
    }

    if (!/[a-zа-я]/.test(password)) {
      return 'В пароле нужна хотя бы 1 строчная буква.';
    }

    if (!/\d/.test(password)) {
      return 'В пароле нужна хотя бы 1 цифра.';
    }

    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validateForm();
    if (error) {
      setMessage(error);
      return;
    }

    const result = await register({
      ...form,
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      phone: form.phone.trim(),
      password: form.password,
    });

    if (result.success) {
      navigate('/profile');
    } else {
      setMessage(result.message || 'Ошибка регистрации.');
    }
  };

  return (
    <PageWrapper>
      <section className="auth-shell">
        <div className="container">
          <div className="paper-panel auth-card">
            <p className="eyebrow">Create account</p>
            <h1>Регистрация</h1>

            {message && <div className="message error">{message}</div>}

            <form className="auth-form" onSubmit={handleSubmit}>
              <input
                name="name"
                placeholder="Имя"
                value={form.name}
                onChange={handleChange}
                maxLength={30}
              />

              <input
                name="email"
                type="email"
                placeholder="Почта"
                value={form.email}
                onChange={handleChange}
              />

              <input
                name="phone"
                placeholder="Телефон"
                value={form.phone}
                onChange={handleChange}
                maxLength={16}
              />

              <input
                name="password"
                type="password"
                placeholder="Пароль"
                value={form.password}
                onChange={handleChange}
                maxLength={50}
              />

              <button type="submit" className="primary-button" disabled={loading}>
                {loading ? 'Загрузка...' : 'Зарегистрироваться'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}