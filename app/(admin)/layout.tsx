import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import Cart from "@/components/ui/cart";
import { PropsWithChildren } from "react";

const ClientLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <Cart />
      {children}
      <Footer />
    </>
  );
};

export default ClientLayout;
