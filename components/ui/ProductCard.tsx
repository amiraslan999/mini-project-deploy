import DeleteButton from "@/app/(admin)/products/(list)/components/product-delete";
import { ProductCardProps } from "@/types/type";
import Link from "next/link";

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group bg-white border border-gray-200 rounded-lg shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-2 hover:bg-gray-100">
      <div className="overflow-hidden">
        <img
          src={product.image}
          alt="guitars"
          className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4">
        <h2
          className={`text-xl font-bold mb-2 text-gray-800 ${
            product.inStock
              ? "group-hover:text-green-600"
              : "group-hover:text-red-600"
          } transition-colors duration-300 h-[55px] overflow-auto`}
        >
          {product.name}
        </h2>
        <p className="text-lg font-semibold text-gray-700 mb-2">
          ${product.price}
        </p>
        <p className="text-sm text-gray-600 mb-4 h-[60px] overflow-hidden">
          {product.description}
        </p>
        <p
          className={`text-sm font-medium ${
            product.inStock ? "text-green-600" : "text-red-600"
          }`}
        >
          {product.inStock ? "In Stock" : "Out of Stock"}
        </p>
        <DeleteButton id={product.id} />
        <Link href={`/products/${product.id}`}>
          <button className=" ml-5 rounded-md p-2 my-8 bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-indigo-600 hover:to-purple-600">
            Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
