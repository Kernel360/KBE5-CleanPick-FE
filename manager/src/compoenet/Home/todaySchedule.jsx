import { FaChevronRight, FaMapMarkerAlt, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const TodaySchedule = () => {
  const navigate = useNavigate();

  return (

    <div className="px-4 py-6">
      {/* Section Title */}
      
      <div className="flex items-center justify-between mb-4"
        onClick={() => navigate('/todaylist')}
      >
        
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold text-gray-800">오늘 일정 </h2>
          <FaChevronRight className="text-gray-500" size={14} />
        </div>

      </div>

      {/* Schedule Card */}
      <div className="bg-white shadow rounded-xl p-4">
        {/* Title + Time */}
        <div className="mb-2">
          <h3 className="font-bold text-base text-gray-800">Home Cleaning</h3>
          <p className="text-sm text-gray-500">10:00 AM - 12:00 PM</p>
        </div>

        {/* Address */}
        <div className="flex items-center text-sm text-gray-500 mb-1">
          <FaMapMarkerAlt className="mr-2 text-gray-400" />
          <span>123 Main Street, Vientiane</span>
        </div>

        {/* Customer */}
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <FaUser className="mr-2 text-gray-400" />
          <span>Customer: Kim (5.0 ★)</span>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button className="flex-1 border border-gray-300 rounded-lg py-2 text-sm text-gray-700">
            전화하기
          </button>
          <button className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg py-2 text-sm font-medium">
            Check out
          </button>
        </div>
      </div>
    </div>
    
  );
};

export default TodaySchedule;