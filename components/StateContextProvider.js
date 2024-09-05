"use client";

import { StateContext } from "@/context/StateContext";

export default function StateContextProvider({ children }) {
  return <StateContext>{children}</StateContext>;
}
