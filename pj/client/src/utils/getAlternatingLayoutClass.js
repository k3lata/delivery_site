export default function getAlternatingLayoutClass(index) {
    return index % 2 === 0 ? "normal" : "reverse";
  }