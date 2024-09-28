"use client";

import { deleteProduct } from "@/app/actions/products";
import { DeleteButtonProps } from "@/types/type";
import Swal from "sweetalert2";

const DeleteButton: React.FC<DeleteButtonProps> = (props) => {
  return (
    <>
      <button
        className="rounded-md p-2 my-8 bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-indigo-600 hover:to-purple-600"
        onClick={() => {
          Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
          }).then((result) => {
            if (result.isConfirmed) {
              deleteProduct(props.id);
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          });
        }}
      >
        Delete
      </button>
    </>
  );
};

export default DeleteButton;
