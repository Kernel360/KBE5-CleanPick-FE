import { FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Income = () => {
  const navigate = useNavigate();

  return (
    <div className="px-4 py-6">
      {/* Section Title */}
      <div
        className="flex items-center justify-between mb-4 cursor-pointer"
        onClick={() => navigate('/manager/incomelist')}
      >
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold text-gray-800">이번달 수입 내역</h2>
          <FaChevronRight className="text-gray-500" size={14} />
        </div>
      </div>

      {/* Income Cards */}
      <div className="flex gap-3">
        {/* 오늘까지 수입 */}
        <div className="flex-1 rounded-xl shadow px-4 py-3 bg-white">
          <p className="text-sm text-gray-500">오늘까지 수입</p>
          <p className="text-lg font-semibold text-gray-800">150,000원</p>
        </div>

        {/* 이번달 예상 수입 */}
        <div className="flex-1 rounded-xl shadow px-4 py-3 bg-white">
          <p className="text-sm text-gray-500">이번달 예상 수입</p>
          <p className="text-lg font-semibold text-gray-800">450,000원</p>
        </div>
      </div>
    </div>
  );
};

export default Income;