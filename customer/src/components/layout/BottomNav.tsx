import React from 'react';
import { FaHome, FaCalendarAlt, FaUserFriends, FaRegUser } from 'react-icons/fa';
import { cn } from '@/lib/utils';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
}

interface BottomNavProps {
  className?: string;
}

const NavItem = ({ icon, label, isActive = false }: NavItemProps) => {
  return (
    <div className={cn(
      "flex flex-col items-center",
      "text-gray-500",
      isActive && "text-primary"
    )}>
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </div>
  );
};

export const BottomNav = ({ className }: BottomNavProps) => {
  return (
    <nav className={cn(
      "h-14 bg-white border-t border-gray-200",
      "md:hidden fixed bottom-0 left-0 right-0 px-10",
      className
    )}>
      <div className={cn(
        "flex justify-between items-center h-full",
        "px-4 md:px-8",
        "max-w-7xl mx-auto"
      )}>
        <NavItem icon={<FaHome size={20} />} label="홈" isActive />
        <NavItem icon={<FaCalendarAlt size={20} />} label="예약" />
        <NavItem icon={<FaUserFriends size={20} />} label="매니저" />
        <NavItem icon={<FaRegUser size={20} />} label="내정보" />
      </div>
    </nav>
  );
}; 