import { FaMapMarkerAlt, FaUser } from 'react-icons/fa';
import PropTypes from 'prop-types';

const ScheduleCard = ({
  title,
  time,
  address,
  customer,
  rating,
  status,
  onStatusChange,
}) => {
  const renderButtons = () => {
    if (status === 'ready') {
      return (
        <>
          <button className="flex-1 border rounded-lg py-2 text-sm text-gray-700">
            전화하기
          </button>
          <button
            onClick={onStatusChange}
            className="flex-1 bg-violet-600 hover:bg-violet-700 text-white rounded-lg py-2 text-sm font-medium"
          >
            Check In
          </button>
        </>
      );
    }

    if (status === 'checked-in') {
      return (
        <>
          <button className="flex-1 border rounded-lg py-2 text-sm text-gray-700">
            전화하기
          </button>
          <button
            onClick={onStatusChange}
            className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg py-2 text-sm font-medium"
          >
            Check Out
          </button>
        </>
      );
    }

    if (status === 'completed') {
      return (
        <button
          disabled
          className="w-full border border-gray-300 bg-gray-100 text-gray-500 rounded-lg py-2 text-sm cursor-not-allowed"
        >
          완료
        </button>
      );
    }

    return null;
  };

  return (
    <div className="bg-white shadow rounded-xl p-4 mb-4">
      <div className="mb-2">
        <h3 className="font-bold text-base text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500">{time}</p>
      </div>

      <div className="flex items-center text-sm text-gray-500 mb-1">
        <FaMapMarkerAlt className="mr-2 text-gray-400" />
        <span>{address}</span>
      </div>

      <div className="flex items-center text-sm text-gray-500 mb-4">
        <FaUser className="mr-2 text-gray-400" />
        <span>
          Customer: {customer} ({rating} ★)
        </span>
      </div>

      <div className="flex gap-2">{renderButtons()}</div>
    </div>
  );
};

ScheduleCard.propTypes = {
  title: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  customer: PropTypes.string.isRequired,
  rating: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['ready', 'checked-in', 'completed']).isRequired,
  onStatusChange: PropTypes.func.isRequired,
};

export default ScheduleCard; 