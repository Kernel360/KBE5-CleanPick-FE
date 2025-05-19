import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-zinc-200 w-screen z-10 h-[80px] fixed">
        <div className="flex items-center justify-between px-10 h-full">
            <div className="flex items-center">
                <h1 className="text-2xl mr-4 font-bold">Chatty</h1>
                <ul className="hidden md:flex">
                    <li>Home</li>
                    <li>About</li>
                    <li>Features</li>
                    <li>Feedback</li>
                    <li>Contact</li>
                </ul>
            </div>
            <div className="hidden pr-4 md:flex">
                <button >
                    Sign In
                </button>
                <button >
                    Sign Up
                </button>
            </div>
        </div>
    </nav>
  )
};

export default Navbar;