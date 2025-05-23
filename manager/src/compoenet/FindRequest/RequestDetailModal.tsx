import { AcceptedRequest } from "../hooks/useAcceptedRequests";

interface RequestDetailModalProps {
  request: AcceptedRequest;
  onClose: () => void;
}

const RequestDetailModal = ({ request, onClose }: RequestDetailModalProps) => {
  const hasReview = request.reviewWritten;

  if (!request) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl w-[90%] max-w-sm max-h-[90vh] overflow-y-auto p-6 shadow-lg text-sm text-gray-800">
        {/* 제목, 시간 */}
        <h2 className="text-base font-bold text-gray-900">{request.title}</h2>
        <p className="text-gray-600 mt-1">{request.date}</p>

        {/* 서비스 항목 */}
        {request.tasks && request.tasks.length > 0 && (
          <ul className="mt-4 space-y-1 text-sm">
            {request.tasks.map((task, idx) => (
              <li key={idx} className="text-green-600 font-medium">✔ {task}</li>
            ))}
          </ul>
        )}

        {/* 메모 */}
        {request.memo && (
          <div className="bg-red-100 text-red-800 text-sm rounded-md px-4 py-3 mt-5 whitespace-pre-line">
            <p className="font-bold mb-1">추가 요청사항</p>
            <p>{request.memo}</p>
          </div>
        )}

        {/* 정보 */}
        <div className="grid grid-cols-2 gap-y-2 mt-6 text-sm">
          <p className="text-gray-500">고객</p>
          <p className="text-right">{request.customer} 고객님</p>
          <p className="text-gray-500">서비스 유형</p>
          <p className="text-right">{request.title}</p>
          <p className="text-gray-500">예약 날짜</p>
          <p className="text-right font-semibold">{request.bookingDate}</p>
          <p className="text-gray-500">서비스 기간</p>
          <p className="text-right">{request.duration}</p>
          <p className="text-gray-500">위치</p>
          <p className="text-right font-semibold">{request.address}</p>
        </div>

        <hr className="my-5" />

        {/* 가격 */}
        <div className="grid grid-cols-2 gap-y-2 text-sm">
          <p className="text-gray-500">예약금</p>
          <p className="text-right">₩{request.amount.toLocaleString()}</p>
          <p className="text-gray-500">수수료 or 추가 비용</p>
          <p className="text-right">₩{request.fee.toLocaleString()}</p>
          <p className="font-bold text-base col-span-2 text-right text-indigo-600">
            Total: ₩{(request.amount + request.fee).toLocaleString()}
          </p>
        </div>

        {/* 버튼 */}
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