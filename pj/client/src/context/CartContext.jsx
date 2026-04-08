import { createContext, useEffect, useMemo, useState } from "react";
import calculateCartTotal from "../utils/calculateCartTotal";
import useAuth from "../hooks/useAuth";

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { user } = useAuth();


  const cartKey = user?._id ? `cart_${user._id}` : "cart_guest";

  const [cartItems, setCartItems] = useState([]);


  useEffect(() => {
    const saved = localStorage.getItem(cartKey);
    setCartItems(saved ? JSON.parse(saved) : []);
  }, [cartKey]);


  useEffect(() => {
    localStorage.setItem(cartKey, JSON.stringify(cartItems));
  }, [cartItems, cartKey]);

  const addToCart = (dish) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item._id === dish._id);

      if (existing) {
        return prev.map((item) =>
          item._id === dish._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...dish, quantity: 1 }];
    });
  };

  const removeFromCart = (dishId) => {
    setCartItems((prev) => prev.filter((item) => item._id !== dishId));
  };

  const increaseQuantity = (dishId) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === dishId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (dishId) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item._id === dishId
            ? { ...item, quantity: Math.max(1, item.quantity - 1) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => setCartItems([]);

  const totalPrice = useMemo(() => calculateCartTotal(cartItems), [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}