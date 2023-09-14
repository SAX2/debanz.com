"use client";

import { CloseIcon, MinusIcon, PlusIcon } from "../../../components/Icons";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { retrieveCart, updateItemQuantityCart } from "@/app/utils/shopify";
import Image from "next/image";
import Link from "next/link";
import useFormatText from "@/app/hooks/useFormatText";
import { useCartContext } from "@/app/context/CartContext";

const BagProduct = ({ data, style, cartId, setCart }) => {
  const { formatPrice } = useFormatText();
  const { countOfProducts } = useCartContext();

  const addFunction = async () => {
    const quantity = data.quantity + 1;
    const update = await updateItemQuantityCart({
      cartId: cartId,
      itemId: data.id,
      quantity: quantity
    });
    const updatedItem = update.lines.edges.filter(i => i.node.id == data.id)
    if (updatedItem && updatedItem[0].node.quantity == data.quantity) {
      toast.error("No se puede agregar mas cantidad a este producto.");
    }
    data.quantity = quantity
    await countOfProducts(cartId);
    return setCart(update)
  }

  const substractFunction = async () => {
    const quantity = data.quantity - 1;
    const update = await updateItemQuantityCart({
      cartId: cartId,
      itemId: data.id,
      quantity: quantity
    });
    data.quantity = quantity
    await countOfProducts(cartId);
    return setCart(update);
  }

  const deleteFromCart = async () => {
    const update = await updateItemQuantityCart({
      cartId: cartId,
      itemId: data.id,
      quantity: 0,
    });
    await countOfProducts(cartId);
    return setCart(update);
  }

  return (
    <div className={style.bag_product_container}>
      <div className={style.bag_p_main}>
        <div className={style.bag_p_image_container}>
          <Image
            src={data.merchandise.image.url}
            alt={data.name}
            title={data.name}
            width={330}
            height={330}
          />
        </div>
        <div className={style.bag_p_info}>
          <div className={style.bag_p_info_top}>
            <div>
              <p className={style.bag_p_title}>
                {data.merchandise.product.title}
              </p>
              <div className={style.bag_p_options}>
                <button onClick={deleteFromCart}>Quitar</button>
              </div>
            </div>
            <p className={style.bag_p_size}>{data.merchandise.title}</p>
          </div>
          <div className={style.bag_p_info_bottom}>
            <div className={style.bag_p_counter_container}>
              <button
                className={style.bag_p_counter_button}
                onClick={substractFunction}
              >
                <MinusIcon width={16} heigth={16} bg={`#AAA`} />
              </button>
              <span>{data.quantity}</span>
              <button
                className={style.bag_p_counter_button}
                onClick={addFunction}
              >
                <PlusIcon width={16} heigth={16} bg={`#AAA`} />
              </button>
            </div>
            <bdi className="price">
              <span className="price_icon">$</span>
              {formatPrice(parseInt(data.cost.totalAmount.amount))}
            </bdi>
          </div>
        </div>
      </div>
    </div>
  );
}
 

export const CloseButton = ({ setOpenBag, style, setStyleClass }) => {
  return <button
    className={style.m_close_button}
    onClick={() => {
      setStyleClass(true);
      setTimeout(() => {
        setStyleClass(false);
        setOpenBag((bag) => !bag);
      }, 400);
    }}
  >
    <CloseIcon bg="#000" width={20} heigth={20} />
  </button>;
};

export default function Bag({ setOpenBag, style, setStyleClass }) {
  const [cart, setCart] = useState();
  const cartId = sessionStorage.getItem('cartId')

  const { formatPrice } = useFormatText();

  const fetchCart = async (cartId) => {
    const data = await retrieveCart(cartId);
    if (data == null) return;
    return setCart(data);
  };
  
  useEffect(() => {
    if (!cartId) return;
    fetchCart(cartId);
  }, []);

  return (
    <div className={style.b_container}>
      {!cartId || !cart ? (
        <div className={style.b_top} style={{ height: "100%" }}>
          <div className={style.b_head_container}>
            <h1>CARRITO DE COMPRAS</h1>
            <CloseButton
              setOpenBag={setOpenBag}
              setStyleClass={setStyleClass}
              style={style}
            />
          </div>
          <div
            style={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p style={{ color: "#aaa", fontSize: 22 }}>El Carrito esta vacio</p>
          </div>
        </div>
      ) : (
        <>
          {cart !== undefined && (
            <>
              <div className={style.b_top}>
                <div className={style.b_head_container}>
                  <h1>CARRITO DE COMPRAS</h1>
                  <CloseButton
                    setOpenBag={setOpenBag}
                    setStyleClass={setStyleClass}
                    style={style}
                  />
                </div>
                <div className={style.b_body_container}>
                  {cart.lines.edges.map((item) => {
                    return (
                      <>
                        <BagProduct
                          data={item.node}
                          key={item.node.id}
                          style={style}
                          setCart={setCart}
                          cartId={cartId}
                        />
                        <div className="separator"></div>
                      </>
                    );
                  })}
                </div>
              </div>
              <div className={style.b_bottom}>
                <div className={style.b_buttons}>
                  <div className={style.b_subtotal}>
                    <p>SUBTOTAL:</p>
                    <bdi className="price">
                      <span className="price_icon">$</span>
                      {formatPrice(parseInt(cart.cost.totalAmount.amount))}
                    </bdi>
                  </div>
                  <a href={cart.checkoutUrl} className={style.b_btn_checkout}>
                    FINALIZAR COMPRA
                  </a>
                  <Link
                    href={"/productos"}
                    className={style.b_btn_continue}
                    onClick={() => setOpenBag(false)}
                  >
                    Seguir comprando
                  </Link>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}