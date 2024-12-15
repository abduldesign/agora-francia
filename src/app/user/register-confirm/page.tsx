


"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Button from "@/app/components/ui/secondaryButton"
import { FaAngleLeft, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import useAuth from "@/hooks/useAuth";
import { handleApiSuccess } from "@/helpers/success-message";
import { handleApiErrors } from "@/helpers/error-handler";
import { LOCALVALUES } from "@/helpers/local-storage";
import { toast } from "react-toastify";
import useLoading, { LoaderType } from "@/hooks/useLoader";


function RegisterConfirm() {
  const router = useRouter();

  const [navbar, setNavbar] = useState(false);
  const [isInvisible, setIsInvisible] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState("");
  const [lostCode, setLostCode] = useState(false);
  const { confirmEmail, resendToken } = useAuth();
  const { loading: resendLoading, startLoading: startResendLoading, stopLoading: stopResendLoading, LoadingWrapper: ResendLoadingWrapper } = useLoading();
  const { loading: confirmLoading, startLoading: startConfirmLoading, stopLoading: stopConfirmLoading, LoadingWrapper: ConfirmLoadingWrapper } = useLoading();


  const handleResendCode = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    // Add logic to resend confirmation code
    console.log("Resending confirmation code...");
    const email = localStorage.getItem(LOCALVALUES.VERIFICATION_EMAIL);
    try {

        // Check if passwords match
    if (typeof email !== 'string') {
      toast.error("This session has expired");
      router.push("/");
      return;
    }
    startResendLoading()

      const userData = await resendToken(email);
      // Use the current values of email and password
      localStorage.setItem(LOCALVALUES.VERIFICATION_EMAIL, email);
      stopResendLoading()
      handleApiSuccess(userData)
    } catch (err) {
      stopResendLoading()
      handleApiErrors(err, router)
    }
  };

  const handleConfirm =async () => {
    // Add logic to confirm sign-up
    console.log("Confirming sign-up...");
  
    const email = localStorage.getItem(LOCALVALUES.VERIFICATION_EMAIL);
       try {
           // Check if passwords match
       if (typeof email !== 'string') {
         toast.error("This session has expired");
         router.push("/");
         return;
       }

       startConfirmLoading()
   
         const userData = await confirmEmail(email, confirmationCode);
         // Use the current values of email and password
         localStorage.removeItem(LOCALVALUES.VERIFICATION_EMAIL);
         handleApiSuccess(userData)
         stopConfirmLoading();
         router.push("/");
       } catch (err) {
        stopConfirmLoading();
         handleApiErrors(err, router)
       }
  };
  return (
    <main className="h-screen bg-[#D9FFE7]">
      <div className="flex justify-items-center items-center mx-auto h-screen">
        {/* ... Existing code for the left section */}
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
            <div className="flex flex-col items-center">
              {lostCode && (
                <>
                  <FaTimesCircle className="text-red-500 text-5xl mb-4" />
                  <h1 className="text-2xl font-bold text-red-500">Lost Code</h1>
                  <p className="text-gray-600 mt-2 text-center">
                    Oops! It seems you &apos ve lost your confirmation code.{" "}
                    <span
                      className="text-blue-500 cursor-pointer"
                      onClick={() => setLostCode(false)}
                    >
                      Resend Code
                    </span>
                  </p>
                </>
              )}
              {!lostCode && (
              <form>
  <h1 className="text-2xl font-bold text-green-500">Verify Email</h1>

                  <p className="text-gray-600 mt-2 text-center">
                    Please enter the confirmation code sent to your email.
                  </p>
  <input
    type="text"
    placeholder="Confirmation Code"
    value={confirmationCode}
    onChange={(e) => setConfirmationCode(e.target.value)} required
    className="w-full p-4 mt-4 border-b  rounded-lg border-gray-300 focus:outline-none focus:border-green-500"
  />
  

   {/* Resend Code link */}
<div className="flex justify-between items-center space-x-2 mt-4 mb-4">
  
  <ResendLoadingWrapper text="sending..."  loaderType={LoaderType.button}>
    <button
      type="button"
      className="text-sm font-semibold text-yellow"
      onClick={handleResendCode}
    >
      Resend Code
    </button>
  </ResendLoadingWrapper>

</div>


 {/* Confirm and Back to Sign In buttons */}
 <ConfirmLoadingWrapper size={8} color="green" text="submitting..."  loaderType={LoaderType.button}>
  <div className="flex justify-between items-center mt-4">
    <Link href="/" className="text-blue-500 mr-auto">
      Back Sign In
    </Link>
    <Button onClick={handleConfirm} className="ml-auto min-w-24">
      Confirm
    </Button>
  </div> 
 </ConfirmLoadingWrapper>

    </form>
)}
</div>
 </div>
 </div>
 </div>
 </main>
  );
}

export default RegisterConfirm;