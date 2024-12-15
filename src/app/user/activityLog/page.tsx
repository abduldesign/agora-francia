// pages/user-activity.js
"use client";
import React from 'react';
import UserActivityTable from '@/app/components/Table/UserActivityTable';

const usersData = [
  { id: 1, name: 'Adamu', role: 'Super Admin', action: 'Login', description: 'Some description', ip: '192.168.0.1', time: '12:30 PM' },
  { id: 2, name: 'Musa', role: 'Admin', action: 'Logout', description: 'Another description', ip: '192.168.0.2', time: '1:45 PM' },
  { id: 3, name: 'Isah', role: 'User', action: 'Update', description: 'Yet another description', ip: '192.168.0.3', time: '3:00 PM' },
  // Add more users as needed
];

const UserActivity = () => {
  return (
    <main className="h-screen bg-[#D9FFE7]">
      <div className="flex justify-center items-center h-screen">
  
      <div>
      <h1 className='mt-4 mb-4 text-2xl font-semibold'> Activity </h1>
      <UserActivityTable data={usersData} />
    </div>
    </div>
    </main>
    
  );
};

export default UserActivity;