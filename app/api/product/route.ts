import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, description, price, inStock, imageUrl } = await req.json();
  const product = await prisma.product.create({
    data: {
      name,
      price,
      description,
      inStock,
      imageUrl,
    },
  });

  return new NextResponse(JSON.stringify(product));
}
