"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getProductsWithPagination(skip: number, take: number) {
  const products = await prisma.product.findMany({
    skip: skip,
    take: take,
  });
  const count = await prisma.product.count();
  return { count, products };
}

export async function createProduct(newProduct: {
  name: string;
  price: number;
  description: string;
  inStock: boolean;
  image: string;
}) {
  const product = await prisma.product.create({
    data: newProduct,
  });

  revalidatePath("/products");

  return product;
}

export async function deleteProduct(id: string) {
  const product = await prisma.product.delete({
    where: {
      id,
    },
  });

  revalidatePath("/products");

  return product;
}
