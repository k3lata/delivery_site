import { useEffect, useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import useAuth from '../../hooks/useAuth';
import useCart from '../../hooks/useCart';
import { useNavigate } from 'react-router-dom';
import formatPrice from '../../utils/formatPrice';

import { API_URL } from '../../config';

export default function OrdersPage() {
  const { token } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState('Загрузка...');

  useEffect(() => {
    fetch(`${API_URL}/users/my-orders`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setMessage(data.length ? '' : 'Пока заказов нет.');
      })
      .catch(() => setMessage('Не удалось загрузить историю заказов.'));
  }, [token]);

  const repeatOrder = (items) => {
    items.forEach((item) => addToCart({ _id: item.dishId || item._id, name: item.name, price: item.price, image: item.image }));
    navigate('/cart');
  };

  return (
    <PageWrapper>
      <section className="orders-page">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">History</p>
            <h1>История заказов</h1>
          </div>
          {message && <p>{message}</p>}
          <div className="orders-grid">
            {orders.map((order) => (
              <article className="paper-panel order-card" key={order._id}>
                <p><strong>Сумма:</strong> {formatPrice(order.totalPrice)}</p>
                <p><strong>Статус:</strong> {order.status}</p>
                <p><strong>Адрес:</strong> {order.address}</p>
                <p><strong>Время:</strong> {order.deliveryTime}</p>
                <button type="button" className="primary-button small" onClick={() => repeatOrder(order.items)}>Повторить заказ</button>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
