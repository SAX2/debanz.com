"use client";
import { useState } from 'react';
import { useCartContext } from '@/app/context/CartContext';
import { MinusIcon, PlusIcon } from '@/app/components/Icons';
import { toast } from 'sonner';
import { useBagContext } from '@/app/context/BagContext';
import style from './productById.module.css';
import useFormatText from '@/app/hooks/useFormatText';
import Accordion from '../../components/accordion/Accordion';
import { addToCart, updateCart } from '@/app/utils/shopify';

const AddToCart = ({ quantity, size }) => {
  const { setOpenBag } = useBagContext()
  const { countOfProducts } = useCartContext()

  const handleAddToCart = async () => {
    let cartId = sessionStorage.getItem("cartId");
    if (quantity > 0) {
      if (cartId) {
        await updateCart(cartId, size.id, quantity);
        await countOfProducts(cartId);
        setOpenBag(true)
      } else {
        const { data } = await addToCart(size.id, quantity);
        setOpenBag(true)
        cartId = data.cartCreate.cart.id;
        sessionStorage.setItem("cartId", cartId);
      }
    }
  };

  return (
    <button
      className={`${style.add_to_cart} ${size.currentlyNotInStock ? style.no_stock : style.stock}`}
      onClick={handleAddToCart}
      disabled={size.currentlyNotInStock}
      style={size.currentlyNotInStock ? { background: "#f6f6f6", color: "#000", animation: "none"} : null}
    >
      <span>{size.currentlyNotInStock ? "SIN STOCK" : "AGREGAR AL CARRITO"}</span>
      <div
        className={style.add_icon}
        style={size.currentlyNotInStock ? { animation: "none", opacity: 0 } : {}}
      >
        <PlusIcon bg="#fff" heigth="1rem" width="1rem" />
      </div>
    </button>
  );
}

export default function ProductInfo({ data }) {
  const [selectedSize, setSelectedSize] = useState(data.variants.edges[0].node);
  const [quantity, setQuantity] = useState(1);
  const { formatPrice } = useFormatText()

  // const indexOfSelectedSize = data.sizes != null ? data.sizes.indexOf(selectedSize) : 0;

  return (
    <div className={style.section}>
      <div className={style.title}>
        <h1>{data.title}</h1>
        <bdi className="price">
          <span className="price_icon">$</span>
          {formatPrice(parseInt(data.priceRange.minVariantPrice.amount))}
        </bdi>
      </div>
      <div className={style.sizes}>
        {data.variants != null ? (
          data.variants.edges.map((variant) => {
            return (
              <div
                className={`${
                  variant.node.currentlyNotInStock ? style.size_nostock : null
                } ${
                  selectedSize.id == variant.node.id
                    ? style.size_selected
                    : style.size
                }`}
                key={variant.node.id}
                onClick={() => {
                  if (variant.node.currentlyNotInStock) return;
                  return setSelectedSize(variant.node);
                }}
              >
                {variant.node.title}
              </div>
            );
          })
        ) : (
          <div>TALLE UNICO</div>
        )}
      </div>
      <div className={style.cart}>
        <AddToCart
          quantity={quantity}
          size={selectedSize}
        />
      </div>
      <Accordion desc={data.description} />
    </div>
  );
}