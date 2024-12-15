"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from 'flowbite-react';
import {
  HiArrowSmRight, HiChartPie, HiOutlineTrendingUp, HiOutlinePencil,
  HiAtSymbol, HiOutlineViewGrid, HiOutlineCurrencyDollar,
   HiPencilAlt,  HiUser, 
} from 'react-icons/hi';
import { FaChevronLeft, FaBars } from 'react-icons/fa6';

export default function SideBar() {
  const router = useRouter();

  const [isInvisible, setIsInvisible] = useState(false);

  function logout() {
    localStorage.clear();
    sessionStorage.clear();
    router.push("/");
  }

  return (
    <div>
      {isInvisible ? (
        <button onClick={() => setIsInvisible(!isInvisible)}><FaBars /></button>
      ) : (
        <Sidebar
        id="sidebar-multi-level-sidebar"
        className={`fixed top-0 left-0 z-10 h-screen transition-transform ${isInvisible ? 'w-0' : 'md:w-45'}`}
        aria-label="Sidebar with multi-level dropdown example"
        style={{
          background: 'linear-gradient(to top, #4CAF50 50%, #4CAF50 60%, #2196F3 100%)'
        }}
      >
          <div className=' flex justify-items-between items-center'>
         <h2 className='text-lg font-semibold'>Admin</h2>
            <div className='ml-20'>
              {isInvisible ? (
                <button onClick={() => setIsInvisible(!isInvisible)}><FaBars /></button>
              ) : (
                <button onClick={() => setIsInvisible(!isInvisible)}><FaChevronLeft /></button>
              )}
            </div>
          </div>
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item
                className='bg-gray-500'
                href="/maindashboard/home"
                icon={() => <HiOutlineViewGrid className="text-white text-2xl" />}
              >
                Dashboard
              </Sidebar.Item>


               {/* mda Menu Section */}
               <Sidebar.Collapse className='mt-4 mb-4' icon={() => <HiChartPie className="text-white text-2xl" />} label="Products">
                <Sidebar.Item href="/maindashboard/Products/AddNew">Add Items</Sidebar.Item>
                <Sidebar.Item href="/maindashboard/Products/Categories">Add Categories</Sidebar.Item>
                <Sidebar.Item href="/maindashboard/Products/ViewAll">List of products</Sidebar.Item>
              </Sidebar.Collapse>
              
              {/* Sellers Section */}
              <Sidebar.Collapse className='mt-4 mb-4' icon={() => <HiUser className="text-white text-2xl" />} label="Sellers">
                <Sidebar.Item href="/maindashboard/settings/users" className="mt-1 mb-1">Add Sellers</Sidebar.Item>
               
              </Sidebar.Collapse>
             
             
               {/* Sellers Section */}
               <Sidebar.Collapse className='mt-4 mb-4' icon={() => <HiUser className="text-white text-2xl" />} label="Bids Products">
                <Sidebar.Item href="/maindashboard/Bids/List">All Bids</Sidebar.Item>
              </Sidebar.Collapse>
             
              {/* Financial Menu Section */}
              <Sidebar.Collapse className='mt-4 mb-4' icon={() => <HiOutlineCurrencyDollar className="text-white text-2xl" />} label="Admin Section">
                <Sidebar.Item href="/maindashboard/settings/users">Users</Sidebar.Item>
              </Sidebar.Collapse>
             
              
              <button onClick={logout} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                  <path d="M3 5a2 2 0 012-2h1a1 1 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 110-2h1a2 2 012 2v10a2 2 01-2 2H5a2 2 01-2-2V5z"></path>
                </svg>
                <span className="flex-4 ml-3 whitespace-wrap mt-4-mb-4">Log Out</span>
              </button>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
          
        </Sidebar>
      )}
    </div>
  );
}
