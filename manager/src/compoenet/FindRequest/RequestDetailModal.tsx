import { AcceptedRequest } from "../hooks/useAcceptedRequests";

interface RequestDetailModalProps {
  request: AcceptedRequest;
  onClose: () => void;
}

const RequestDetailModal = ({ request, onClose }: RequestDetailModalProps ) => {
    const hasReview = request.reviewWritten;
  
    if (!request) return null; // 혹시라도 undefined로 들어올 경우
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
        <div className="bg-white rounded-xl w-[90%] max-w-md max-h-[90vh] overflow-y-auto p-6 shadow-lg">
          <h2 className="text-xl font-bold text-gray-900">{request.title}</h2>
          <p className="text-gray-600 mt-1">{request.date}, {request.time}</p>
  
          {request.tasks && request.tasks.length > 0 && (
            <ul className="mt-4 text-sm text-gray-700 space-y-1">
              {request.tasks.map((task, i) => (
                <li key={i}>✅ {task}</li>
              ))}
            </ul>
          )}
  
          <div className="bg-green-100 text-green-700 text-sm rounded mt-4 px-3 py-1 inline-block">
            매칭된 매니저: <strong>{request.manager}</strong>
          </div>
  
          <div className="mt-6 space-y-2 text-sm text-gray-800">
            <p>서비스 유형: <strong>{request.title}</strong></p>
            <p>예약 날짜: <strong>{request.bookingDate}</strong></p>
            <p>서비스 시간: <strong>{request.duration}</strong></p>
            <p>위치: <strong>{request.address}</strong></p>
          </div>
  
          <hr className="my-4" />
  
          <div className="text-sm text-gray-800 space-y-1">
            <p>예약금: ₩{(request.amount ?? 0).toLocaleString()}</p>
            <p>수수료 or 추가 비용: ₩{(request.fee ?? 0).toLocaleString()}</p>
            <p className="font-bold text-lg text-indigo-600">
              Total: ₩{((request.amount ?? 0) + (request.fee ?? 0)).toLocaleString()}
            </p>
          </div>
  
          <button
            className={`mt-6 w-full py-3 rounded-lg text-white text-sm font-semibold ${
              hasReview
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
            disabled={hasReview}
          >
            {hasReview ? '리뷰 작성 완료' : '리뷰 쓰기'}
          </button>
  
          <button
            onClick={onClose}
            className="mt-3 text-sm text-gray-400 w-full text-center"
          >
            닫기
          </button>
        </div>
      </div>
    );
  };

export default RequestDetailModal;  