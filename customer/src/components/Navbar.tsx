import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

const NavItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <li className={cn(
      "px-4 py-2 hover:bg-zinc-300 rounded-md cursor-pointer",
      "transition-colors duration-200"
    )}>
      {children}
    </li>
  );
};

const Navbar = () => {
  return (
    <nav className={cn(
      "bg-zinc-200 w-screen z-10 h-[80px] fixed",
      "border-b border-zinc-300"
    )}>
      <div className="flex items-center justify-between px-10 h-full">
        <div className="flex items-center">
          <h1 className="text-2xl mr-4 font-bold">Chatty</h1>
          <ul className="hidden md:flex space-x-2">
            <NavItem>Home</NavItem>
            <NavItem>About</NavItem>
            <NavItem>Features</NavItem>
            <NavItem>Feedback</NavItem>
            <NavItem>Contact</NavItem>
          </ul>
        </div>
        <div className="hidden pr-4 md:flex space-x-4">
          <Button variant="ghost">
            Sign In
          </Button>
          <Button>
            Sign Up
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;