import { Link } from 'react-router-dom';
import {
  FaUser,
  FaPencilAlt,
  FaFileAlt,
  FaCreditCard,
  FaBell,
  FaComments,
  FaClipboardList,
  FaChevronRight,
} from 'react-icons/fa';

const menus = [
  { icon: <FaUser />, label: '프로필 관리', href: '/manager/profileform' },
  { icon: <FaPencilAlt />, label: '나의 리뷰', href: '/manager/reviewToUser' },
  { icon: <FaFileAlt />, label: '서류 등록 (준비중)' }, // 보류
  { icon: <FaCreditCard />, label: '수입 내역', href: '/manager/incomeList' },
  { icon: <FaBell />, label: '알림 설정 (준비중)' }, // 보류
  { icon: <FaComments />, label: '고객 센터 (준비중)' }, // 보류
  { icon: <FaClipboardList />, label: '약관 및 정책', href: '/manager/policy' },
];

const MyPageMenu = () => {
  return (
    <div className="flex flex-col gap-4">
      {menus.map((menu, index) => {
        const content = (
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-3 text-gray-700 text-sm">
              <span className="text-lg">{menu.icon}</span>
              <span>{menu.label}</span>
            </div>
            <FaChevronRight size={14} className="text-gray-400" />
          </div>
        );

        return menu.href ? (
          <Link key={index} to={menu.href}>
            {content}
          </Link>
        ) : (
          <div key={index}>{content}</div>
        );
      })}
    </div>
  );
};

export default MyPageMenu;