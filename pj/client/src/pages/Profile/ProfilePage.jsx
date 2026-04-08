import { useState } from "react";
import { Link } from "react-router-dom";
import PageWrapper from "../../components/layout/PageWrapper";
import useAuth from "../../hooks/useAuth";
import { uploadAvatar } from "../../api/usersApi";
import { SERVER_URL } from "../../config";


export default function ProfilePage() {
  const { user, token, updateUser } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const avatarSrc = user?.avatar
    ? `${SERVER_URL}${user.avatar}`
    : "https://via.placeholder.com/140x140?text=Avatar";

  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setMessage("");

    try {
      setUploading(true);
      const data = await uploadAvatar(file, token);
      updateUser(data.user);
      setMessage("Аватар успешно загружен");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <PageWrapper>
      <section className="profile-page">
        <div className="container profile-grid">
          <div className="paper-panel">
            <p className="eyebrow">User page</p>
            <h1>Личный кабинет</h1>

            <div className="profile-avatar-block">
              <img src={avatarSrc} alt="Аватар" className="profile-avatar" />

              <label className="primary-button avatar-upload-button">
                {uploading ? "Загрузка..." : "Загрузить аватар"}
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  onChange={handleAvatarChange}
                  hidden
                />
              </label>
            </div>

            {message && <p className="profile-upload-message">{message}</p>}

            <div className="profile-lines">
              <p><strong>Имя:</strong> {user?.name}</p>
              <p><strong>Почта:</strong> {user?.email}</p>
              <p><strong>Телефон:</strong> {user?.phone}</p>
              <p><strong>Роль:</strong> {user?.role}</p>
            </div>
          </div>

          <div className="book-panel profile-actions">
            <h2>Что есть у пользователя</h2>
            <ol>
              <li>История заказов.</li>
              <li>Повтор заказа в один клик.</li>
              <li>Сохранённые адреса для корзины.</li>
            </ol>
            <Link to="/profile/orders" className="primary-button link-button">
              История заказов
            </Link>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}