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
import { DialogClose } from "@radix-ui/react-dialog";
import { createProduct } from "@/app/actions/products";
import Swal from "sweetalert2";
import { UploadButton } from "@/utils/uploadthing";

export function CreateProductModal() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    inStock: false,
    imageUrl: "",
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      imageUrl: form.imageUrl,
    };

    try {
      await createProduct(newProduct);

      Swal.fire({
        title: "Good job!",
        text: "Product created successfully!",
        icon: "success",
      });

      setForm({
        name: "",
        price: "",
        description: "",
        inStock: false,
        imageUrl: "",
      });
      setImagePreview(null);
      setFileUploaded(false);
    } catch (error) {
      console.error("Error creating product:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to create product.",
        icon: "error",
      });
    }
  };

  const handleRemoveFile = () => {
    setForm((prev) => ({ ...prev, imageUrl: "" }));
    setImagePreview(null);
    setFileUploaded(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mr-10 bg-gradient-to-r from-purple-700 to-indigo-800 text-white hover:from-indigo-600 hover:to-purple-700 p-3 rounded-lg shadow-lg">
          Create Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-lg shadow-2xl p-8">
        <DialogHeader>
          <DialogTitle className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-600 to-red-500">
            Create Product
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-300"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="mt-2 p-3 border border-gray-600 bg-gray-800 text-gray-100 rounded-md w-full focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="price"
              className="block text-sm font-semibold text-gray-300"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="mt-2 p-3 border border-gray-600 bg-gray-800 text-gray-100 rounded-md w-full focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="description"
              className="block text-sm font-semibold text-gray-300"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              className="mt-2 p-3 border border-gray-600 bg-gray-800 text-gray-100 rounded-md w-full focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <div className="mb-5 flex items-center space-x-3">
            <label
              htmlFor="inStock"
              className="text-sm font-semibold text-gray-300"
            >
              In Stock
            </label>
            <input
              type="checkbox"
              id="inStock"
              name="inStock"
              checked={form.inStock}
              onChange={handleChange}
              className="h-6 w-6 border border-gray-600 bg-gray-800 rounded-md text-purple-600 focus:ring-2 focus:ring-purple-600"
            />
          </div>

          {fileUploaded ? (
            <button
              type="button"
              onClick={handleRemoveFile}
              className="bg-red-600 text-white p-2 rounded-md shadow-md hover:bg-red-700"
            >
              Remove File
            </button>
          ) : (
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                if (res.length > 0) {
                  const imageUrl = res[0].url;
                  setForm((prev) => ({ ...prev, imageUrl }));
                  setImagePreview(imageUrl);
                  setFileUploaded(true);
                }
              }}
              onUploadError={(error) => {
                console.error("Upload error:", error);
              }}
            />
          )}

          {imagePreview && (
            <div className="my-4">
              <img
                src={imagePreview}
                alt="Image Preview"
                className="w-40 h-40 object-cover rounded-md border border-gray-700 shadow-lg"
              />
            </div>
          )}

          {error && <div className="text-red-500 mt-3">{error}</div>}

          <DialogClose>
            <div className="mt-6">
              <button
                type="submit"
                className="bg-gradient-to-r from-purple-700 to-pink-700 text-white p-3 rounded-lg hover:from-pink-700 hover:to-purple-700 w-full shadow-xl transition-all duration-300"
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
