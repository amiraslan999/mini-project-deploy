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

export type UploadFileResponse<TServerOutput> = {
  name: string;
  size: number;
  key: string;
  url: string;
  customId: string | null;
  serverData: TServerOutput;
};
