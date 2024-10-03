import ProductCard from "@/components/ui/ProductCard";
import { Container } from "@mui/material";
import prisma from "@/lib/db";

import { SortOrder } from "@/types";

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

  return (
    <>
      <Container>
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-5">
            {products &&
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        </>
      </Container>
    </>
  );
};

export default Products;
