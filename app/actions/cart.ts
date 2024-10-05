"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/db";

export async function getCart() {
  const { userId } = auth();
  if (!userId) throw new Error("No user ID found");
  const user = await prisma.user.findUnique({
    where: {
      externalId: userId,
    },
    include: {
      cart: true,
    },
  });
  if (!user?.cart) throw new Error("No cart found");

  return user?.cart;
}

export async function getCartWithItems() {
  const { userId } = auth();
  if (!userId) throw new Error("No user ID found");
  const user = await prisma.user.findUnique({
    where: {
      externalId: userId,
    },
    include: {
      cart: {
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      },
    },
  });
  if (!user?.cart) throw new Error("No cart found");

  // Calculate the total quantity of items
  const totalItems = user.cart.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return { cart: user.cart, totalItems }; // Return both cart and totalItems
}

export async function addToCart({
  productId,
  quantity,
}: {
  productId: string;
  quantity: number;
}) {
  const cart = await getCart();

  let cartItem = await prisma.cartItem.findFirst({
    where: {
      productId,
      cartId: cart.id,
    },
  });
  if (!cartItem) {
    cartItem = await prisma.cartItem.create({
      data: {
        quantity,
        product: {
          connect: {
            id: productId,
          },
        },
        cart: {
          connect: {
            id: cart.id,
          },
        },
      },
    });
  } else {
    cartItem = await prisma.cartItem.update({
      where: {
        id: cartItem.id,
      },
      data: {
        quantity: cartItem.quantity + quantity,
      },
    });
  }

  revalidatePath("/");

  return cartItem;
}

export async function removeFromCart({ cartItemId }: { cartItemId: string }) {
  await prisma.cartItem.delete({
    where: {
      id: cartItemId,
    },
  });

  revalidatePath("/");
}

export async function increaseCartItem({ cartItemId }: { cartItemId: string }) {
  const cartItem = await prisma.cartItem.findUnique({
    where: { id: cartItemId },
  });
  if (!cartItem) throw new Error("Cart item not found");

  await prisma.cartItem.update({
    where: { id: cartItemId },
    data: { quantity: cartItem.quantity + 1 },
  });

  revalidatePath("/");
}

export async function decreaseCartItem({ cartItemId }: { cartItemId: string }) {
  const cartItem = await prisma.cartItem.findUnique({
    where: { id: cartItemId },
  });
  if (!cartItem) throw new Error("Cart item not found");

  if (cartItem.quantity > 1) {
    await prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity: cartItem.quantity - 1 },
    });
  } else {
    await prisma.cartItem.delete({
      where: { id: cartItemId },
    });
  }

  revalidatePath("/");
}
