import React from 'react';
import { FaHome, FaCalendarAlt, FaUserFriends, FaRegUser } from 'react-icons/fa';
import { cn } from '@/customer/lib/utils';
import { useNavigate, useLocation } from 'react-router-dom';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

interface BottomNavProps {
  className?: string;
}

const NavItem = ({ icon, label, isActive = false, onClick }: NavItemProps) => {
  return (
    <div 
      className={cn(
        "flex flex-col items-center",
        "text-gray-500",
        isActive && "text-primary",
        "cursor-pointer"
      )}
      onClick={onClick}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </div>
  );
};

export const BottomNav = ({ className }: BottomNavProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className={cn(
      "h-14 bg-white border-t border-gray-200",
      "md:hidden fixed bottom-0 left-0 right-0 px-10 ",
      className
    )}>
      <div className={cn(
        "flex justify-between items-center h-full",
        "px-4 md:px-8",
        "max-w-7xl mx-auto"
      )}>
        <NavItem 
          icon={<FaHome size={20} />} 
          label="홈" 
          isActive={isActive('/customer')}
          onClick={() => navigate('/customer')} 
        />
        <NavItem 
          icon={<FaCalendarAlt size={20} />} 
          label="예약" 
          isActive={isActive('/customer/schedule')}
          onClick={() => navigate('/customer/schedule')}
        />
        <NavItem 
          icon={<FaUserFriends size={20} />} 
          label="매니저" 
          isActive={isActive('/customer/managers')}
          onClick={() => navigate('/customer/managers')}
        />
        <NavItem 
          icon={<FaRegUser size={20} />} 
          label="내정보" 
          isActive={isActive('/mypage')}
          onClick={() => navigate('/mypage')}
        />
      </div>
    </nav>
  );
}; 