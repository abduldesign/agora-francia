"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaUserAlt, FaLock } from "react-icons/fa";
import Button from "@/app/components/ui/botton"
import { FaAngleLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { handleApiSuccess } from "@/helpers/success-message";
import { handleApiErrors } from "@/helpers/error-handler";
import useLoading,{LoaderType} from "@/hooks/useLoader";


function ForgotPassword() {
  const {startLoading,stopLoading,LoadingWrapper} =useLoading();
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const { resetToken } = useAuth();
  

  const handleSubmit = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
 
    try {
      startLoading();
      const userData = await resetToken(email);
      console.log(userData);
      handleApiSuccess(userData)
      router.push("/user/forgot-success");
    } catch (err) {
      handleApiErrors(err, router)
    } finally{
      stopLoading();
    }
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

            <h4 className="font-bold text-xl text-center">Forgot Password ?</h4>
            <p className="text-sm  mt-4 mb-4 text-center"> Enter Your Email and we&lsquo;ll send you a link to reset your<br/> password</p>
            <p className="text-red-500 text-center"></p>
            
        <form>
          <div className="flex justify-end items-center relative mb-4 mt-4">
                <input
                  placeholder="Enter your Email"
                  className="border border-gray-400 rounded-lg p-4 w-full "
                  type="email"
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div className="absolute h-full w-10 bg-[#9B9494] rounded-r-lg grid place-items-center items-center ">
                  <FaUserAlt className="" />
                </div>
              </div>

          <div className="flex justify-between items-center mb-4">
            <LoadingWrapper
            text="sending email ..."
            loaderType={LoaderType.button}
            color="green"
            size={8}
            >
            <Button onClick={handleSubmit}>
                Continue
            </Button>
            </LoadingWrapper>
            
          </div>
         
        </form>

        <div className="text-center">
          <p className="text-gray-600">
            
          <Link href="/">
  <FaAngleLeft style={{ display: "inline-block", verticalAlign: "middle" }} /> Back to login
</Link>
          </p>
        </div>
            
          </div>
        </div>
      </div>
    </main>
  );
}

export default ForgotPassword;