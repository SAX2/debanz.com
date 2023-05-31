"use client";

export default function useFormatText() {
  const formatPrice = (str) => {
    const formattedPrice = str.toLocaleString('de-DE');
    return formattedPrice;
  }
  
  return { formatPrice }
}
