import React from 'react';
import { FiUser } from 'react-icons/fi';
import { FaRegBell } from "react-icons/fa6";
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();
  return (
    <header className={cn(
      "w-full bg-primary text-white cursor-pointer",
      "h-[3.5rem] fixed top-0 left-0 right-0 z-50"
    )}>
      <div className={cn(
        "flex justify-between items-center h-full",
        "px-4 md:px-8",
        "max-w-7xl mx-auto"
      )}>
        <div className="font-bold text-lg">클린픽</div>
        <div className="flex items-center space-x-3">
          <FaRegBell size={20} className="text-white cursor-pointer hover:text-gray-900" />
          <FiUser size={24} className="text-white cursor-pointer hover:text-gray-900" onClick={() => navigate('/mypage')} />
        </div>
      </div>
    </header>
  );
}; 