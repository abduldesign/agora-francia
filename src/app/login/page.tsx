"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUserAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastContainer from "../components/ui/ToastContainer";
import { handleApiSuccess } from "@/helpers/success-message";
import useLoading, { LoaderType } from "@/hooks/useLoader";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const { startLoading, stopLoading, LoadingWrapper } = useLoading();

  const handleSubmit = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
  
    try {
      startLoading();
  
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        toast.error(data.message || "Login failed!");
        return;
      }
  
      handleApiSuccess(data);
  
      const { user, access_token } = data; // Extract token and user data
      const { role } = user;
  
      // Store authToken and user data in localStorage
      localStorage.setItem("authToken", access_token); // Store the token as authToken
      localStorage.setItem("authUser", JSON.stringify(user)); // Store user information
  
      // Log the stored token to check if it's set correctly
      console.log("Stored Token:", localStorage.getItem("authToken"));
  
      if (role === "admin" || role === "seller") {
        router.push("/maindashboard/home");
      } else if (role === "buyer") {
        router.push("/");
      } else {
        toast.error("Invalid user role");
      }
    } catch (error: any) {
      toast.error(error.message || "An unexpected error occurred.");
    } finally {
      stopLoading();
    }
  };
  

  return (
    <main className="h-screen w-full overflow-y-auto bg-[#D9FFE7]">
      <ToastContainer />
      <div className="flex justify-center items-center mx-auto h-screen">
        <div className="w-full md:w-1/2 h-full grid place-items-center">
          <div className="w-3/4 space-y-4">
            <h4 className="font-bold text-2xl text-center">Sign In</h4>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="border border-gray-400 rounded-lg p-2 w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <FaUserAlt className="absolute right-4" />
              </div>

              <div className="flex items-center relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="border border-gray-400 rounded-lg p-2 w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div
                  className="absolute right-4 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>

              <div>
                <LoadingWrapper
                  text="Logging in..."
                  loaderType={LoaderType.button}
                  color="green"
                  size={8}
                >
                  <button className="py-2 w-full text-white text-lg rounded-lg bg-green-600">
                    Sign In Now
                  </button>
                </LoadingWrapper>
              </div>
            </form>

            <div className="flex justify-between items-center">
              <p>Don't have an account?</p>
              <Link href="/user/register" className="text-md font-semibold underline text-green-600">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
