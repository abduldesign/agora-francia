// components/SuccessPage.js
import Link from 'next/link';
import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const SuccessPage = () => {
  return (

    <main className="h-screen bg-[#D9FFE7]">

<div className="flex justify-center items-center h-screen ">

<form className="container mx-auto max-w-sm p-8 bg-white shadow-lg rounded-lg">
    <div className="flex flex-col items-center ">

      <FaCheckCircle className="text-green-500 text-5xl mb-4" />
      <h1 className="text-2xl font-bold text-green-500">Success!</h1>
      <p className="text-gray-600 mt-2">Your password has been successfully changed.</p>
      <Link href="/">
      
      <button className="mt-4 bg-green-700 hover:bg-[#5BCAA2] text-white font-bold py-2 px-4 rounded">
        Go back to login
      </button>
      </Link>
    </div>
    </form>
    </div>
    </main>
  );
};

export default SuccessPage;