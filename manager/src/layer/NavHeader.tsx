import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface HeaderNavProps {
  title: string;
  showBack?: boolean;
}

const HeaderNav: React.FC<HeaderNavProps> = ({ title, showBack = false }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // 뒤로가기
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-indigo-600 text-white px-4 py-3 text-lg font-bold z-50">
      <div className="flex items-center">
        {showBack && (
          <button onClick={handleBackClick} className="mr-2">
            <FaChevronLeft size={18} />
          </button>
        )}
        {title}
      </div>
    </div>
  );
};

export default HeaderNav;