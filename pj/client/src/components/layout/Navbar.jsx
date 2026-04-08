import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useCart from '../../hooks/useCart';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();

  return (
    <header className="site-header">
      <nav className="container site-nav">
        <Link to="/" className="brand-mark">Deliver with care</Link>

        <div className="nav-links">
          <Link to="/" className="nav-pill">Главная</Link>
          <Link to="/dishes" className="nav-pill">Кухни</Link>
          <Link to="/menu-builder" className="nav-pill">Меню</Link>
          <Link to="/cart" className="nav-pill">Корзина ({cartItems.length})</Link>

          {user ? (
            <>
              <Link to="/profile" className="nav-pill">Профиль</Link>
              {user.role === 'admin' && <Link to="/admin" className="nav-pill">Админ</Link>}
              <button type="button" onClick={logout} className="nav-pill logout-btn">Выйти</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-pill">Вход</Link>
              <Link to="/register" className="nav-pill">Регистрация</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
