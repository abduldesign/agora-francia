"use client";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import React, { useState } from "react";
import { CgMenuMotion } from "react-icons/cg";
import { RiCloseLine } from "react-icons/ri";
import { LuBell } from "react-icons/lu";
import { BsCart4 } from "react-icons/bs";
import { RiArrowDropDownLine } from "react-icons/ri";
const NavBars = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
 

  const handleNavigation = () => {
    router.push('/browseAll');
  };

  return (
    <nav className="lg:flex justify-between items-center gap-2 px-8 lg:px-24 py-4 lg:py-4 fixed w-full z-20 top-0 start-0 bg-white dark:bg-white border-b border-gray-200 dark:border-gray-600">
  <div className="flex justify-between items-center">
    <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
      Agora Ecommerce
    </Link>
    <div onClick={() => setOpen(!open)} className="flex items-center lg:hidden text-3xl cursor-pointer text-black">
      {!open ? <CgMenuMotion /> : <RiCloseLine />}
    </div>
  </div>
  <div className={`items-start justify-between w-full lg:flex lg:flex-row lg:w-2/3 lg:justify-start lg:items-center lg:order-1 mt-6 lg:mt-0 ${open ? "flex flex-col" : "hidden"}`} id="navbar-sticky">
    <ul className="flex flex-col text-base lg:text-md font-medium border-none bg-none lg:space-x-4 rtl:space-x-reverse lg:flex-row lg:border-0 lg:bg-none dark:bg-none lg:dark:bg-none dark:border-none gap-1 whitespace-nowrap">
      <li>
        <Link href="/" className="block rounded lg:bg-transparent lg:p-0 text-[#3A3A3A] hover:text-green-600 transition ease-in-out delay-100 duration-300">
          Home
        </Link>
      </li>
      <li className="flex items-center w-full">
        <input
          type="text"
          placeholder="Search by categories..."
          className="w-50 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
        />
      </li>
      <li>
      <button 
        onClick={handleNavigation}
        className="block text-[#3A3A3A] hover:text-green-600 rounded lg:p-0 transition ease-in-out delay-100 duration-300"
      >
        Browse All
      </button>
    </li>
      <li>
        <button className="text-black text-xl hover:text-green-600 transition ease-in-out delay-100 duration-300" aria-label="Notifications">
          <i className="fas fa-bell"></i>
        </button>
      </li>
      <li>
        <Link href="/shopping" className="text-black text-xl hover:text-green-600 transition ease-in-out delay-100 duration-300" aria-label="Shopping Cart">
          <LuBell />
        </Link>
      </li>
      <li>
        <Link href="/notifcation" className="text-black text-xl hover:text-green-600 transition ease-in-out delay-100 duration-300" aria-label="Notifications">
          <BsCart4 />
        </Link>
      </li>
      <li>
        <button className="text-black text-xl hover:text-green-600 transition ease-in-out delay-100 duration-300" aria-label="Shopping Cart">
          <i className="fas fa-shopping-cart"></i>
        </button>
      </li>
      <li className="relative group">
        <button className="flex items-center text-[#3A3A3A] hover:text-green-600 transition ease-in-out delay-100 duration-300">
          Accounts
          <RiArrowDropDownLine className="ml-2" />
        </button>
        <div className="absolute hidden group-hover:flex flex-col bg-white border border-gray-200 shadow-lg rounded-lg p-4 mt-2 space-y-2">
          <Link href="/login" className="hover:text-green-600">Signin</Link>
          <Link href="/user/register" className="hover:text-green-600">Register</Link>
          <Link href="/orders" className="hover:text-green-600">My Account</Link>
          <Link href="/items saved" className="hover:text-green-600">Saved Items</Link>
          <Link href="/logout" className="hover:text-green-600">Logout</Link>
        </div>
      </li>
    </ul>
  </div>
</nav>


  );
};

export default NavBars;
