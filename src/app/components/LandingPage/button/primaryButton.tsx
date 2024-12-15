import React from "react";
import Link from "next/link";

type ButtonProps = {
  text: string;
  onClick?: () => void;
  path?: string;
};

export default function PrimaryButton({ text, onClick, path }: ButtonProps) {
  return (
    <button
      type="button"
      className="text-white bg-green-600 hover:bg-[#5BCAA2] focus:ring-4  font-medium rounded-lg text-sm px-8 py-2.5 focus:outline-none  transition ease-in-out delay-100 hover:scale-105 duration-300"
      onClick={onClick}
    >
      {path ? <Link href={path}>{text}</Link> : text}
    </button>
  );
}
