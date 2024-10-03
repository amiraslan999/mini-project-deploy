"use client";

import { ShoppingCartIcon } from "lucide-react";
import { Button } from "../button";
import { UseCartModal } from "@/hooks/use-cart-modal";

const CartButton = () => {
  const { open } = UseCartModal();
  return (
    <>
      <Button
        onClick={open}
        className="hover:bg-slate-300 hover:text-black hover:transition"
        size={"sm"}
      >
        <ShoppingCartIcon />
      </Button>
    </>
  );
};

export default CartButton;
