// import { getProductsWithPagination } from "@/app/actions/products";
import ProductCard from "@/components/ui/ProductCard";
// import { IPagination } from "@/types/type";
import { Container } from "@mui/material";
// import { Product } from "@prisma/client";
// import { useEffect, useState } from "react";

import prisma from "@/lib/db";
import { SortOrder } from "@/types";
// import { getProductsWithPagination } from "@/app/actions/products";

type Props = {
  searchParams: {
    sort: SortOrder;
  };
};

const Products = async ({ searchParams }: Props) => {
  const orderBy: Record<string, string> = {};
  if (searchParams.sort) {
    const searchKey = searchParams.sort.split("_")[0];
    const searchValue = searchParams.sort.split("_")[1];
    orderBy[searchKey] = searchValue;
  } else {
    orderBy.createdAt = "desc";
  }

  const products = await prisma.product.findMany({
    orderBy,
  });
  // const [paginationData, setPaginationData] = useState<IPagination>({
  //   skip: 0,
  //   take: 4,
  // });
  // const [products, setProducts] = useState<Product[]>([]);
  // const [disabled, setDisabled] = useState<boolean>(false);
  // const [loading, setLoading] = useState<boolean>(true);

  // const getProducts = async () => {
  // setLoading(true);
  // const { products, count } = await getProductsWithPagination(
  //   paginationData.skip,
  //   paginationData.take
  // );
  // setLoading(false);

  //   if (paginationData.skip + paginationData.take >= count) {
  //     setDisabled(true);
  //   }
  //   setProducts((prev) => [...prev, ...products]);
  // };

  // const handleChange = () => {
  //   setPaginationData((prev) => ({
  //     ...prev,
  //     skip: prev.skip + prev.take,
  //   }));
  //   // setLoading(false); // doesn't work
  // };

  // useEffect(() => {
  //   getProducts();
  // }, [paginationData]);

  return (
    <>
      <Container>
        <div className="header-products flex items-center justify-between"></div>

        {/* {loading ? (
          <div
            className="flex justify-center items-center my-20
          "
          >
            <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-600"></div>
          </div>
        ) : ( */}
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-5">
            {products &&
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
          {/* <button
            className={`${
              disabled ? "hidden" : "block"
            } font-bold translate-x-[470px] mt-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3 rounded-lg shadow-lg hover:from-indigo-600 hover:to-purple-600 hover:shadow-2xl transition duration-300 transform hover:scale-105 mb-5`}
            onClick={handleChange}
          >
            Load More Guitars
          </button> */}
        </>
        {/* )} */}
      </Container>
    </>
  );
};

export default Products;
