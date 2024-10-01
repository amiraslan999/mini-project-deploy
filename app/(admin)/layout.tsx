import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import { PropsWithChildren } from "react";

const ClientLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default ClientLayout;
