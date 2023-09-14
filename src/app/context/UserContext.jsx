"use client";
import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation";

const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [checkoutInfo, setCheckoutInfo] = useState({});
  const router = useRouter();

  useEffect(() => {
    const userLs = localStorage.getItem('user_auth');
    if (!userLs) localStorage.setItem("user_auth", user);
    else setUser(JSON.parse(userLs));

    const checkout = localStorage.getItem('checkout_info');
    if (!checkout) localStorage.setItem("checkout_info", "");
    else setCheckoutInfo(JSON.parse(checkout))
  }, [])

  useEffect(() => {
    localStorage.setItem('user_auth', JSON.stringify(user));
  }, [user])

  useEffect(() => {
    localStorage.setItem('checkout_info', JSON.stringify(checkoutInfo));
  }, [checkoutInfo])

  const getUser = () => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem('user_auth')
      const userStr = JSON.parse(user)
      return userStr;
    }
  }

  const CloseSession = () => {
    setUser({});
    return router.push("/panel/login");
  };

  return (
    <UserContext.Provider value={{
      user,
      setUser,
      setCheckoutInfo,
      checkoutInfo,
      getUser,
      CloseSession
    }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => useContext(UserContext);