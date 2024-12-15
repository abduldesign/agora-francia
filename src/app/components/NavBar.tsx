"use client";
import React, { useState, useEffect, useRef, RefObject } from "react";
import { RiLockPasswordLine } from "react-icons/ri";
import { useRouter } from 'next/navigation';
import { FaCog } from "react-icons/fa";
import {FiActivity} from "react-icons/fi"
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdOutlineSearch } from "react-icons/md";
import {BiLogOut} from "react-icons/bi"
import {CiUser} from "react-icons/ci"
import Link from "next/link";
import { handleApiSuccess } from "@/helpers/success-message";
import { handleApiErrors } from "@/helpers/error-handler";

function NavBar() {
  const router = useRouter();
  const [showIcon, setShowIcon] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ email: string } | null>(null);
  

  useEffect(() => {
    // Retrieve user data from localStorage
    const user = localStorage.getItem("authUser");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setShowIcon(inputValue === "");
  };

  const handleLogout = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();

    try {
      localStorage.removeItem("authUser"); // Clear stored user data
      
      handleApiSuccess({ message: "Successfully logged out" });
      router.push("/");
    } catch (err) {
      handleApiErrors(err, router);
    }
  };




  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMenuOpen(false);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const openOrCloseDropdown = () => {
    setIsOpen(!isOpen);
  };

  const hideDropdown = () => {
    setIsOpen(false);
  };


  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <nav className="sticky top-0 inset-x-0 border-b border-gray-200 bg-white shadow-md flex items-center justify-between pt-8 px-4 py-3 pl-6">
      <div className="flex items-center flex-1 justify-center space-x-6">
        <h1 className="text-lg font-semibold hidden sm:block">
          {currentUser && currentUser.email && (
            <span>Hi, {currentUser.email.split('@')[0]}</span>
          )}
        </h1>

        <div className="relative flex items-center hidden sm:flex">
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-100 border border-gray-300 rounded-full pl-10 py-2 focus:outline-none"
            onChange={handleInputChange}
          />
          {showIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <MdOutlineSearch className="text-gray-500" />
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-6">
        

        <div className="relative">
          <div className="flex items-center cursor-pointer" onClick={toggleDropdown}>
            <div className="h-10 w-10 border bg-gray-200 text-gray-600 rounded-full flex items-center justify-center font-semibold">
              {currentUser && currentUser.email && (
                <span>{currentUser.email.split('@')[0].substring(0, 2).toUpperCase()}</span>
              )}
            </div>
          </div>
          {isDropdownOpen && (
            <div className="absolute right-0 w-60 mt-4 bg-white border border-gray-300 text-gray-700 rounded-lg shadow-md">
              <ul>
                <li className="flex p-2 border-b border-gray-300 items-center">
                  <CiUser className="text-gray-600 mr-2" />
                  {currentUser && currentUser.email && <span>{currentUser.email}</span>}
                </li>
                <li className="flex p-2 cursor-pointer hover:bg-gray-100 items-center">
                  <RiLockPasswordLine className="text-gray-600 mr-2" />
                  <Link href="/user/change-password">Change Password</Link>
                </li>
                <li className="flex p-2 cursor-pointer hover:bg-gray-100 items-center">
                  <FiActivity className="text-gray-600 mr-2" />
                  <Link href="/user/activityLog">Activity Log</Link>
                </li>
                <li className="flex p-2 cursor-pointer hover:bg-gray-100 items-center" onClick={handleLogout}>
                  <BiLogOut className="text-gray-600 mr-2" />
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
export default NavBar;
