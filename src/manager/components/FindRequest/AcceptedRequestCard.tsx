import { useState } from 'react';
import { AcceptedRequest } from "@/manager/components/hooks/useAcceptedRequests";
import RequestDetailModal from './RequestDetailModal';

interface AcceptedRequestCardProps {
  request: AcceptedRequest;
  onToggle: (id: number) => void;
  isCompleted?: boolean;
  onUpdate?: () => void;
}

const AcceptedRequestCard = ({ request, onToggle, isCompleted, onUpdate }: AcceptedRequestCardProps) => {
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  const isCheckIn = request.status === '체크인 대기';

  const handleConfirm = () => {
    setConfirmModalOpen(false);
    onToggle(request.id);
  };

  const getButton = () => {
    if (isCompleted) {
      return (
        <button
          onClick={() => setOpenDetailModal(true)}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg text-sm"
        >
          상세 보기
        </button>
      );
    }

    return (
      <button
        onClick={() => setConfirmModalOpen(true)}
        className={`w-full py-2 rounded-lg text-sm font-medium text-white ${
          isCheckIn ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-red-500 hover:bg-red-600'
        }`}
      >
        {isCheckIn ? '체크인 하기' : '체크아웃 하기'}
      </button>
    );
  };

  return (
    <>
      <div className="bg-gray-50 shadow-sm rounded-lg p-4 text-sm text-gray-800 border">
        <h3 className="font-bold text-base mb-1">{request.title}</h3>
        <p className="text-gray-700">{request.date}</p>
        <p className="mt-2">📍 {request.address}</p>
        <p>👤 고객: {request.customer} (평점 {request.rating}★)</p>
        <p>⏱ 소요 시간: {request.duration}</p>
        <p>🌞 예상 수입: ₩{request.income.toLocaleString()}</p>
        <div className="mt-4">{getButton()}</div>
      </div>

      {/* 상세 보기 모달 */}
      {openDetailModal && (
        <RequestDetailModal
          request={request}
          onClose={() => setOpenDetailModal(false)}
        />
      )}

      {/* 체크인/체크아웃 확인 모달 */}
      {confirmModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[80%] max-w-sm shadow-lg">
            <p className="text-sm text-gray-800 mb-4">
              {isCheckIn
                ? '정말 체크인 하시겠습니까?'
                : '정말 체크아웃 하시겠습니까?'}
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setConfirmModalOpen(false)}
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

export default AcceptedRequestCard;