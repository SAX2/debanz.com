"use client";
import { BackIcon, CloseIcon, MinusIcon, PlusIcon, TrashIcon } from "../../../components/Icons";
import { useCartContext } from '../../../context/CartContext'
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { getShipmentPrice } from "@/app/config";
import useFormatText from "@/app/hooks/useFormatText";
import { toast } from "sonner";

const BagProduct = ({ data, style }) => {
  const { deleteFromBag, subtractCounter, addCounter } = useCartContext();  
  const { formatPrice } = useFormatText();
  console.log(formatPrice(data.price))

  return (
    <div className={style.bag_product_container}>
      <div className={style.bag_p_main}>
        <div className={style.bag_p_image_container}>
          <Image
            src={data.images[0]}
            alt={data.name}
            width={330}
            height={330}
          />
        </div>
        <div className={style.bag_p_info}>
          <div className={style.bag_p_info_top}>
            <div>
              <p className={style.bag_p_title}>{data.name}</p>
              <div className={style.bag_p_options}>
                <button onClick={() => deleteFromBag(data)}>Quitar</button>
              </div>
            </div>
            <p className={style.bag_p_size}>TALLE: {data.size}</p>
          </div>
          <div className={style.bag_p_info_bottom}>
            <div className={style.bag_p_counter_container}>
              <button
                className={style.bag_p_counter_button}
                onClick={() => subtractCounter(data.id, data.size)}
              >
                <MinusIcon width={16} heigth={16} bg={`#AAA`} />
              </button>
              <span>{data.total}</span>
              <button
                className={style.bag_p_counter_button}
                onClick={() =>
                  data.total + 1 > data.stock ? null : addCounter(data)
                }
              >
                <PlusIcon width={16} heigth={16} bg={`#AAA`} />
              </button>
            </div>
            <bdi className="price">
              <span className="price_icon">$</span>
              {formatPrice(data.price)}
            </bdi>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Bag({ setOpenBag, style }) {
  const { cart } = useCartContext();  
  const { formatPrice } = useFormatText()
  const [shipIsOpen, setShipIsOpen] = useState(false)
  const [shippingData, setShippingData] = useState({ zip_code: "", weigth: 200 })
  const [shippingPrice, setShippingPrice] = useState(0)


  const handleSubbmit = async (e) => {
    e.preventDefault();
    // cart.items.map(p => {
    //   setShippingData({
    //     ...shippingData,
    //     weigth: p.weight + shippingData.weigth,
    //   });
    // })
    if (shippingData.zip_code.length == 0) return setShippingPrice(0)
    const data = await getShipmentPrice({ zip_code: shippingData.zip_code, weight: shippingData.weigth })
    if (data == undefined) return toast.error('Ingrese un codigo postal valido')
    return setShippingPrice(data.tax_price);
  }

  return (
    <div className={style.b_container}>
      <div className={style.b_top}>
        <div className={style.b_head_container}>
          <p>CARRITO DE COMPRAS</p>
          <button
            className={style.m_close_button}
            onClick={() => setOpenBag((bag) => !bag)}
          >
            <CloseIcon bg="#000" width={20} heigth={20} />
          </button>
        </div>
        <div className={style.b_body_container}>
          {cart.items.length < 1 ? (
            <div
              style={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <p
                style={{ color: "#aaa", fontSize: 22, marginTop: "calc(70%)" }}
              >
                El Carrito esta vacio
              </p>
            </div>
          ) : (
            <>
              {cart.items.map((item, index) => {
                if (index == 0)
                  return <BagProduct data={item} key={item.id} style={style} />;
                else
                  return (
                    <>
                      <div className="separator"></div>
                      <BagProduct data={item} key={item.id} style={style} />
                    </>
                  );
              })}
            </>
          )}
        </div>
      </div>
      <div className={style.b_bottom}>
        {cart.items.length > 0 && (
          <>
            <div className={style.b_ship_container}>
              <button
                onClick={() => setShipIsOpen((prevState) => !prevState)}
                className={style.b_ship_open_btn}
              >
                <div
                  className={
                    shipIsOpen
                      ? style.b_ship_open_btn_svg_open
                      : style.b_ship_open_btn_svg
                  }
                >
                  <BackIcon bg={"#000"} height={20} width={20} />
                </div>
                CALCULAR ENVIO
              </button>
              <div
                className={style.b_ship}
                style={shipIsOpen ? { display: "flex" } : { display: "none" }}
              >
                <form onSubmit={(e) => handleSubbmit(e)}>
                  <div className={style.form}>
                    <div>
                      <p>Shipnow - Entrega Estandar</p>
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Codigo postal"
                        onChange={(e) =>
                          setShippingData({
                            ...shippingData,
                            zip_code: e.target.value,
                          })
                        }
                        value={shippingData.zip_code}
                      />
                      <input type="submit" value="Calcular" />
                    </div>
                  </div>
                  <div className={style.b_shipping_price_container}>
                    <p>Precio</p>
                    {shippingPrice == 0 ? null : (
                      <bdi className="price">
                        <span className="price_icon">$</span>
                        {formatPrice(shippingPrice)}
                      </bdi>
                    )}
                  </div>
                </form>
              </div>
            </div>
            <div className="separator"></div>
          </>
        )}
        <div className={style.b_buttons}>
          {cart.items.length > 0 && (
            <>
              <div className={style.b_subtotal}>
                <p>SUBTOTAL:</p>
                <bdi className="price">
                  <span className="price_icon">$</span>
                  {formatPrice(cart.totalPrice + shippingPrice)}
                </bdi>
              </div>
              <Link href={"/checkout"} className={style.b_btn_checkout}>
                FINALIZAR COMPRA
              </Link>
            </>
          )}
          <Link
            href={"/productos"}
            className={style.b_btn_continue}
            onClick={() => setOpenBag(false)}
          >
            Seguir comprando
          </Link>
        </div>
      </div>
    </div>
  );
}