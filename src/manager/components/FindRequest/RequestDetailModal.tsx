import { AcceptedRequest } from "../hooks/useAcceptedRequests";
import ReviewWriteModal from "./ReviewWriteModal";
import { useState } from 'react';
import { FaCheck } from 'react-icons/fa';

interface RequestDetailModalProps {
  request: AcceptedRequest;
  onClose: () => void;
  onUpdate?: () => void;
}

const RequestDetailModal = ({ request, onClose, onUpdate }: RequestDetailModalProps) => {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewWritten, setReviewWritten] = useState(request.reviewWritten || false);
  const userId = 1; // TODO: Get from auth context or props

  const hasReview = reviewWritten;

  if (!request) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-gray-50 rounded-xl w-[90%] max-w-sm max-h-[90vh] overflow-y-auto p-6 shadow-lg text-sm text-gray-800">
        {/* 제목, 시간 */}
        <h2 className="text-base font-bold text-gray-900">{request.title}</h2>
        <p className="text-gray-600 mt-1">{request.date}</p>

        {/* 서비스 항목 */}
        {request.tasks && request.tasks.length > 0 && (
          <ul className=" -ml-4 mt-4 space-y-2 text-sm">
            {request.tasks.map((task, idx) => (
              <li key={idx} className="flex items-center text-gray-600 font-medium">
                <FaCheck className="mr-2 text-green-500" size={16} />
                {task}
              </li>
            ))}
          </ul>
        )}

        {/* 메모 */}
        {request.memo && (
          <div className="bg-red-100 text-red-800 text-sm rounded-md px-4 py-3 mt-5 whitespace-pre-line border">
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
          onClick={() => setShowReviewModal(true)}
          className={`mt-6 w-full py-3 rounded-lg text-white text-sm font-semibold ${hasReview
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          disabled={hasReview}
        >
          {hasReview ? '리뷰 작성 완료' : '리뷰 쓰기'}

        </button>

        {showReviewModal && (
          <ReviewWriteModal
            userId={userId}
            customerName={request.customer}
            serviceType={request.title}
            date={request.date}
            onClose={() => setShowReviewModal(false)}
            onSubmit={(rating, content) => {
              console.log('제출됨', rating, content);
              // TODO: API 요청 후 상태 업데이트
              setReviewWritten(true); // ✅ 상태 변경
              setShowReviewModal(false);
            }}
          />
        )}


        <button
          onClick={() => {
            onClose();
            if (onUpdate) onUpdate(); // ✅ 업데이트 트리거
          }}
          className="mt-3 text-sm py-3 text-white w-full text-center"
        >
          닫기
        </button>

      </div>
    </div>
  );
};

export default RequestDetailModal;