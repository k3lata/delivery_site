export default function formatPrice(price) {
    return `${Number(price).toLocaleString("ru-RU")} ₸`;
  }