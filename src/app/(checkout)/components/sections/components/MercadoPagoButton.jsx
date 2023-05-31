"use client";
import MercadoPagoLogo from '../../../../../../public/mercadopago.svg';
import Image from 'next/image';
import domain from '@/app/config';
import { toast } from 'sonner';
import style from './mercadopago.module.css';
import { useEffect, useState } from 'react';
import { useUserContext } from '@/app/context/UserContext';

const PaymentsWaysAccept = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    setCards([])

    const fetchPaymentMethods = async () => {
      try {
        await fetch(domain("/payment/types"))
          .then(async (res) => {
            const result = await res.json();
            result.map((r) =>
              setCards((prevStatus) => [...prevStatus, r.secure_thumbnail])
            );
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        
      }
    }
    
    fetchPaymentMethods();
  }, []);

  return (
    <div className={style.cards}>
      {cards.map((c) => {
        return <img src={c} alt="" />;
      })}
    </div>
  );
}

export default function MercadoPagoButton({ items }) {
  const [isPromiseInProgress, setIsPromiseInProgress] = useState(false);
  const { checkoutInfo } = useUserContext();

  let itemsToPost = items.map((i) => {
    return {
      id: i.id,
      title: i.name,
      currency_id: "ARS",
      picture_url: "",
      description: i.description,
      category_id: "art",
      quantity: i.total,
      unit_price: parseInt(i.price),
    };
  });

  const MercadoPago = async () => {
    if (checkoutInfo.shippingPrice) {
      itemsToPost.push({
        id: 0,
        title: "Envío a domicilio Estándar - Shipnow",
        currency_id: "ARS",
        picture_url: "",
        description: "General services",
        category_id: "services",
        quantity: 1,
        unit_price: checkoutInfo.shippingPrice,
      });
    }
    if (isPromiseInProgress) return;

    setIsPromiseInProgress(true);
    try {
      await toast.promise(
        fetch(domain("/payment"), {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ products: [...itemsToPost] }),
        }),
        {
          loading: "Validando compra...",
          error: (response) => {
            setIsPromiseInProgress(false); 
            return `Ha habido un error al conectarse con Mercado Pago, porfavor intente nuevamente`;
          },
          success: async (response) => {
            setIsPromiseInProgress(false);
            const data = await response.json();
            window.location.replace(data.init_point);
            return "Compra validada correctamente, redirigiendo hacia Mercado Pago";
          },
        }
      );
    } catch (error) {
      setIsPromiseInProgress(false);
      console.error(`Ha habido un error al conectarse con Mercado Pago: ${error}`);
    }
  }

  const payment =     {
    id: 1,
    title: "Paga con Mercado pago",
    icon: MercadoPagoLogo,
    function: MercadoPago
  }

  return (
    <button
      key={payment.title}
      className={style.input_style}
      onClick={async () => await MercadoPago()}
    >
      <div>
        <Image
          src={payment.icon}
          width={30}
          quality={100}
          alt={payment.title}
        />
        <p>{payment.title}</p>
      </div>
      <PaymentsWaysAccept />
    </button>
  );
}
