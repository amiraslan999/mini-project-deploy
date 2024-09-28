"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UploadButton } from "@/src/utils/uploadthing";
import { DialogClose } from "@radix-ui/react-dialog";
import { createProduct } from "@/app/actions/products";

export function CreateProductModal() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    inStock: false,
    imageUrl: "",
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<any[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    const { name, price, description, imageUrl } = form;
    if (!name || !price || !description || !imageUrl) {
      setError("All fields (including image) are required.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newProduct = {
      name: form.name,
      price: Number(form.price),
      description: form.description,
      inStock: form.inStock,
      image: form.imageUrl,
    };

    await createProduct(newProduct);

    setProducts((prev) => [...prev, newProduct]);

    setForm({
      name: "",
      price: "",
      description: "",
      inStock: false,
      imageUrl: "",
    });
    setImagePreview(null);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="my-8 bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-indigo-600 hover:to-purple-600">
          Create Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-lg shadow-lg p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-100 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
            Create Product
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-600 bg-gray-800 text-gray-100 rounded-md w-full"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-300"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-600 bg-gray-800 text-gray-100 rounded-md w-full"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-300"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-600 bg-gray-800 text-gray-100 rounded-md w-full"
            />
          </div>

          <div className="mb-4 flex items-center space-x-2">
            <label
              htmlFor="inStock"
              className="text-sm font-medium text-gray-300"
            >
              In Stock
            </label>
            <input
              type="checkbox"
              id="inStock"
              name="inStock"
              checked={form.inStock}
              onChange={handleChange}
              className="h-5 w-5 border border-gray-600 bg-gray-800 rounded-md text-purple-600"
            />
          </div>

          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              if (res.length > 0) {
                const imageUrl = res[0].url;
                setForm((prev) => ({ ...prev, imageUrl }));
                setImagePreview(imageUrl);
              }
            }}
            onUploadError={(error) => {
              console.error("Upload error:", error);
            }}
          />

          {imagePreview && (
            <div className="mt-4">
              <img
                src={imagePreview}
                alt="Image Preview"
                className="w-40 h-40 object-cover"
              />
            </div>
          )}

          {error && <div className="text-red-500 mt-2">{error}</div>}

          <DialogClose>
            <div className="mb-4">
              <button
                type="submit"
                className="bg-gradient-to-r from-purple-700 to-pink-700 text-white p-2 rounded-md hover:from-pink-700 hover:to-purple-700 w-full"
              >
                Create
              </button>
            </div>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  );
}
