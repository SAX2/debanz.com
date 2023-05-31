"use client";
import Image from 'next/image';
import style from './bag.module.css';
import { useCartContext } from '@/app/context/CartContext';
import { BackIcon } from '@/app/components/Icons';
import { useEffect, useState } from 'react';
import useFormatText from '@/app/hooks/useFormatText';
import { getShipmentPrice } from '@/app/config';
import { useUserContext } from '@/app/context/UserContext';

const BagItem = ({ data }) => {
  const { formatPrice } = useFormatText();

  return (
    <div className={style.bag_p_container}>
      <div className={style.bag_p_image}>
        <Image
          src={data.images[0]}
          alt={data.name}
          width={1080}
          height={1080}
        />
      </div>
      <div className={style.bag_p_info}>
        <div className={style.bag_p_info_main}>
          <div className={style.spaceBetween}>
            <p className={style.bag_p_name}>{data.name}</p>
            <bdi className="price">
              <span className="price_icon">$</span>
              {formatPrice(data.price)}
            </bdi>
          </div>
          <div className={style.spaceBetween}>
            <p className={style.bag_p_size}>TALLE: {data.size}</p>
            <div className={style.bag_p_total}>
              <span>×</span>
              <p>{data.total}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Bag() {
  const { cart } = useCartContext();
  const { checkoutInfo, setCheckoutInfo } = useUserContext();
  const { formatPrice } = useFormatText();
  const [shippingPrice, setShippingPrice] = useState(0);
  const [dataIsLoading, setDataIsLoading] = useState(false)
  // const weight = cart

  useEffect(() => {
    let timeoutId;
    
    const getPrice = async () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(async () => {
        setDataIsLoading(true)
        if (checkoutInfo.zip_code) {
          const data = await getShipmentPrice({ zip_code: checkoutInfo.zip_code, weight: 200 });
          setDataIsLoading(false)
          if (data == undefined) return setShippingPrice(0)
          if (data) {
            setCheckoutInfo({ ...checkoutInfo, shippingPrice: data.tax_price })
            return setShippingPrice(data.tax_price)
          };
        }
        setDataIsLoading(false)
      }, 1500);
    }

    getPrice();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [checkoutInfo.zip_code])

  return (
    <div className={style.container}>
      <div className={style.bag_items}>
        {cart.items.map((i) => {
          return <BagItem key={`${i.id}${i.size}`} data={i} />;
        })}
      </div>
      <div className={style.bag_info_prices} style={dataIsLoading ? { opacity: 0.5 } : { opacity: 1 }}>
        <div className={style.spaceBetween}>
          <p>SUBTOTAL</p>
          <bdi className="price">
            <span className="price_icon">$</span>
            {formatPrice(cart.totalPrice)}
          </bdi>
        </div>
        <div
          className="separator"
          style={{ background: "rgba(0, 0, 0, 0.11)" }}
        ></div>
        <div className={style.shipments}>
          <p>ENVIO</p>
          <div className={style.shipment_options}>
            <div className={style.input_container}>
              <input type="radio" checked />
              <label htmlFor="">Envío a domicilio Estándar - Shipnow</label>
            </div>
            <bdi className="price">
              <span className="price_icon">$</span>
              {formatPrice(shippingPrice)}
            </bdi>
          </div>
        </div>
        <div
          className="separator"
          style={{ background: "rgba(0, 0, 0, 0.11)" }}
        ></div>
        <div className={style.spaceBetween}>
          <p>TOTAL</p>
          <bdi className="price">
            <span className="price_icon">$</span>
            {formatPrice(cart.totalPrice + shippingPrice)}
          </bdi>
        </div>
      </div>
    </div>
  );
}