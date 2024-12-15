'use client';
import React, { useState, useEffect } from 'react';
import useLoading, { LoaderType } from "@/hooks/useLoader";
import { toast } from 'react-toastify'; // Assuming you're using react-toastify for notifications

const Users = () => {
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newUserRole, setNewUserRole] = useState('');
  const [users, setUsers] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(6);
  const { startLoading, stopLoading, LoadingWrapper } = useLoading();

  // Fetch users from localStorage or API
  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      fetchUsers(); 
    }
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users');
      const data = await response.json();
      localStorage.setItem('users', JSON.stringify(data));
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();

    if (["admin", "seller"].includes(newUserRole)) {
      toast.error("Only an admin can register another admin or seller.");
      return;
    }

    try {
      // Assuming you have a loading state handler
      startLoading();

      // Make the registration API call
      const response = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newUserEmail,  // Assuming name is just email for simplicity
          email: newUserEmail,
          password: newUserPassword,
          role: newUserRole,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Registration failed!");
        return;
      }

      toast.success("Registration successful!");
      // Optionally, update local state or refetch users
      setUsers([...users, data]);  // Assuming `data` contains the newly added user
      setShowAddUserModal(false);  // Close the modal after success
    } catch (error: any) {
      toast.error(error.message || "An unexpected error occurred.");
    } finally {
      stopLoading();
    }
  };

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto">
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setShowAddUserModal(true)}
          className="bg-green-700 text-white px-4 py-2 mt-8 rounded-lg hover:bg-[#5BCAA2] focus:outline-none cursor-pointer focus:shadow-outline-blue"
        >
          Add Seller
        </button>
      </div>

      {/* Users Table */}
      <table className="min-w-full bg-green-700 border border-gray-300 rounded-lg mt-8">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-green-700 text-left text-xs font-medium text-white uppercase tracking-wider">User Email</th>
            <th className="px-6 py-3 bg-green-700 text-left text-xs font-medium text-white uppercase tracking-wider">Role</th>
            <th className="px-6 py-3 bg-green-700 text-left text-xs font-medium text-white uppercase tracking-wider">User Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentUsers.map((user) => (
            <tr key={user.id}>
              <td className="px-4 py-2 whitespace-no-wrap">{user.email}</td>
              <td className="px-4 py-2 whitespace-no-wrap">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <ul className="flex">
          {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, i) => (
            <li key={i} className="mx-1">
              <button
                className={`px-3 py-1 rounded-md ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => paginate(i + 1)}
              >
                {i + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Add New User</h2>

            {/* Name Input */}
            <label className="block text-gray-700 font-bold">Name</label>
            <input
              type="text"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />

            {/* Email Input */}
            <label className="block text-gray-700 font-bold mt-4">Email</label>
            <input
              type="email"
              value={newUserEmail}
              onChange={(e) => setNewUserEmail(e.target.value)}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />

            {/* Password Input */}
            <label className="block text-gray-700 font-bold mt-4">Password</label>
            <input
              type="password"
              value={newUserPassword}
              onChange={(e) => setNewUserPassword(e.target.value)}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />

            {/* Role Selection */}
            <label className="block text-gray-700 font-bold mt-4">Role</label>
            <select
              value={newUserRole}
              onChange={(e) => setNewUserRole(e.target.value)}
              className="form-select mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="seller">Seller</option>
              <option value="buyer">Buyer</option>
            </select>

            {/* Modal Buttons */}
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowAddUserModal(false)}
                className="bg-gray-300 px-4 py-2 rounded-md mr-2"
              >
                Cancel
              </button>
              <button
              type="submit" 
                onClick={handleSubmit}
                className="bg-green-600 text-white px-4 py-2 rounded-md"
              >
                Add User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
