import React from 'react';
import PropTypes from 'prop-types';
import { FaHome, FaCalendarAlt, FaSearch, FaRegUser } from 'react-icons/fa';
import { cn } from '@/manager/lib/utils';
import { Link, useLocation } from 'react-router-dom';

const NavItem = ({ icon, label, href, active }) => (
  <Link to={href} className="flex-1">
    <div className={cn(
      "flex flex-col items-center text-xs",
      active ? "text-indigo-600" : "text-gray-500",
      "cursor-pointer transition-colors"
    )}>
      {icon}
      <div className="mt-0.5">{label}</div>
    </div>
  </Link>
);

NavItem.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired
};

const BottomNav = () => {
  const { pathname } = useLocation();

  const navs = [
    { label: "홈", icon: <FaHome size={20} />, href: "/manager" },
    { label: "요청", icon: <FaSearch size={20} />, href: "/manager/findrequest" },
    { label: "일정", icon: <FaCalendarAlt size={20} />, href: "/manager/schedule" },
    { label: "내 정보", icon: <FaRegUser size={20} />, href: "/manager/mypage" },
  ];

  return (
    <div className={cn(
      "fixed left-0 right-0 bottom-0 w-full",
      "bg-white border-t border-gray-200",
      "flex items-center h-14 z-10",
      "px-4 md:px-8"
    )}>
      <div className="flex justify-between items-center w-full max-w-7xl mx-auto">
        {navs.map(({ label, icon, href }) => (
          <NavItem
            key={href}
            icon={icon}
            label={label}
            href={href}
            active={pathname === href}
          />
        ))}
      </div>
    </div>
  );
};

export default BottomNav;