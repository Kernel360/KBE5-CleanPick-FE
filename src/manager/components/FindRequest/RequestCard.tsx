import { useState } from 'react';
import { Request } from '@/manager/components/hooks/useNewRequests';

interface RequestCardProps {
  request: Request;
  onApply: (id: number) => void;
  onReject?: (id: number) => void; // ← 거절 기능이 필요할 경우
}

const RequestCard = ({ request, onApply, onReject }: RequestCardProps) => {
  const isPending = request.status === '대기중';

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [actionType, setActionType] = useState<'apply' | 'reject' | null>(null);

  const getCardColor = () => {
    if (request.matchType === '1:1') return 'bg-[#FFEEDB] border border-[#FF8000]';
    if (request.matchType === '신규' && request.isRecurring) return 'bg-[#E5F9E5] border border-[#10B981]';
    return 'bg-[#F9FAFB] border border-[#D1D5DB]';
  };

  const handleAction = () => {
    setConfirmOpen(false);
    if (actionType === 'apply') onApply(request.id);
    if (actionType === 'reject' && onReject) onReject(request.id);
    setActionType(null);
  };

  return (
    <>
      <div className={`p-3 rounded-lg shadow-sm text-sm text-gray-800 ${getCardColor()} flex flex-col gap-3`}>
        <div>
          <h3 className="text-base font-extrabold">{request.title}</h3>
          <p className="text-xs text-gray-500 mt-1">{request.date}</p>
        </div>

        <p className="text-sm text-gray-600">📍 {request.address}</p>
        <p className="text-sm text-gray-600">👤 고객: {request.customer} (평점 {request.rating}★)</p>
        <p className="text-sm text-gray-600">⏱ 소요 시간: {request.duration}</p>
        <p className="text-sm text-gray-600">🌞 예상 수입: ₩{request.income.toLocaleString()}</p>

        <div className="flex gap-2 mt-2">
          {!isPending && (
            <button
              onClick={() => {
                setActionType('reject');
                setConfirmOpen(true);
              }}
              className="flex-1 h-9 rounded-md border border-gray-300 bg-white text-gray-600 text-sm font-medium"
            >
              거절하기
            </button>
          )}
          <button
            onClick={() => {
              if (!isPending) {
                setActionType('apply');
                setConfirmOpen(true);
              }
            }}
            disabled={isPending}
            className={`${
              isPending ? 'w-full' : 'flex-1'
            } h-9 rounded-md text-sm font-medium text-white ${
              isPending ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {isPending ? '대기중' : '신청하기'}
          </button>
        </div>
      </div>

      {/* ✅ 확인 모달 */}
      {confirmOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[80%] max-w-sm shadow-lg">
            <p className="text-sm text-gray-800 mb-4">
              {actionType === 'apply'
                ? '정말 이 요청을 신청하시겠습니까?'
                : '정말 이 요청을 거절하시겠습니까?'}
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setConfirmOpen(false)}
                className="px-4 py-2 rounded text-sm text-gray-600 border border-gray-300"
              >
                취소
              </button>
              <button
                onClick={handleAction}
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

export default RequestCard;