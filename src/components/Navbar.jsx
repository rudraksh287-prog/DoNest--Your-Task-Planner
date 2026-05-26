import React from 'react'

const Navbar = () => {
  return (
    
      <nav className="flex justify-between bg-slate-700/80 backdrop-blur-sm text-white py-4 px-4 md:px-8 shadow-lg">
        <div className="logo">
            <span className="font-syne font-extrabold text-2xl">DoNest</span>
        </div>
        <ul className="flex gap-8 items-center">
            <li className="font-syne cursor-pointer hover:font-bold transition-all duration-75">Home</li>
            <li className="font-syne cursor-pointer hover:font-bold transition-all duration-75">Your Tasks</li>
        </ul>
      </nav>
    
  )
}

export default Navbar
