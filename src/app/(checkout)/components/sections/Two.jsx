"use client";
import { LocationIcon, MailIcon, ShippingIcon } from '@/app/components/Icons';
import style from './sections.module.css';
import { useState } from 'react';
import { useCartContext } from '@/app/context/CartContext';
import MercadoPagoButton from './components/MercadoPagoButton';

const ChangeButton = ({setSection}) => {
  return (
    <button className={style.change_button} onClick={() => setSection(0)}>
      CAMBIAR
    </button>
  );
}

const inputStyle = {
  height: "100%",
  minHeight: "40px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  background: "none"
};

export default function Two({ info, setSection }) {
  const { cart } = useCartContext();

  const items = cart.items;

  return (
    <div className={style.sections_container}>
      <div className={style.section}>
        <div className={style.input_simple} style={inputStyle}>
          <div className={style.info_container_sub}>
            <MailIcon bg="#000" width={22} height={22} />
            <p>{info.email}</p>
          </div>
          <ChangeButton setSection={setSection} />
        </div>
        <div className={style.input_simple} style={inputStyle}>
          <div className={style.info_container_sub}>
            <LocationIcon bg="#000" width={22} height={22} />
            <p>
              <span>{info.direction}</span>
              <span>{info.direction_number}</span>
              <span>, {info.department.length < 1 ? "" : info.department}</span>
              <br />
              <span>CP {info.zip_code}</span>
              <br />
              <span>{info.city}</span>, <span>{info.province}</span>
            </p>
          </div>
          <ChangeButton setSection={setSection} />
        </div>
        <div className={style.input_simple} style={inputStyle}>
          <div className={style.info_container_sub}>
            <ShippingIcon bg="#000" width={22} height={22} />
            <p>Envío a domicilio - Correo Argentino</p>
          </div>

          <ChangeButton setSection={setSection} />
        </div>
      </div>
      <div className={style.section}>
        <h1>MEDIOS DE PAGO</h1>
        <MercadoPagoButton items={items}/>
        {/* {waysOfPayment.map((payment) => {
          return (
            <button
              key={payment.title}
              className={style.input_simple}
              style={{
                ...inputStyle,
                justifyContent: "start",
                gap: "10px",
                cursor: "pointer",
              }}
              onClick={async () => {
                const fn = payment.function;
                await fn();
              }}
            >
              <Image
                src={payment.icon}
                width={30}
                quality={100}
                alt={payment.title}
              />
              <p>Mercado Pago</p>
            </button>
          );
        })} */}
      </div>
    </div>
  );
}
