import { useEffect, useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import useAuth from '../../hooks/useAuth';
import formatPrice from '../../utils/formatPrice';

import { API_URL } from '../../config';

export default function AdminPage() {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const response = await fetch(`${API_URL}/admin/orders`, { headers: { Authorization: `Bearer ${token}` } });
    const data = await response.json();
    setOrders(data);
  };

  useEffect(() => { fetchOrders(); }, []);

  const updateStatus = async (orderId, status) => {
    await fetch(`${API_URL}/admin/orders/${orderId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status }),
    });
    fetchOrders();
  };

  return (
    <PageWrapper>
      <section className="admin-page">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow">Admin</p>
            <h1>Панель заказов</h1>
          </div>

          <div className="orders-grid">
            {orders.map((order) => (
              <article key={order._id} className="paper-panel order-card admin-card">
                <p><strong>Пользователь:</strong> {order.userId?.name || 'Unknown'}</p>
                <p><strong>Сумма:</strong> {formatPrice(order.totalPrice)}</p>
                <p><strong>Адрес:</strong> {order.address}</p>
                <p><strong>Время:</strong> {order.deliveryTime}</p>
                <label>
                  <span>Статус</span>
                  <select value={order.status} onChange={(e) => updateStatus(order._id, e.target.value)}>
                    <option value="new">new</option>
                    <option value="cooking">cooking</option>
                    <option value="on_the_way">on_the_way</option>
                    <option value="delivered">delivered</option>
                    <option value="cancelled">cancelled</option>
                  </select>
                </label>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
