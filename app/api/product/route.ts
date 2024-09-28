import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const { name, description, price, inStock, image } = await req.json();
  const product = await prisma.product.create({
    data: {
      name,
      price,
      description,
      inStock,
      image,
    },
  });

  return new NextResponse(JSON.stringify(product));
}
