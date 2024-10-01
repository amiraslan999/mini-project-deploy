import { PropsWithChildren } from "react";
import TableLayout from "./components/filter";

const ProductsLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <TableLayout>{children}</TableLayout>
    </>
  );
};

export default ProductsLayout;
