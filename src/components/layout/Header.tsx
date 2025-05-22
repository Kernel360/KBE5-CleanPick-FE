import React from 'react';
import { FiUser} from 'react-icons/fi';
import { FaRegBell } from "react-icons/fa6";
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft } from "react-icons/fa";

interface HeaderProps {
  title: string;
  showBack?: boolean;
  showIcons?: boolean;
  onBackClick?: () => void;
} 

export const Header = ({ 
  title, 
  showBack = false, 
  showIcons = false,
  onBackClick
}: HeaderProps) => {

  const navigate = useNavigate();

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      navigate(-1);
    }
  };

  return (
    <header className={cn(
      "w-full bg-primary text-white",
      "h-[3.5rem]",
      "fixed top-0 left-0 z-50"
    )}>
      <div className={cn(
        "flex justify-between items-center h-full",
        "px-4 md:px-8",
        "max-w-7xl mx-auto"
      )}>
        <div className="flex items-center ">
          {showBack ? (
            <>
                <button 
                  onClick={handleBackClick}
                  className="hover:text-gray-200 transition-colors bg-primary"
                >
                  <FaChevronLeft size={15} />
                </button>
              <div className="font-bold text-lg  ">{title}</div>
            </>
          ) : (
            <div className="font-bold text-lg hover:cursor-pointer" onClick={() => navigate('/')}>{title}</div>
          )}
      
        </div>
        {showIcons && (
          <div className="flex items-center space-x-3">
            <button className="hover:text-gray-200 transition-colors bg-primary">
              <FaRegBell size={20} />
            </button>
            <button className="hover:text-gray-200 transition-colors bg-primary">
              <FiUser size={24} />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}; 