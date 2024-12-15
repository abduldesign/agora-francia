"use client";
import React, { ReactNode } from "react";

import NavBars from "./Navbar/page";
import Footer from './footer/page'

interface LayoutProps {
  children: ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  return (
    <div className="w-full mx-0 p-0 overflow-hidden ">
      <NavBars />
      <div>{children}</div>
      <section className="bg-[#D9FFE7] px-8 md:px-16 lg:px-24 py-8 md:py-10 w-full">
        <Footer />
      </section>
    </div>
  );
}
