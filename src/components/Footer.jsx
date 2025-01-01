import { Blocks } from "lucide-react";
import Link from "next/link";
import React from "react";
import { BsGithub } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="border-t border-neutral-700/25 p-8">
      <div className="flex items-center justify-between mx-24">
        <div className="flex items-center justify-center gap-2">
          <Blocks size={18} />
          <h1 className="text-neutral-300 bg-gradient-to-r from-neutral-500 to-white text-transparent bg-clip-text w-fit">
            Build for developers, Build by developer ` _ `
          </h1>
        </div>
        <div className="flex items-center justify-center gap-3">
          <Link
            href={"https://github.com/Abhishek-Jaiswar/"}
            className="flex gap-2 items-center text-sm"
          >
            <BsGithub className="text-xl" />
            Github
          </Link>
          <Link
            href={"https://github.com/Abhishek-Jaiswar/"}
            className=" text-sm"
          >
            Terms
          </Link>
          <Link
            href={"https://github.com/Abhishek-Jaiswar/"}
            className=" text-sm"
          >
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
