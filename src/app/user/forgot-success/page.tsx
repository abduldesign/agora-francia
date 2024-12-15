"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaUserAlt, FaLock } from "react-icons/fa";
import Button from "@/app/components/ui/botton"
import { FaAngleLeft } from "react-icons/fa6";
import { FaCheckCircle } from 'react-icons/fa';
import { useRouter } from 'next/navigation';


 function ForgotSuccess() {

  const router = useRouter();

    const [navbar, setNavbar] = useState(false);
    const [isInvisible, setIsInvisible] = useState(false);

  return (
    <main className="h-screen bg-[#D9FFE7]">
      <div className="flex justify-items-center items-center mx-auto h-screen">
        <div className="hidden md:block w-1/2 bg-[#5acaa27d] rounded-[0px_30px_30px_0px] h-full grid justify-items-between items-center ">
          <h3 className="text-1xl font-bold text-center pt-14">
            JIGAWA STATE SOCIAL PROTECTION MANAGEMENT
            <br />
            INFORMATION SYSTEM
          </h3>
          
          <div className="grid justify-center pt-20">
            <div className="rounded-full p-4 bg-[#eafff2cf]">
              <Image
                src={"/images/Jigawa.png"}
                alt="Kaduna state Logo"
                width={246}
                height={246}
              />
            </div>
          </div>
          <p className="text-sm left-[20px] text-center pt-20">
            <strong className="font-semibold text-[14]">Supported By</strong>
            <br />
            <span className="text-[9px] py-5">
              The Expanding Social Protection for Inclusive Development (ESPID)
              Project with funding from UKAid
            </span>
          </p>
          
          <div className="flex w-[491px] gap-[50px] relative justify-center items-center py-4 space-x-4 left-[130px] ">
            <Image src={"/images/log.png"} alt="log" width={28} height={30} />

            <Image src={"/images/logo.png"} alt="logo" width={22} height={15} />

            <Image src={"/images/lod.png"} alt="lod" width={18} height={12} />
          </div>
        </div>

        <div className="w-full md:w-1/2 h-full grid place-items-center items-center">
          <div className="w-3/4 space-y-4">
            <div className="grid justify-center md:hidden">
              <div className="rounded-full p-4 bg-green-200">
                <Image
                  src={"/images/Jigawa.png"}
                  alt="Coat of arm"
                  width={246}
                  height={246}
                />
              </div>
            </div>
            <div className="flex flex-col items-center ">

<FaCheckCircle className="text-green-500 text-5xl mb-4" />
<h1 className="text-2xl font-bold text-green-500">Congrats!</h1>
<p className="text-gray-600 mt-2 text-center">Password reset request submitted successfully. please check your email to reset your password.</p>

</div>
    
        
        
            
          </div>
        </div>
      </div>
    </main>
  );
}

export default ForgotSuccess;