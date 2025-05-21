import { Request } from '@/compoenet/hooks/useNewRequests';

interface RequestCardProps {
  request: Request;
  onApply: (id: number) => void;
}

const RequestCard = ({ request, onApply }: RequestCardProps) => {
  const isPending = request.status === '대기중';

  const getCardColor = () => {
    if (request.matchType === '1:1') return 'bg-[#FFEEDB] border border-[#FF8000]';
    if (request.matchType === '신규' && request.isRecurring) return 'bg-[#E5F9E5] border border-[#10B981]';
    return 'bg-[#F9FAFB] border border-[#D1D5DB]'; // 회색 계열
  };

  return (
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
          <button className="flex-1 h-9 rounded-md border border-gray-300 bg-white text-gray-600 text-sm font-medium">
            거절하기
          </button>
        )}
        <button
          onClick={() => onApply(request.id)}
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
  );
};

export default RequestCard;