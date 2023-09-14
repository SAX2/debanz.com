"use client";
import { createContext, useContext, useState } from "react"

const BagContext = createContext();

export default function BagContextProvider({ children }) {
  const [openBag, setOpenBag] = useState(false)

  return (
    <BagContext.Provider value={{
      setOpenBag,
      openBag
    }}>
      {children}
    </BagContext.Provider>
  )
}

export const useBagContext = () => useContext(BagContext);