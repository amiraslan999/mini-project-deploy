import React, { PropsWithChildren } from "react";
import { auth } from "@clerk/nextjs/server";
import Header from "@/components/common/Header";
import prisma from "@/lib/db";
import Footer from "@/components/common/Footer";
import Cart from "@/components/ui/cart";
import { redirect } from "next/navigation";

const ClientLayout = async ({ children }: PropsWithChildren) => {
  const { userId } = auth();

  // If there's no userId, redirect to login or display a message
  if (!userId) {
    console.error("No user ID found in session.");
    redirect("/sign-in");
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      externalId: userId,
    },
  });

  if (!user) {
    console.error("User not found in the database.");
    return (
      <>
        <Header />
        <div className="text-center p-4">
          <p className="text-red-500">User not found. Please log in again.</p>
        </div>
        <Footer />
      </>
    );
  }

  // Fetch the user's cart
  const cart = await prisma.cart.findUnique({
    where: {
      userId: user.id,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  const totalItems = cart!.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <>
      <Header />
      {children}
      {cart ? (
        <Cart cart={cart} totalItems={totalItems} />
      ) : (
        <div className="text-center p-4">
          <p className="text-gray-500">Your cart is empty.</p>
        </div>
      )}
      <Footer />
    </>
  );
};

export default ClientLayout;
