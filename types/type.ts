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
  // The data returned from the `onUploadComplete` callback on
  // the file route. Note that if `RouteOptions.awaitServerData`
  // isn't enabled this will be `null`.
  serverData: TServerOutput;
};
