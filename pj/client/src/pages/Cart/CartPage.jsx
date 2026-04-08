import { useEffect, useMemo, useRef, useState } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import useCart from '../../hooks/useCart';
import useAuth from '../../hooks/useAuth';
import formatPrice from '../../utils/formatPrice';
import './CartPage.css';
import { useToast } from '../../context/ToastContext';

import { API_URL } from '../../config';

export default function CartPage() {
  const {
    cartItems,
    totalPrice,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const { showToast } = useToast();
  const { token, user } = useAuth();

  const [selectedCardId, setSelectedCardId] = useState('');
  const [showAddressDropdown, setShowAddressDropdown] = useState(false);
  const [showCardDropdown, setShowCardDropdown] = useState(false);
  const [showPaymentDropdown, setShowPaymentDropdown] = useState(false);

  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);

  const [profile, setProfile] = useState(user);
  const [selectedAddress, setSelectedAddress] = useState('');

  const [newAddressLabel, setNewAddressLabel] = useState('');
  const [addressCity, setAddressCity] = useState('');
  const [addressStreet, setAddressStreet] = useState('');
  const [addressHouse, setAddressHouse] = useState('');
  const [addressApartment, setAddressApartment] = useState('');
  const [addressFloor, setAddressFloor] = useState('');
  const [addressDoorphone, setAddressDoorphone] = useState('');

  const [deliveryTime, setDeliveryTime] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [comment, setComment] = useState('');

  const [cardLabel, setCardLabel] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');

  const addressDropdownRef = useRef(null);
  const paymentDropdownRef = useRef(null);
  const cardDropdownRef = useRef(null);

  useEffect(() => {
    if (!token) return;

    fetch(`${API_URL}/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setProfile(data))
      .catch(() => null);
  }, [token]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        addressDropdownRef.current &&
        !addressDropdownRef.current.contains(event.target)
      ) {
        setShowAddressDropdown(false);
      }

      if (
        paymentDropdownRef.current &&
        !paymentDropdownRef.current.contains(event.target)
      ) {
        setShowPaymentDropdown(false);
      }

      if (
        cardDropdownRef.current &&
        !cardDropdownRef.current.contains(event.target)
      ) {
        setShowCardDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const savedAddresses = profile?.savedAddresses || [];
  const savedCards = profile?.savedCards || [];

  const addressString = useMemo(() => selectedAddress, [selectedAddress]);

  const selectedCard = useMemo(() => {
    return savedCards.find((card, index) => {
      const id = card.id || String(index);
      return id === selectedCardId;
    });
  }, [savedCards, selectedCardId]);

  const resetAddressForm = () => {
    setNewAddressLabel('');
    setAddressCity('');
    setAddressStreet('');
    setAddressHouse('');
    setAddressApartment('');
    setAddressFloor('');
    setAddressDoorphone('');
  };

  const resetCardForm = () => {
    setCardLabel('');
    setCardHolderName('');
    setCardNumber('');
    setCardExpiry('');
  };

  const formatCardNumber = (value) => {
    return value
      .replace(/\D/g, '')
      .slice(0, 16)
      .replace(/(.{4})/g, '$1 ')
      .trim();
  };

  const formatCardExpiry = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 4);

    if (digits.length < 3) return digits;
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
  };

  const validateCardForm = () => {
    const cleanNumber = cardNumber.replace(/\s/g, '');
    const expiry = cardExpiry.trim();

    if (!cardLabel.trim()) {
      return 'Введите название карты.';
    }

    if (!cardHolderName.trim()) {
      return 'Введите имя держателя карты.';
    }

    if (cleanNumber.length !== 16) {
      return 'Номер карты должен содержать 16 цифр.';
    }

    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      return 'Срок действия должен быть в формате MM/YY.';
    }

    const [monthStr, yearStr] = expiry.split('/');
    const month = Number(monthStr);
    const year = Number(`20${yearStr}`);

    if (month < 1 || month > 12) {
      return 'Месяц срока действия должен быть от 01 до 12.';
    }

    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return 'Срок действия карты уже истёк.';
    }

    return '';
  };

  const getMinDeliveryTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 30);
  
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
  
    return `${hours}:${minutes}`;
  };
  
  const isDeliveryTimeValid = (time) => {
    if (!time) return false;
  
    const [hours, minutes] = time.split(':').map(Number);
  
    if (Number.isNaN(hours) || Number.isNaN(minutes)) {
      return false;
    }
  
    const now = new Date();
    const selected = new Date();
  
    selected.setHours(hours, minutes, 0, 0);
  
    const minAllowed = new Date();
    minAllowed.setMinutes(minAllowed.getMinutes() + 30);
    minAllowed.setSeconds(0, 0);
  
    return selected.getTime() >= minAllowed.getTime();
  };

  const saveAddress = async () => {
    const city = addressCity.trim();
    const street = addressStreet.trim();
    const house = addressHouse.trim();
    const apartment = addressApartment.trim();
    const floor = addressFloor.trim();
    const doorphone = addressDoorphone.trim();

    if (!token) {
      showToast('Сначала войди в аккаунт.', 'error');
      return;
    }

    if (!city || !street || !house) {
      showToast('Заполни хотя бы город, улицу и дом.', 'error');
      return;
    }

    const fullAddress = [
      city,
      street,
      `дом ${house}`,
      apartment ? `кв. ${apartment}` : '',
      floor ? `этаж ${floor}` : '',
      doorphone ? `домофон ${doorphone}` : '',
    ]
      .filter(Boolean)
      .join(', ');

    try {
      const response = await fetch(`${API_URL}/users/addresses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          label: newAddressLabel.trim() || 'Новый адрес',
          street: fullAddress,
          city,
          house,
          apartment,
          floor,
          doorphone,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        showToast(data.message || 'Не удалось сохранить адрес.', 'error');
        return;
      }

      setProfile((prev) => ({
        ...prev,
        savedAddresses: data.savedAddresses || [],
      }));

      setSelectedAddress(fullAddress);
      resetAddressForm();
      setShowAddressModal(false);
      showToast('Адрес сохранён.', 'success');
    } catch {
      showToast('Ошибка сети при сохранении адреса.', 'error');
    }
  };

  const saveCard = async () => {
    if (!token) {
      showToast('Сначала войди в аккаунт.', 'error');
      return;
    }

    const validationError = validateCardForm();
    if (validationError) {
      showToast(validationError, 'error');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/users/cards`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          label: cardLabel.trim(),
          holderName: cardHolderName.trim(),
          cardNumber: cardNumber.replace(/\s/g, ''),
          expiry: cardExpiry.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        showToast(data.message || 'Не удалось сохранить карту.', 'error');
        return;
      }

      setProfile((prev) => ({
        ...prev,
        savedCards: data.savedCards || [],
      }));

      const lastCard = data.savedCards?.[data.savedCards.length - 1];
      if (lastCard?.id) {
        setSelectedCardId(lastCard.id);
      }

      resetCardForm();
      setShowCardModal(false);
      showToast('Карта сохранена.', 'success');
    } catch {
      showToast('Ошибка сети при сохранении карты.', 'error');
    }
  };

  const handleOrder = async () => {
    if (!token) {
      showToast('Сначала войди в аккаунт.', 'error');
      return;
    }

    if (!cartItems.length) {
      showToast('Корзина пуста.', 'error');
      return;
    }

    if (!addressString) {
      showToast('Выбери адрес.', 'error');
      return;
    }

    if (!deliveryTime) {
      showToast('Укажите время доставки.', 'error');
      return;
    }
    
    if (!isDeliveryTimeValid(deliveryTime)) {
      showToast('Минимальное время заказа — не раньше чем через 30 минут.', 'error');
      return;
    }

    if (!deliveryTime) {
      showToast('Укажите время доставки.', 'error');
      return;
    }

    if ((paymentMethod === 'card' || paymentMethod === 'online') && !selectedCardId) {
      showToast('Выбери карту.', 'error');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            dishId: item._id || item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
          })),
          totalPrice,
          address: addressString,
          deliveryTime,
          paymentMethod,
          paymentCardId: selectedCardId,
          comment,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        showToast(data.message || 'Не удалось оформить заказ.', 'error');
        return;
      }

      clearCart();
      setComment('');
      setSelectedCardId('');
      setSelectedAddress('');
      setDeliveryTime('');
      showToast('Заказ оформлен.', 'success');
    } catch {
      showToast('Ошибка сети при оформлении заказа.', 'error');
    }
  };

  return (
    <PageWrapper>
      <section className="cart-page">
        <div className="container">
          <div className="book-layout">
            <img
              src="/assets/filebook.png"
              alt="book background"
              className="book-layout__image"
            />

            <div className="book-page left-page">
              <img
                src="/assets/hand-cut.png"
                alt="receipt hand"
                className="receipt-hand"
              />

              <div className="receipt-total">
                Итого: {formatPrice(totalPrice)}
              </div>

              <div className="cart-scroll-area">
                {!cartItems.length ? (
                  <p className="empty-cart-text"></p>
                ) : (
                  cartItems.map((item) => (
                    <article className="cart-item-card" key={item._id || item.id}>
                      <img src={item.image} alt={item.name} />
                      <div className="cart-item-info">
                        <h3>{item.name}</h3>
                        <p>{formatPrice(item.price)}</p>

                        <div className="qty-row">
                          <button
                            type="button"
                            onClick={() => decreaseQuantity(item._id || item.id)}
                          >
                            -
                          </button>

                          <span>{item.quantity}</span>

                          <button
                            type="button"
                            onClick={() => increaseQuantity(item._id || item.id)}
                          >
                            +
                          </button>

                          <button
                            type="button"
                            className="remove-link"
                            onClick={() => removeFromCart(item._id || item.id)}
                          >
                            убрать
                          </button>
                        </div>
                      </div>
                    </article>
                  ))
                )}
              </div>
            </div>

            <div className="book-page right-page">
              <h2>Детали заказа</h2>

              <div className="cart-details-panel">
                <div className="cart-field">
                  <span>Адрес</span>

                  <div className="custom-select" ref={addressDropdownRef}>
                    <button
                      type="button"
                      className="custom-select-trigger"
                      onClick={() => {
                        setShowCardDropdown(false);
                        setShowPaymentDropdown(false);
                        setShowAddressDropdown((prev) => !prev);
                      }}
                    >
                      <span className="custom-select-trigger__text">
                        {selectedAddress || 'Выбери адрес'}
                      </span>
                      <span className={`custom-select-trigger__arrow ${showAddressDropdown ? 'open' : ''}`}>
                        ▾
                      </span>
                    </button>

                    {showAddressDropdown && (
                      <div className="custom-select-dropdown">
                        {!savedAddresses.length ? (
                          <div className="custom-select-empty">
                            Сохранённых адресов пока нет
                          </div>
                        ) : (
                          savedAddresses.map((addr, i) => (
                            <button
                              type="button"
                              key={`${addr.street}-${i}`}
                              className="custom-select-option"
                              onClick={() => {
                                setSelectedAddress(addr.street);
                                setShowAddressDropdown(false);
                              }}
                            >
                              <strong>{addr.label || 'Адрес'}</strong>
                              <span>{addr.street}</span>
                            </button>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  className="secondary-button add-address-btn"
                  onClick={() => {
                    setShowAddressDropdown(false);
                    setShowAddressModal(true);
                  }}
                >
                  + Новый адрес
                </button>

                <div className="cart-field">
                  <span>Время</span>

                  <div className="time-wrapper">
                    {!deliveryTime && (
                      <span className="time-placeholder">Укажите время</span>
                    )}

                    <input
                      type="time"
                      value={deliveryTime}
                      min={getMinDeliveryTime()}
                      onChange={(e) => setDeliveryTime(e.target.value)}
                      className="time-input"
                    />
                  </div>
                </div>

                <div className="cart-field">
                  <span>Оплата</span>

                  <div className="custom-select" ref={paymentDropdownRef}>
                    <button
                      type="button"
                      className="custom-select-trigger"
                      onClick={() => {
                        setShowAddressDropdown(false);
                        setShowCardDropdown(false);
                        setShowPaymentDropdown((prev) => !prev);
                      }}
                    >
                      <span className="custom-select-trigger__text">
                        {paymentMethod === 'cash'
                          ? 'Наличные'
                          : paymentMethod === 'card'
                          ? 'Картой'
                          : 'Онлайн'}
                      </span>
                      <span className={`custom-select-trigger__arrow ${showPaymentDropdown ? 'open' : ''}`}>
                        ▾
                      </span>
                    </button>

                    {showPaymentDropdown && (
                      <div className="custom-select-dropdown">
                        <button
                          type="button"
                          className="custom-select-option"
                          onClick={() => {
                            setPaymentMethod('cash');
                            setSelectedCardId('');
                            setShowPaymentDropdown(false);
                          }}
                        >
                          <strong>Наличные</strong>
                          <span>Оплата при получении</span>
                        </button>

                        <button
                          type="button"
                          className="custom-select-option"
                          onClick={() => {
                            setPaymentMethod('card');
                            setShowPaymentDropdown(false);
                          }}
                        >
                          <strong>Картой</strong>
                          <span>С сохранённой карты</span>
                        </button>

                        <button
                          type="button"
                          className="custom-select-option"
                          onClick={() => {
                            setPaymentMethod('online');
                            setShowPaymentDropdown(false);
                          }}
                        >
                          <strong>Онлайн</strong>
                          <span>Безналичная оплата</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {(paymentMethod === 'card' || paymentMethod === 'online') && (
                  <>
                    <div className="cart-field">
                      <span>Карта</span>

                      <div className="custom-select" ref={cardDropdownRef}>
                        <button
                          type="button"
                          className="custom-select-trigger"
                          onClick={() => {
                            setShowAddressDropdown(false);
                            setShowPaymentDropdown(false);
                            setShowCardDropdown((prev) => !prev);
                          }}
                        >
                          <span className="custom-select-trigger__text">
                            {selectedCard
                              ? `${selectedCard.label || 'Карта'} — **** ${selectedCard.last4 || ''}`
                              : 'Выбери карту'}
                          </span>
                          <span className={`custom-select-trigger__arrow ${showCardDropdown ? 'open' : ''}`}>
                            ▾
                          </span>
                        </button>

                        {showCardDropdown && (
                          <div className="custom-select-dropdown">
                            {!savedCards.length ? (
                              <div className="custom-select-empty">
                                Сохранённых карт пока нет
                              </div>
                            ) : (
                              savedCards.map((card, i) => {
                                const cardId = card.id || String(i);

                                return (
                                  <button
                                    type="button"
                                    key={cardId}
                                    className="custom-select-option"
                                    onClick={() => {
                                      setSelectedCardId(cardId);
                                      setShowCardDropdown(false);
                                    }}
                                  >
                                    <strong>{card.label || 'Карта'}</strong>
                                    <span>**** {card.last4}</span>
                                  </button>
                                );
                              })
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      className="secondary-button add-address-btn"
                      onClick={() => {
                        setShowCardDropdown(false);
                        setShowCardModal(true);
                      }}
                    >
                      + Новая карта
                    </button>
                  </>
                )}

                <div className="cart-field">
                  <span>Комментарий</span>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Например: не звонить, домофон не работает"
                    rows="4"
                  />
                </div>

                <button
                  type="button"
                  className="primary-button checkout-btn"
                  onClick={handleOrder}
                >
                  Оформить заказ
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showAddressModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowAddressModal(false)}
        >
          <div
            className="modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Новый адрес</h2>

            <input
              className="modal-input"
              placeholder="Название адреса (Дом / Работа)"
              value={newAddressLabel}
              onChange={(e) => setNewAddressLabel(e.target.value)}
            />

            <div className="address-grid">
              <input
                className="modal-input"
                placeholder="Город"
                value={addressCity}
                onChange={(e) => setAddressCity(e.target.value)}
              />
              <input
                className="modal-input"
                placeholder="Улица"
                value={addressStreet}
                onChange={(e) => setAddressStreet(e.target.value)}
              />
              <input
                className="modal-input"
                placeholder="Дом"
                value={addressHouse}
                onChange={(e) => setAddressHouse(e.target.value)}
              />
              <input
                className="modal-input"
                placeholder="Квартира"
                value={addressApartment}
                onChange={(e) => setAddressApartment(e.target.value)}
              />
              <input
                className="modal-input"
                placeholder="Этаж"
                value={addressFloor}
                onChange={(e) => setAddressFloor(e.target.value)}
              />
              <input
                className="modal-input"
                placeholder="Домофон"
                value={addressDoorphone}
                onChange={(e) => setAddressDoorphone(e.target.value)}
              />
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="secondary-button"
                onClick={() => setShowAddressModal(false)}
              >
                Отмена
              </button>

              <button
                type="button"
                className="primary-button"
                onClick={saveAddress}
              >
                Сохранить
              </button>
            </div>
          </div>
        </div>
      )}

      {showCardModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowCardModal(false)}
        >
          <div
            className="modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Новая карта</h2>

            <input
              className="modal-input"
              placeholder="Название карты (Основная / Зарплатная)"
              value={cardLabel}
              onChange={(e) => setCardLabel(e.target.value)}
            />

            <input
              className="modal-input"
              placeholder="Имя держателя"
              value={cardHolderName}
              onChange={(e) => setCardHolderName(e.target.value)}
            />

            <input
              className="modal-input"
              placeholder="Номер карты"
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
            />

            <input
              className="modal-input"
              placeholder="MM/YY"
              value={cardExpiry}
              onChange={(e) => setCardExpiry(formatCardExpiry(e.target.value))}
            />

            <div className="modal-actions">
              <button
                type="button"
                className="secondary-button"
                onClick={() => setShowCardModal(false)}
              >
                Отмена
              </button>

              <button
                type="button"
                className="primary-button"
                onClick={saveCard}
              >
                Сохранить
              </button>
            </div>
          </div>
        </div>
      )}
    </PageWrapper>
  );
}