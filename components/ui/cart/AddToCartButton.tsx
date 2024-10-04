"use client";

import { useState } from "react";
import { addToCart } from "@/app/actions/cart";
import toast, { Toaster } from "react-hot-toast";

const AddToCartButton = ({ productId }: { productId: string }) => {
  const [loading, setLoading] = useState(false);
  const [showToaster, setShowToaster] = useState(false); // New state for Toaster

  const handleAddToCart = async () => {
    setLoading(true);
    setShowToaster(true); // Show Toaster when button is clicked
    const toastId = toast.loading("Adding to cart...");

    try {
      await addToCart({ productId, quantity: 1 });
      toast.success("Added to cart!", { id: toastId });
    } catch (error) {
      toast.error("Error adding to cart!", { id: toastId });
      console.error("Error adding to cart:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {showToaster && <Toaster position="top-right" reverseOrder={false} />}
      <button
        onClick={handleAddToCart}
        disabled={loading}
        className="ml-auto flex items-center justify-center"
      >
        {loading ? (
          <svg
            className="animate-spin h-5 w-5 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-bag-plus"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
            />
            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
          </svg>
        )}
      </button>
    </>
  );
};

export default AddToCartButton;
