// import Footer from "@/components/common/Footer";
// import Header from "@/components/common/Header";
// import Cart from "@/components/ui/cart";
// import prisma from "@/lib/db";
// import { auth } from "@clerk/nextjs/server";
// import { PropsWithChildren } from "react";

// const ClientLayout = async ({ children }: PropsWithChildren) => {
//   const { userId } = auth();
//   const user = await prisma.cart.findUnique({
//     where: {
//       externalId: userId!,
//     },
//   });
//   const cartItems = await prisma.cartItem.findMany();
//   return (
//     <>
//       <Header />
//       <Cart />
//       {children}
//       <Footer />
//     </>
//   );
// };

// export default ClientLayout;

import React, { PropsWithChildren } from "react";
import { auth, clerkClient } from "@clerk/nextjs/server";

import Header from "@/components/common/Header";
import prisma from "@/lib/db";
import Footer from "@/components/common/Footer";
import Cart from "@/components/ui/cart";
import { SafeCart } from "@/types";

const ClientLayout = async ({ children }: PropsWithChildren) => {
  const { userId, sessionId } = auth();
  const user = await prisma.user.findUnique({
    where: {
      externalId: userId!,
    },
  });
  if (!user) {
    console.log("User not found");

    clerkClient().sessions.revokeSession(sessionId!);
  }

  const cart = await prisma.cart.findUnique({
    where: {
      userId: user!.id,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });
  return (
    <>
      <Header />
      {children}
      <Cart cart={cart as SafeCart} />
      <Footer />
    </>
  );
};

export default ClientLayout;
