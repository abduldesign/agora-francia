"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useLoading, { LoaderType } from '@/hooks/useLoader';
export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isSaveButtonDisabled, setSaveButtonDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleSave = () => {
    // Add logic to save changes
    console.log('Changes saved!');
  };

  const handleCancel = () => {
    // Add logic to cancel changes
    console.log('Changes canceled!');
  };

  const handleSubmit = (e: React.FormEvent<EventTarget>) => {
    

   
  };

   // Function to check if the form is filled
   const isFormFilled = () => {
    return username.trim() !== '' && password.trim() !== '' && newPassword.trim() !== '';
  };


  // Update the button disabled state based on form filled status
  const updateButtonDisabledState = () => {
    setSaveButtonDisabled(!isFormFilled());
  };


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  return (
    <main className="h-screen bg-[#D9FFE7]">    

  <div className="flex justify-center items-center h-screen">
  
           
            <form className="container mx-auto max-w-sm p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Change Password</h2>

      <div className="mb-4">
        <label htmlFor="username" className="block text-sm font-medium text-gray-600">
          Existing password
        </label>
        <input
          type={showPassword ? 'text' : 'password'}
          id="username"
          className="mt-1 p-2 border rounded-md w-full"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            updateButtonDisabledState();
          }}
        />
        
      </div>

      <div className="mb-4">
      <label htmlFor="password" className="block text-sm font-medium text-gray-600">
        New Password
      </label>
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          id="password"
          placeholder="at least 5 characters"
          className="mt-1 p-2 border rounded-md w-full"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
             updateButtonDisabledState(); // You can include your logic here
          }}
        />
        <span
          className="absolute right-2 mt-3 cursor-pointer"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? 'Hide' : 'Show'}
        </span>
      </div>
    </div>

      <div className="mb-4">
        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-600">
          Confirm New Password
        </label>
        <input
          type={showPassword ? 'text' : 'password'}
          id="newPassword"
          className="mt-1 p-2 border rounded-md w-full"
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
            updateButtonDisabledState();
          }}
        />
      </div>
      
      <div className="flex justify-between">
        <Link href="/user/change-sucess" >
       
        <button
          className={`bg-green-700 text-white px-4 py-2 rounded-md hover:bg-[#5BCAA2]  ${isSaveButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleSave}
          disabled={isSaveButtonDisabled}
        >
          Save changes
        </button>
        </Link>
        <button
          className={`bg-green-700 text-gray-600 px-4 py-2 rounded-md hover:bg-[#5BCAA2] ${isSaveButtonDisabled ? '' : 'opacity-50 cursor-not-allowed'}`}
          onClick={handleCancel}
          disabled={!isSaveButtonDisabled}
        >
          Cancel changes
        </button>
      </div>
    </form>
            
          
        
        </div>
      
    </main>
  );
}
