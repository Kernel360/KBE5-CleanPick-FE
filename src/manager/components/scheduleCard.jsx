import { useState } from 'react';
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
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [actionType, setActionType] = useState(null);

  const handleConfirm = () => {
    setConfirmOpen(false);
    if (actionType) onStatusChange();
    setActionType(null);
  };

  const handleClickAction = (type) => {
    setActionType(type);
    setConfirmOpen(true);
  };

  const renderButtons = () => {
    if (status === 'ready') {
      return (
        <>
          <button className="flex-1 border rounded-lg py-2 text-sm text-gray-700">
            전화하기
          </button>
          <button
            onClick={() => handleClickAction('checkin')}
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
            onClick={() => handleClickAction('checkout')}
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
    <>
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
            고객: {customer} ({rating} ★)
          </span>
        </div>

        <div className="flex gap-2">{renderButtons()}</div>
      </div>

      {/* ✅ 확인 모달 */}
      {confirmOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[80%] max-w-sm shadow-lg">
            <p className="text-sm text-gray-800 mb-4">
              {actionType === 'checkin'
                ? '정말 체크인 하시겠습니까?'
                : '정말 체크아웃 하시겠습니까?'}
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setConfirmOpen(false)}
                className="px-4 py-2 rounded text-sm text-gray-600 border border-gray-300"
              >
                취소
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 rounded text-sm text-white bg-indigo-600 hover:bg-indigo-700"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </>
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