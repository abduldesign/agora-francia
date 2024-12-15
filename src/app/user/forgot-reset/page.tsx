"use client";
import Image from "next/image";
import Link from "next/link";
import { FaUserAlt, FaSpinner,FaEye, FaEyeSlash } from "react-icons/fa";
import Button from "@/app/components/ui/botton"
import { FaAngleLeft } from "react-icons/fa6";
import { useState,useEffect, SetStateAction } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import useAuth from "@/hooks/useAuth";
import { handleApiSuccess } from "@/helpers/success-message";
import { handleApiErrors } from "@/helpers/error-handler";
import useLoading, { LoaderType } from '@/hooks/useLoader';

 function ForgotReset() {

  const {startLoading, stopLoading,LoadingWrapper} =useLoading()
    
    const searchParams = useSearchParams()
    const token = searchParams.get('token')
    const email = searchParams.get('email')

    const router = useRouter();
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { resetPassword } = useAuth();

    const handleSubmit = async (e: React.FormEvent<EventTarget>) => {
      e.preventDefault();
      console.log(email, token);
      

      if(!searchParams.has('email') || typeof email !== 'string') {
        router.push("/");
        return
      }
      if(!searchParams.has('token') || typeof token !== 'string') {
        router.push("/");
        return
      }
   
      try {
        startLoading();
        const userData = await resetPassword(email, token, password);
        console.log(userData);
        handleApiSuccess(userData)
        stopLoading();
        router.push("/");
      } catch (err) {
        handleApiErrors(err, router)
        stopLoading();
      }
    };

    useEffect(() => {
        // Simulate an async function to check the strength of the password
        const checkPasswordStrength = async () => {
          setLoading(true);
          // Your password strength checking logic goes here (e.g., using an API)
          // For demonstration purposes, let's use a timeout to simulate an async check
          await new Promise((resolve) => setTimeout(resolve, 1000));
          setLoading(false);
        };
    
        if (password.trim() !== '') {
          checkPasswordStrength();
        }
      }, [password]);
    
      const handlePasswordChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setPassword(e.target.value);
      };

      //implement the logic here
    function SaveChanges() {
        // localStorage.removeItem("token")
        localStorage.clear();
        sessionStorage.clear();
        router.push("");
      }
      const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
      };

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
                alt="Jigawa state Logo"
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
                  src={"/images/coat.png"}
                  alt="Coat of arm"
                  width={246}
                  height={246}
                />
              </div>
            </div>

            <h4 className="font-bold text-xl text-center">Reset Password</h4>
            <p className="text-red-500 text-center"></p>
            
            <form>
            <div className="flex justify-end items-center relative mb-4 mt-4">
      <input
        type={showPassword ? 'text' : 'password'}
        placeholder="Enter New Password"
        className="border border-gray-400 rounded-lg p-4 w-full"
        value={password}
        onChange={handlePasswordChange}
      />
      <div className="absolute h-full w-10 bg-[#9B9494] rounded-r-lg grid place-items-center items-center">
        {loading ? (
          <FaSpinner className="animate-spin" />
        ) : (
          showPassword ? (
            <FaEyeSlash onClick={togglePasswordVisibility} />
          ) : (
            <FaEye onClick={togglePasswordVisibility} />
          )
        )}
      </div>
    </div>

      <div className="flex justify-end items-center relative mb-4 mt-4">
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Confirm Password"
          className="border border-gray-400 rounded-lg p-4 w-full"
        />
        <div className="absolute h-full w-10 bg-[#9B9494] rounded-r-lg grid place-items-center items-center">
        </div>
        <div
                  className="absolute right-4 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
      </div>

            
      <div className="flex justify-between items-center mb-4">
        <LoadingWrapper
        text="submiting ...."
        loaderType={LoaderType.button}
        color="green"
        size={8}
        >
        <Button onClick={handleSubmit}>
            Submit
        </Button>
        </LoadingWrapper>
      </div>
    </form>

        
            
          </div>
        </div>
      </div>
    </main>
  );
}


export default ForgotReset;