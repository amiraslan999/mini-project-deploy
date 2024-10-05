import prisma from "@/lib/db";
import { Container } from "@mui/material";

const ProductDetailPage = async ({ params }: { params: { id: string } }) => {
  const product = await prisma.product.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!product) {
    return (
      <h1 className="text-4xl font-bold text-center text-red-600 dark:text-red-400">
        Product Not Found !!!
      </h1>
    );
  }

  return (
    <>
      <section className="bg-gray-900 py-10 lg:py-16">
        <Container>
          <div className="relative flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0 lg:space-x-12 bg-gray-800 rounded-lg p-6 md:p-8 lg:p-10 shadow-lg hover:shadow-2xl transition-shadow duration-500">
            {/* Product Image */}
            <div className="w-full lg:w-1/2">
              <div className="overflow-hidden rounded-lg shadow-lg">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="w-full lg:w-1/2 flex flex-col space-y-4 md:space-y-6">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-100">
                {product.name}
              </h1>

              <p className="text-2xl md:text-3xl text-indigo-300 font-semibold">
                ${product.price}
              </p>

              <p className="text-sm md:text-lg text-gray-300">
                {product.description}
              </p>

              <p
                className={`text-lg md:text-xl font-medium ${
                  product.inStock ? "text-green-500" : "text-red-500"
                }`}
              >
                {product.inStock ? "In Stock" : "Out of Stock"}
              </p>

              <button
                className={`mt-4 md:mt-6 ${
                  product.inStock
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-indigo-600 hover:to-purple-600"
                    : "bg-gray-600 opacity-30 cursor-not-allowed"
                } text-white px-6 py-2 md:px-8 md:py-3 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105`}
                disabled={!product.inStock}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default ProductDetailPage;
