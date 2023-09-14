"use client";
import style from './cookiescard.module.css';
import { useEffect, useState } from 'react';
import { CloseIcon } from '@/app/components/Icons';

export default function CookiesCard() {
  const [cookieConsent, setCookieConsent] = useState(false);
  let isTrueSet;

  useEffect(() => {
    
    if (typeof localStorage !== 'undefined') {
      const consent = localStorage.getItem('cookieConsent');
      if (consent == null) {
        localStorage.setItem('cookieConsent', false);
      }
      setCookieConsent(localStorage.getItem('cookieConsent'))
    }
  }, [])

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('cookieConsent', cookieConsent)
    }
  }, [cookieConsent])

  return (
    <div className={`${cookieConsent != 'false' ? style.off : style.container}`}>
      <div className={style.subcontainer}>
        <p>
          Este sitio web utiliza cookies para garantizar que obtenga la mejor
          experiencia en nuestro sitio web.
        </p>
        <div className={style.buttons}>
          <button onClick={() => setCookieConsent(true)} className={style.btn_accept}>Entendido</button>
          <button onClick={() => setCookieConsent(true)}>
            <CloseIcon bg={"#aaa"} width={12} heigth={12} />
          </button>
        </div>
      </div>
    </div>
  );
}