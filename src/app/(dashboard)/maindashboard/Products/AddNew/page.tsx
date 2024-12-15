"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import useLoading, { LoaderType } from "@/hooks/useLoader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastContainer from "@/app/components/ui/ToastContainer";

interface Category {
  id: number;
  name: string;
}

const AddItemForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category_id: "",
    sale_type: "immediate",
    auction_start: "",
    auction_end: "",
  });
  const [photos, setPhotos] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const { startLoading, stopLoading, LoadingWrapper } = useLoading();

  // Retrieve token on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    console.log("Retrived token:", storedToken);
    setToken(storedToken);
  }, []);

  // Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/categories", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCategories(response.data);
      } catch (err: any) {
        // You can log the error to help debug it
        console.error("Error fetching categories:", err);
        toast.error("Failed to load categories. Please try again.");
      }
    };

    if (token) {
      fetchCategories();
    }
  }, [token]);


  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotos(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!token) {
      setError("No authentication token found. Please log in.");
      setLoading(false);
      return;
    }

    try {
      startLoading();
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("category_id", formData.category_id);
      data.append("sale_type", formData.sale_type);

      if (formData.sale_type === "auction") {
        data.append("auction_start", formData.auction_start);
        data.append("auction_end", formData.auction_end);
      }

      photos.forEach((photo) => {
        data.append("photos[]", photo);
      });

      const response = await axios.post("http://127.0.0.1:8000/api/items", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess(response.data.message);
      toast.success(response.data.message);
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred");
      toast.error(err.response?.data?.message || "An unexpected error occurred.");
    } finally {
      stopLoading();
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <ToastContainer />
      <h1 className="text-xl font-bold mb-4">Add New Item</h1>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          ></textarea>
        </div>

        <div>
          <label className="block font-medium mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">categories</label>
          <input
            type="number"
            name="category_id"
            value={formData.category_id}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Sale Type</label>
          <select
            name="sale_type"
            value={formData.sale_type}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="immediate">Immediate</option>
            <option value="negotiation">Negotiation</option>
            <option value="auction">Auction</option>
          </select>
        </div>

        {formData.sale_type === "auction" && (
          <div>
            <label className="block font-medium mb-1">Auction Start</label>
            <input
              type="datetime-local"
              name="auction_start"
              value={formData.auction_start}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />

            <label className="block font-medium mb-1">Auction End</label>
            <input
              type="datetime-local"
              name="auction_end"
              value={formData.auction_end}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
        )}

        <div>
          <label className="block font-medium mb-1">Photos</label>
          <input
            type="file"
            name="photos"
            multiple
            accept="image/*"
            onChange={handleFileChange}
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
};

export default AddItemForm;
