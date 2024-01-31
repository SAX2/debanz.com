"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { getTotalQuantityCart } from "../utils/shopify";

export const CartContext = createContext();

export function CartContextProvider({ children }) {
  const [cart, setCart] = useState({
    id: "",
    isEmpty: true,
    items: [],
    totalItems: 0,
    totalPrice: 0,
    totalUniqueItems: 0,
  });
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    const bag = localStorage.getItem("bag");
    if (!bag || bag.length <= 0)
      return localStorage.setItem("bag", JSON.stringify(cart));
    return setCart(JSON.parse(bag));
  }, []);

  useEffect(() => {
    localStorage.setItem("bag", JSON.stringify(cart));
  }, [cart]);

  const countOfProducts = async (id) => {
    const {
      data: { cart },
    } = await getTotalQuantityCart(id);
    if (cart == null) return;
    // return setTotalQuantity(cart.totalQuantity)
    return setTotalQuantity(cart.totalQuantity); //delete
  };

  useEffect(async () => {
    const cartId = sessionStorage.getItem("cartId");
    if (!cartId) return;
    return await countOfProducts(cartId);
  }, []);

  const addToBag = (item) => {
    const itemPrice = parseInt(item.price.split(".")[0]);
    const existingProductIndex = cart.items.findIndex(
      (i) => i.id === item.id && i.size === item.size,
    );

    if (existingProductIndex !== -1) {
      const existingProduct = cart.items[existingProductIndex];
      if (
        existingProduct.total + 1 >
        existingProduct.stock[
          existingProduct.sizes.indexOf(existingProduct.size)
        ]
      ) {
        return toast.error("No hay suficiente stock disponible");
      }
      existingProduct.total += 1;

      const newItems = [...cart.items];
      newItems[existingProductIndex] = existingProduct;

      setCart({
        ...cart,
        items: newItems,
        totalItems: cart.totalItems + 1,
        totalPrice: cart.totalPrice + itemPrice,
      });
    } else {
      if (item.total > item.stock) {
        toast.error("No hay suficiente stock disponible");
        return;
      }
      const newItems = [...cart.items, { ...item }];

      setCart({
        ...cart,
        items: newItems,
        totalItems: cart.totalItems + 1,
        totalPrice: cart.totalPrice + itemPrice,
      });
    }
  };

  const deleteFromBag = (item) => {
    const itemPrice = parseInt(item.price.split(".")[0]);
    const index = cart.items.findIndex(
      (i) => i.id === item.id && i.size === item.size,
    );
    cart.items.splice(index, 1);

    setCart({
      ...cart,
      totalItems: cart.totalItems - item.total,
      totalPrice: cart.totalPrice - itemPrice * item.total,
    });

    toast.success("Eliminado del carrito", { duration: 1500 });
  };

  const subtractCounter = (id) => {
    const itemIndex = cart.items.findIndex((item) => item.id === id);

    if (itemIndex === -1) {
      return;
    }

    const product = cart.items[itemIndex];
    const newItems = [...cart.items];
    const newTotalPrice =
      cart.totalPrice - parseInt(product.price.split(".")[0]);

    if (product.total === 1) {
      newItems.splice(itemIndex, 1);
    } else {
      product.total = product.total - 1;
      newItems[itemIndex] = product;
    }

    setCart({
      ...cart,
      items: newItems,
      totalItems: cart.totalItems - 1,
      totalPrice: newTotalPrice,
      totalUniqueItems: newItems.length,
    });
  };

  const addCounter = (item) => {
    const itemPrice = parseInt(item.price.split(".")[0]);
    const existingProductIndex = cart.items.findIndex(
      (i) => i.id === item.id && i.size === item.size,
    );

    if (existingProductIndex !== -1) {
      const existingProduct = cart.items[existingProductIndex];

      if (
        existingProduct.total + 1 >
        existingProduct.stock[
          existingProduct.sizes.indexOf(existingProduct.size)
        ]
      ) {
        return toast.error("No hay suficiente stock disponible");
      }

      existingProduct.total += 1;

      const newItems = [...cart.items];
      newItems[existingProductIndex] = existingProduct;

      setCart({
        ...cart,
        items: newItems,
        totalItems: cart.totalItems + 1,
        totalPrice: cart.totalPrice + itemPrice,
      });
    } else {
      const newItems = [...cart.items, { ...item, total: 1 }];

      setCart({
        ...cart,
        items: newItems,
        totalItems: cart.totalItems + 1,
        totalPrice: cart.totalPrice + itemPrice,
        totalUniqueItems: cart.totalUniqueItems + 1,
      });
    }
  };

  const clearCart = () => {
    return setCart({
      id: cart.id,
      isEmpty: true,
      items: [],
      totalItems: 0,
      totalPrice: 0,
      totalUniqueItems: 0,
    });
  };

  return (
    <CartContext.Provider
      value={{
        addToBag,
        totalItems: cart.totalItems,
        cart,
        countOfProducts,
        deleteFromBag,
        subtractCounter,
        addCounter,
        clearCart,
        totalQuantity,
        countOfProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCartContext = () => useContext(CartContext);
