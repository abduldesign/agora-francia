import React from 'react'

function page() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="text-center p-8 bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg">
        <h1 className="text-5xl font-bold text-white mb-4">Coming Soon</h1>
        <p className="text-lg text-gray-200">
          Were working hard to bring you something amazing. Stay tuned!
        </p>
        <div className="mt-8">
          <button className="px-6 py-3 bg-white text-purple-600 rounded-full font-semibold hover:bg-purple-100 transition duration-300">
            Notify Me
          </button>
        </div>
      </div>
    </div>
  )
}

export default page
