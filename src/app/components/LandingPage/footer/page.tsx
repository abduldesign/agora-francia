"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
    const currentYear = new Date().getFullYear();
  return (
    <footer className="py-6" id="footer ">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:grid  md:grid-cols-4 md:gap-8  mb-2">
          

          <div className="flex flex-col md:col-span-1 gap-4 mb-2 md:mb-0 w-full md:w-auto">
            <p className="text-xs text-[#5D20D2] font-semibold">Quick Links</p>
            <ul className="flex flex-col gap-1">
              <li className="cursor:pointer">
                <a href="/" className="text-xs text-[#3A3A3A] p-0 m-0">Chat us</a>
              </li>
              <li>
                <a href="/" className="text-xs text-[#3A3A3A] p-0 m-0">Helper Center</a>
              </li>
              <li>
                <span className="text-xs text-[#3A3A3A] p-0 m-0">How to shop on Agora Francia</span>
              </li>
            
            </ul>
          </div>

          <div className="flex flex-col md:col-span-1 gap-4 mb-2 md:mb-0 w-full md:w-auto">
            <p className="text-xs text-[#5D20D2] font-semibold">Other Links</p>
            <ul className="flex flex-col gap-2">
             
              <li>
                <p className="text-xs text-[#3A3A3A]">
                  Sell on Agora
                </p>
              </li>
              <li>
                <p className="text-xs text-[#3A3A3A]">
                  Become An Affiliate
                </p>
              </li>

              <li>
                <p className="text-xs text-[#3A3A3A]">
                  Terms & condition
                </p>
              </li>
            </ul>

            
          </div>



          <div className="flex flex-col md:col-span-1 gap-4 mb-2 md:mb-0 w-full md:w-auto">
            <p className="text-xs text-[#5D20D2] font-semibold">Contact us</p>
            <ul className="flex flex-col gap-2">
              <li>
                <p className="text-xs text-[#3A3A3A]">
                  <span className="font-semibold">Email:</span>{" "}
                  agorafrancia@gmail.com
                </p>
              </li>
              <li>
                <p className="text-xs text-[#3A3A3A]">
                  <span>Phone:</span> +129908272
                </p>
              </li>
              <li>
                <p className="text-xs text-[#3A3A3A]">
                  <span>Location:</span> agora Græcia,
                  Greek
                </p>
              </li>
            </ul>

            
          </div>
        </div>


        
        
        {/* Footer Bottom */}
        <div className="mt-8 border-t border-gray-300 pt-4">
          <p className="text-xs text-gray-600 text-center">
            Copyright Agora Francia {currentYear} - All rights reserved. Developed by MSc Student
          </p>
        </div>
      </div>
      
    </footer>
  );
}
