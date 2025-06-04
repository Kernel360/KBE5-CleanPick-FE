import { FaChevronLeft } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

interface HeaderNavProps {
  title: string;
  showBack?: boolean;
  customBackPath?: string;
}

const HeaderNav: React.FC<HeaderNavProps> = ({
  title,
  showBack = true,
  customBackPath = null,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/manager';

  const handleBackClick = () => {
    if (customBackPath) {
      navigate(customBackPath);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-16 bg-primary text-white px-4 text-lg font-bold z-50">
      <div className="flex items-center h-full">
        {!isHomePage && (
          <button onClick={handleBackClick} className="mr-2 bg-primary hover:text-gray-200 transition-colors">
            <FaChevronLeft size={18} />
          </button>
        )}
        {isHomePage ? 'CleanPick' : title}
      </div>
    </div>
  );
};

export default HeaderNav;