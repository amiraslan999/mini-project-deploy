"use client";

import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { Loader2Icon } from "lucide-react";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

const AuthLayout = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  return (
    <>
      <div className="min-h-screen flex items-center justify-center flex-col">
        <h1 className="mb-1 text-black text-2xl font-bold ">
          {pathname === "/sign-in" ? "Hey, Welcome again !!!" : "Welcome !!!"}
        </h1>
        <p className="max-w-[400px] text-sm text-muted-foreground text-center mb-3">
          {pathname === "/sign-in"
            ? "Log into, and enjoy your site !"
            : "This is the authentication layout. You can use this layout to provide authentication pages to your users."}
        </p>
        <ClerkLoaded>{children}</ClerkLoaded>
        <ClerkLoading>
          <Loader2Icon className="animate-spin" />
        </ClerkLoading>
      </div>
    </>
  );
};

export default AuthLayout;
