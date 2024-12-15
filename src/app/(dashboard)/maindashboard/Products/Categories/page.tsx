"use client";
import React, { useState, useEffect } from "react";
import useLoading, { LoaderType } from "@/hooks/useLoader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastContainer from "@/app/components/ui/ToastContainer";
import axios from "axios";

function Page() {
  const [name, setName] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const { startLoading, stopLoading, LoadingWrapper } = useLoading();

  // Retrieve token on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken"); // Corrected key
    console.log("categories token:", storedToken); // Log to check if the token is being retrieved
    setToken(storedToken);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startLoading();

    try {
      if (!token) {
        toast.error("Authorization token is missing. Please log in.");
        return;
      }

      const response = await axios.post(
        "http://127.0.0.1:8000/api/category",
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message);
      setName("");
    } catch (error) {
      // Narrow down the type of error
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data.message || "Failed to add category. Please try again."
        );
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      stopLoading();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <ToastContainer />
      <h1 className="text-xl font-bold mb-4">Add Categories</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <LoadingWrapper
            text="Submitting..."
            loaderType={LoaderType.button}
            color="green"
            size={8}
          >
            <button
              type="submit"
              className="py-2 w-full text-white text-lg rounded-lg bg-green-600"
            >
              Add Item
            </button>
          </LoadingWrapper>
        </div>
      </form>
    </div>
  );
}

export default Page;
