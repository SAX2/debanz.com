"use client";
import { useState } from 'react';
import { useCartContext } from '@/app/context/CartContext';
import { MinusIcon, PlusIcon } from '@/app/components/Icons';
import { toast } from 'sonner';
import style from './productById.module.css';
import domain from '@/app/config';

const AddToCart = ({ data, setSelectedSize, size }) => {
  const { addToBag } = useCartContext();

  const indexOf = data.sizes !== null ? data.sizes.findIndex(s => s == data.size) : 0

  return (
    <button
      className={style.add_to_cart}
      onClick={() => {
        if (size.length == 0)
          toast.error(
            "Seleccione un talle de la prenda para agregar al carrito"
          );
        else addToBag({ ...data });
      }}
      disabled={data.stock[indexOf] == 0 ? true : false}
      style={data.stock[indexOf] == 0 ? { background: "#f6f6f6", color: "#000"} : null}
    >
      {data.stock[indexOf] == 0 ? "SIN STOCK" : "AGREGAR AL CARRITO"}
      <div
        className={style.add_icon}
        style={
          data.stock[indexOf] == 0 ? { display: "none" } : {}
        }
      >
        <PlusIcon bg="#fff" heigth="1rem" width="1rem" />
      </div>
    </button>
  );
}

export default function ProductInfo({ data }) {
  const [selectedSize, setSelectedSize] = useState("M")
  const [quantity, setQuantity] = useState(1)
  // const sizes = JSON.parse(data.sizes)

  const indexOfSelectedSize = data.sizes != null ? data.sizes.indexOf(selectedSize) : 0;

  return (
    <div className={style.section}>
      <div className={style.title}>
        <h1>{data.name}</h1>
        <p>${data.price}</p>
      </div>
      <div className={style.sizes}>
        {data.sizes != null ? (data.sizes.map((s) => {
          return (
            <div
              className={style.size}
              key={s}
              onClick={() => {
                setSelectedSize(s)
                setQuantity((q) => q >= data.stock[data.sizes.indexOf(s)] ? data.stock[data.sizes.indexOf(s)] : q)
              }}
              style={
                selectedSize == s
                  ? { background: "#000", color: "#fff" }
                  : { background: "#fff", color: "#000" }
              }
            >
              {s}
            </div>
          );
        })) : (<div>TALLE UNICO</div>) }
      </div>
      <div className={style.cart}>
        <div className={style.quantity}>
          <button onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}>
            <MinusIcon bg="#aaa" width="22px" heigth="auto" />
          </button>
          <p>{quantity}</p>
          <button onClick={() => setQuantity((q) => q >= data.stock[indexOfSelectedSize] ? q : q + 1)}>
            <PlusIcon bg="#aaa" width="22px" heigth="auto" />
          </button>
        </div>
        <AddToCart
          data={{ ...data, total: quantity, size: selectedSize, images: data.images.map(i => domain(`/${i}`)) }}
          setSelectedSize={setSelectedSize}
          size={selectedSize}
        />
      </div>
      <div className="separator"></div>
      <div className={style.description}></div>
    </div>
  );
}
