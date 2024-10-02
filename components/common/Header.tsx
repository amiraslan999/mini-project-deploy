"use client";

import Container from "@mui/material/Container";
import { UserButton } from "@clerk/nextjs";
import { DropdownMenuRadioGroupDemo } from "../ui/dropdown";
import { useRouter } from "next/navigation";
import Logo from "@/public/logo.svg";
import Image from "next/image";

const Header = () => {
  const router = useRouter();

  return (
    <header className="bg-black py-6 text-white">
      <Container>
        <nav className="flex justify-between items-center">
          <div className="left-side flex items-center gap-x-5">
            <DropdownMenuRadioGroupDemo />
          </div>
          <div className="middle-side">
            <Image
              width={120}
              height={120}
              className="cursor-pointer transform translate-x-[-60px]"
              onClick={() => router.push("/")}
              src={Logo}
              alt="Main Logo"
            />
          </div>
          <div className="right-side flex items-center gap-x-5">
            <UserButton />
          </div>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
