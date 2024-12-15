"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUserAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleApiSuccess } from "@/helpers/success-message";
import useLoading, { LoaderType } from "@/hooks/useLoader";

import Link from "next/link";
import ToastContainer from "@/app/components/ui/ToastContainer";

function Registration() {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [role, setRole] = useState<string>("buyer");
  const [showPassword, setShowPassword] = useState(false);
  const { startLoading, stopLoading, LoadingWrapper } = useLoading();

  const handleSubmit = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
  
    if (["admin", "seller"].includes(role)) {
      toast.error("Only an admin can register another admin or seller.");
      return;
    }
  
    try {
      startLoading();
  
      // Make the registration API call
      const response = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role,
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        // Show error message from the backend
        toast.error(data.message || "Registration failed!");
        return;
      }
  
      handleApiSuccess(data);
      toast.success("Registration successful!");
      router.push("/login");
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
            <h4 className="font-bold text-2xl text-center">Sign Up</h4>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center relative">
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="border border-gray-400 rounded-lg p-2 w-full"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <FaUserAlt className="absolute right-4" />
              </div>

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
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="border border-gray-400 rounded-lg p-2 w-full"
                  required
                >
                  <option value="buyer">Buyer</option>
                  <option value="seller">Seller</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div>
                <LoadingWrapper
                  text="Creating user..."
                  loaderType={LoaderType.button}
                  color="green"
                  size={8}
                >
                  <button className="py-2 w-full text-white text-lg rounded-lg bg-green-600">
                    Sign Up Now
                  </button>
                </LoadingWrapper>
              </div>
            </form>

            <div className="flex justify-between items-center">
              <p>Already have an account?</p>
              <Link href="/login" className="text-md font-semibold underline text-green-600">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Registration;
