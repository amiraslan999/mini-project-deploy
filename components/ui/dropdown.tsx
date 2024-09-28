"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Hook to detect path changes

export function DropdownMenuRadioGroupDemo() {
  const [open, setOpen] = React.useState(false);
  const [position, setPosition] = React.useState("bottom");
  const pathname = usePathname(); // Get current pathname

  // Close dropdown on page change
  React.useEffect(() => {
    if (open) {
      setOpen(false);
    }
  }, [pathname]); // When the pathname changes, close the dropdown

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button className="bg-gray-900 hover:bg-white text-white hover:text-green-900 font-semibold py-2 px-6 rounded-full shadow-lg transition-all duration-300 ease-in-out">
          Discover
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 bg-gray-200 rounded-lg shadow-xl p-3 transform transition-all duration-300 ease-in-out"
        sideOffset={5}
      >
        <DropdownMenuLabel className="text-lg font-bold text-gray-700 mb-2">
          Pages
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="border-b my-2 border-gray-300" />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <ul className="space-y-2">
            <li>
              <Link
                href="/products"
                className="block py-2 px-4 rounded-lg bg-gray-100 hover:bg-gray-900 hover:text-white transition-colors duration-200"
              >
                Products
              </Link>
            </li>
            <li className="block py-2 px-4 rounded-lg bg-gray-100 hover:bg-gray-900 hover:text-white transition-colors duration-200 cursor-pointer">
              About Us
            </li>
            <li className="block py-2 px-4 rounded-lg bg-gray-100 hover:bg-gray-900 hover:text-white transition-colors duration-200 cursor-pointer">
              Contact
            </li>
          </ul>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
