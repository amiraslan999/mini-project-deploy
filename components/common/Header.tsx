"use client";

import Container from "@mui/material/Container";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import Logo from "../../public/logo.svg";
import { DropdownMenuRadioGroupDemo } from "../ui/dropdown";
import { useRouter } from "next/navigation";

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
