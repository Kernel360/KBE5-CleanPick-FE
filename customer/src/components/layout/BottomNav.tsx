import React from 'react';
import { FaHome, FaCalendarAlt, FaUserFriends, FaRegUser } from 'react-icons/fa';
import { cn } from '@/lib/utils';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
}

const NavItem = ({ icon, label, isActive }: NavItemProps) => {
  return (
    <div className={cn(
      "flex flex-col items-center text-xs",
      isActive ? "text-indigo-600" : "text-gray-500",
      "cursor-pointer transition-colors",
      "flex-1"
    )}>
      {icon}
      <div className="mt-0.5">{label}</div>
    </div>
  );
};

export const BottomNav = () => {
  return (
    <div className={cn(
      "fixed left-0 right-0 bottom-0 w-full",
      "bg-white border-t border-gray-200",
      "flex items-center h-14 z-10",
      "px-4 md:px-8"
    )}>
      <div className={cn(
        "flex justify-between items-center w-full",
        "max-w-7xl mx-auto"
      )}>
        <NavItem icon={<FaHome size={20} />} label="홈" isActive />
        <NavItem icon={<FaCalendarAlt size={20} />} label="예약" />
        <NavItem icon={<FaUserFriends size={20} />} label="매니저" />
        <NavItem icon={<FaRegUser size={20} />} label="내정보" />
      </div>
    </div>
  );
}; 