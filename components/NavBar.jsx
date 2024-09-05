"use client";
import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";

import Cart from "./Cart";
import { useStateContext } from "@/context/StateContext";
import { ModeToggle } from "./Modetoggle";

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <div className="navbar-container ">
      <p className="logo">
        <Link href="/">Nextlevels </Link>
      </p>
      <button
        type="button"
        className="cart-icon"
        onClick={() => setShowCart(true)}
      >
        <AiOutlineShopping />
        {/* <span className="cart-item-qty">10</span> */}
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>

      {showCart && <Cart />}
      <ModeToggle />
    </div>
  );
};

export default Navbar;
