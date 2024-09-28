"use client";

import Container from "@mui/material/Container";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-black py-6 text-white">
      <Container>
        <h4 className="text-center mb-10 font-protest">
          VISIT THE GIBSON FAMILY
        </h4>
        <div className="flex justify-between items-center mb-14">
          <img
            src="https://images.ctfassets.net/m8onsx4mm13s/7LvvcLDhK4OSfSTXHRAPis/c0a3a0c2a16ff9c9723dd05fc27b89d5/logo-gibson-white.svg"
            alt="gibson-logo"
          />
          <img
            src="https://images.ctfassets.net/m8onsx4mm13s/2vuAzO488GYR7lW1ZPv2zN/1ee1a3e256231cbfd5666b52595e0681/logo-epiphone-white.svg"
            alt="gibson-logo"
          />
          <img
            src="https://images.ctfassets.net/m8onsx4mm13s/3wJBD5R9NsUGp9bUizkcqC/d5a17a1e90708ba5c9b07af898377e16/logo-kramer-white.svg"
            alt="gibson-logo"
          />
          <img
            src="https://images.ctfassets.net/m8onsx4mm13s/52ZxsgyuuWjWD76SMpethr/5822f0a709ec513eb7f5eb9fddcd39af/logo-steinberger-white.svg"
            alt="gibson-logo"
          />
          <img
            src="https://images.ctfassets.net/m8onsx4mm13s/i6ci5z3HECPtIJelzXlLF/2d2d28b5ba9d5d492bfd6a6363fe8a08/logo-krk-white.svg"
            alt="gibson-logo"
          />
          <img
            src="https://images.ctfassets.net/m8onsx4mm13s/2ARgLVx3fMLpkrpN2u3TJO/6833a087050b0cd52708c29610e9057f/logo-mesa-boogie-white.png"
            alt="gibson-logo"
          />
        </div>
        <div className="flex justify-between items-center">
          <div className="left-side text-sm">
            <p>
              &copy; {new Date().getFullYear()} Guitar Shop. All rights
              reserved.
            </p>
          </div>

          <div className="right-side text-sm">
            <p>
              Follow us on
              <Link
                className="font-protest ml-2"
                href={"https://www.instagram.com/gibsonguitar/"}
              >
                Instagram
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
