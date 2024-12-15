"use client";
import React, { useState, useEffect, useRef, RefObject } from "react";
import { FaCaretDown } from "react-icons/fa";
import { FaEllipsisV } from "react-icons/fa";
import { BsDownload } from "react-icons/bs";
import { RiLockPasswordLine } from "react-icons/ri";
import { BiHistory } from "react-icons/bi";
import { useRouter } from 'next/navigation';
import { MdClose } from "react-icons/md";
import { FaCog } from "react-icons/fa";
import {FiActivity} from "react-icons/fi"
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdOutlineSearch } from "react-icons/md";
import {BiLogOut} from "react-icons/bi"
import {BiSolidUser} from "react-icons/bi"
import {CiUser} from "react-icons/ci"
import {BiMessageAlt} from "react-icons/bi"
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import { handleApiSuccess } from "@/helpers/success-message";
import { handleApiErrors } from "@/helpers/error-handler";

function NavBar() {
  const router = useRouter();
  const [showIcon, setShowIcon] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { logout } = useAuth()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setShowIcon(inputValue === "");
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

  const handleLogout = async(e: React.FormEvent<EventTarget>) => {
    e.preventDefault()
    closeDropdown()

     try {
        await logout();
        handleApiSuccess({ message: "Successfully logged out"})
        router.push("/");
      } catch (err) {
        handleApiErrors(err, router)
      }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex justify-items-center shadow-lg border-radius-50 items-center pt-8 space-x-10 bg-[#D9FFE7] pl-12">
      <div className="ml-50 ">
        <h1 className="text-sm font-bold ml-60 mb-8">
          {" "}
          SUPER ADMIN - DASHBOARD{" "}
        </h1>
      </div>
      <div className=" flex justify-items-center items-center pl-24 mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search something here..."
            className="bg-transparent focus:outline-none w-full border border-gray-300 rounded-lg pl-10 py-2 pr-2"
            onChange={handleInputChange}
          />
          {showIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none top-1/2 transform -translate-y-1/2">
              <MdOutlineSearch className="w-4 h-7 pt-t text-gray-600" />
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center items-center pl-28 mb-8">
        <div className="relative">
          <div className="cursor-pointer" onMouseEnter={openOrCloseDropdown}>
            <div className="relative">
              <div className="w-10 h-10 p-2 text-gray-600 bg-white rounded-full shadow-md">
                <IoIosNotificationsOutline className="w-6 h-6 mx-auto" />
              </div>
              {isOpen && (
                <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
              )}
            </div>
          </div>
          {isOpen && (
            <div
              className="fixed top-34 right-30 w-100 p-4 
         border border-gray-300 shadow-lg rounded-lg
         border-radius-50 items-center bg-[#D9FFE7] pl-12 z-10"
            >
              <div className="mb-4 py-2 font-semibold border-b border-gray-300 flex items-center">
                  Notifications
                  <FaCog className="w-4 h-4 text-gray-600 cursor-pointer ml-20 " ></FaCog>
              </div>
              <div className="h-60 overflow-y-auto">
                <ul>
                  <li className="p-2 cursor-pointer hover:bg-white rounded-md mt-2 mr-2">
                    <h3 className="text-lg font-semibold">coming soon</h3>
                    <p>we are still working here</p>
                  </li>
                  
                </ul>
              </div>
              <button
                className="text-blue-500 hover:underline mt-2 mr-2"
                onClick={hideDropdown}
              >
                See All Notification
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end items-center pl-28 mb-8 ">
        <div className="relative">
          <div
            className="flex items-center cursor-pointer"
            onMouseEnter={toggleDropdown}
          >
            <div className="h-10 w-10 border bg-white text-gray-600 rounded-full flex items-center justify-center font-semibold text-xl">
             <CiUser />
            </div>
            <FaCaretDown />
          </div>

          {isDropdownOpen && (
            <div className="absolute left-0 w-60 mt-4 bg-[#D9FFE7] border border-gray-300 text-gray-700 rounded-lg z-10 shadow-md">
              <ul className="mt-3 mr-3 ml-2">
                <li className=" flex p-2 text-sm border-b border-gray-300 font-semibold">
                <CiUser  className="w-4 h-4 mr-2 text-gray-600" />
                
                <h1 className="text-sm">Musa-super Admin</h1>
                </li>
                <li className=" flex p-2 text-sm cursor-pointer hover:bg-white">
                  <BiSolidUser  className="w-4 h-4 mr-2 text-gray-600"/>

                  <Link href="/user/user-profile">My Profile</Link>
                  
                </li>
                <li className=" flex p-2 text-sm cursor-pointer hover:bg-white">
                <RiLockPasswordLine className="w-4 h-4 mr-2 text-gray-600" />
                
                <Link href="/user/change-password">Change password</Link>
               
                
                </li>
                <li className=" flex p-2 text-sm cursor-pointer hover:bg-white">
                  <BiMessageAlt className=" w-4 h-4 mr-2 text-gray-600"/>

                  <Link href="/">Message</Link>
                  
                </li>
                <li className=" flex p-2 text-sm cursor-pointer hover:bg-white">
                  <FiActivity className=" w-4 h-4 mr-2 text-gray-600"/>
                  <Link href="/user/activityLog">Activity Log</Link>
                  
                </li>
                <li
                  className=" flex p-2 text-sm mb-2 cursor-pointer hover:bg-white"
                  onClick={handleLogout}

                >
                  <BiLogOut className=" w-4 h-4 mr-2 text-gray-600"/>
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end items-center pl-28 mb-8">
        <div className="inline-flex space-x-2 relative group">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out cursor-pointer ${
              menuOpen ? "hover:bg-gray-100" : "hover:bg-white"
            }`}
            onClick={toggleMenu}
          >
            <span
              className={`text-gray-600 text-xl mb-2 ${
                menuOpen ? "text-white" : ""
              }`}
            >
              <FaEllipsisV className="w-4 h-4 mt-2" />
            </span>
          </div>
          {menuOpen && (
            <div
              ref={menuRef}
              className="absolute right-0 mt-12 w-60 h-50 bg-[#D9FFE7] border border-gray-200 shadow-lg rounded-lg z-10" // Increase the z-index value
            >
              <ul className="mt-3 mr-3 ml-2">
                <li className="flex p-2  rounded-md hover:bg-white cursor-pointer">
                  <BsDownload className=" w-4 h-4 mr-2 text-gray-600"></BsDownload>
                  <Link href="/">Download Reports</Link>
                  
                </li>
                <li className="flex p-2 rounded-md hover:bg-white cursor-pointer">
                  <BiHistory className="w-4 h-4 mr-2 text-gray-600" />

                  <Link href="/">History</Link>
                </li>
                
                <li
                  className="flex p-2 rounded-md hover:bg-white cursor-pointer"
                  onClick={() => setMenuOpen(false)} // Close the menu on click
                >
                  <MdClose className="w-4 h-4 mr-2 text-gray-600" />
                  Exit
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default NavBar;
