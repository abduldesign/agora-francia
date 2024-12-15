// UserProfile.tsx
"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import useAuth from "@/hooks/useAuth";
import { UserIList } from "@/types/user-type";

import { userData } from '@/app/components/Data/UserData';


import avatarData from '../../../../public/images/kds.png'

const UserProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(userData);
  const { getUsers, authUser } = useAuth();
  const [currentUser, setCurrentUser] = useState<UserIList | null>(null);
  const [users, setUsers] = useState<UserIList[]>([]);

  useEffect(() => {
    // Simulate an API call to fetch user data
    // Replace this with an actual API call using libraries like axios or fetch
    // Example: axios.get('/api/user').then(response => setUser(response.data));
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // Add logic to save user information
  };
  useEffect(() => {
    getUsers().then((data) => {
      setUsers(data);
    });
    
    // Set current user once fetched
    setCurrentUser(authUser);
  }, [authUser]); 

  return (
<>
    <main className="h-screen bg-[#D9FFE7]">
   <div className="flex justify-center items-center h-screen">
    <div className="container mx-auto max-w-sm p-8 bg-white shadow-lg rounded-lg">
  <div className="text-center mb-6">
    <Image src={avatarData} alt="User Avatar" className="w-16 h-16 mx-auto rounded-full mb-4" />
    
    <h2 className="text-2xl font-bold text-gray-800">User Profile</h2>
  </div>
  <div className="mb-4">
    <label className="text-gray-600">User Name:</label>
    {isEditing ? (
      <input
        type="text"
        value={user.userName}
        onChange={(e) => setUser({ ...user, userName: e.target.value })}
        className="form-input w-full"
      />
    ) : (

     
      
      <p className="text-gray-800 font-semibold"> 
       {currentUser && currentUser.email && (
    <p>{currentUser.email.split('@')[0]}</p>
  )}
      </p>
    )}
  </div>

  <div className="mb-4">
    <label className="text-gray-600">Email:</label>
    {isEditing ? (
      <input
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        className="form-input w-full"
      />
    ) : (
      <p className="text-gray-800 font-semibold">{currentUser && currentUser.email && <p>{currentUser.email}</p>}</p>
    )}
  </div>

  <div className="mb-4">
    <label className="text-gray-600">MDA:</label>
    {isEditing ? (
      <input
        type="text"
        value={user.ministry}
        onChange={(e) => setUser({ ...user, ministry: e.target.value })}
        className="form-input w-full"
      />
    ) : (
      <p className="text-gray-800 font-semibold">{user.ministry}</p>
    )}
  </div>

  <div className="flex justify-center">
    {isEditing ? (
      <button
        onClick={handleSaveClick}
        className="bg-green-700 text-white px-6 py-2 rounded-md hover:bg-[#5BCAA2]  focus:outline-none"
      >
        Save Changes
      </button>
    ) : (
      <button
        onClick={handleEditClick}
        className="bg-green-700 text-white px-6 py-2 rounded-md hover:bg-[#5BCAA2] focus:outline-none"
      >
        Update Profile
      </button>
    )}
  </div>
</div>
</div>






</main>
</>
    
  );
};

export default UserProfile;






















