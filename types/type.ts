import { Product } from "@prisma/client";

export interface IPagination {
  skip: number;
  take: number;
}

export interface ProductCardProps {
  product: Product;
}

export interface DeleteButtonProps {
  id: string;
}
