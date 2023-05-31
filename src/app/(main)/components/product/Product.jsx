"use client";
import Image from 'next/image';
import style from './product.module.css';
import Link from 'next/link';
import { useCartContext } from '../../../context/CartContext';
import { useState } from 'react';
import domain from '@/app/config';
import { PlusIcon } from '@/app/components/Icons';


const AddToCart = ({ data, disabled, setSelectedSize }) => {
  const { addToBag } = useCartContext();

  const indexOf = data.sizes !== null ? data.sizes.findIndex(s => s == data.size) : 0

  return (
    <button
      className={style.add_to_cart}
      onClick={() => {
        addToBag({ ...data, stock: data.stock[indexOf] });
      }}
      disabled={data.stock[indexOf] == 0 ? true : false}
      style={data.stock[indexOf] == 0 ? { background: "#f6f6f6", color: "#000"} : null}
    >
      {data.stock[indexOf] == 0 ? "SIN STOCK" : "AGREGAR AL CARRITO"}
      <div
        className={style.add_icon}
        style={
          data.stock[indexOf] == 0 ? { display: "none" } : { display: "flex" }
        }
      >
        <PlusIcon bg="#fff" heigth="1rem" width="1rem" />
      </div>
    </button>
  );
}

export default function Product({ data }) {
  const [selectedSize, setSelectedSize] = useState("M");
  const [onHoverImage, setOnHoverImage] = useState(false);
  const nameLower = data.name.toLowerCase();
  function reemplazarEspacios(string) {
    // Verificar si el string contiene espacios
    if (string.includes(' ')) {
      // Reemplazar los espacios por guiones (-)
      string = string.replace(/ /g, '-');
    }
    return string;
  }

  return (
    <div className={style.container}>
      <Link
        href={`/productos/${reemplazarEspacios(nameLower)}`}
        className={style.image}
        onMouseEnter={() => setOnHoverImage(true)}
        onMouseLeave={() => setOnHoverImage(false)}
      >
        <Image
          alt={data.name}
          src={
            data.images.length > 1
              ? onHoverImage
                ? domain(`/${data.images[1]}`)
                : domain(`/${data.images[0]}`)
              : domain(`/${data.images[0]}`)
          }
          // src={domain(`/${data.images[0]}`)}
          width={1080}
          height={1080}
        />
      </Link>
      <div className={style.product_info}>
        <p className={style.name}>{data.name}</p>
        <p className={style.price}>$ {data.price}</p>
        <div className={style.sizes_container}>
          {data.sizes == null ? (
            <div>{"Talle unico".toLocaleUpperCase()}</div>
          ) : (
            <>
              {data.sizes.map((s) => {
                return (
                  <div
                    className={style.size}
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    style={
                      selectedSize == s
                        ? { background: "#000", color: "#fff", borderColor: "#000" }
                        : { background: "#fff", color: "#999", borderColor: "#999" }
                    }
                  >
                    {s}
                  </div>
                );
              })}
            </>
          )}
        </div>
        <AddToCart
          data={{
            ...data,
            size: selectedSize,
            images: data.images.map((i) => domain(`/${i}`)),
          }}
          disabled={selectedSize.length == 0 ? true : false}
          setSelectedSize={setSelectedSize}
        />
      </div>
    </div>
  );
}