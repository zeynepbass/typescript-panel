import React from 'react'
import {Link} from "react-router-dom"
const LeftSidebar = () => {
  return (
    <>
<nav className="bg-white dark:bg-gray-800 h-screen w-100">
  <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 h-full flex flex-col justify-between">
    <div className="flex justify-between h-16">
   
      <div className="flex-1 sm:ml-6 sm:block">
        <div className="flex flex-col space-y-4 mt-6">

          <Link to="/" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Team</Link>
          <Link to="/group" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Projects</Link>
         
        </div>
      </div>
    </div>
   
  </div>

</nav>

    </>
  )
}

export default LeftSidebar