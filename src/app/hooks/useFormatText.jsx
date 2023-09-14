"use client";

export default function useFormatText() {
  const formatPrice = (str) => {
    const formattedPrice = str.toLocaleString('de-DE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    return formattedPrice;
  }

  const formatDate = (date) => {
    const dateObj = new Date(date);
    const month = dateObj.getMonth() + 1; 
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();

    const formattedMonth = month < 10 ? '0' + month : month;
    const formattedDay = day < 10 ? '0' + day : day;
  
    return formattedMonth + '/' + formattedDay + '/' + year;
  }
  
  return { formatPrice, formatDate }
}
