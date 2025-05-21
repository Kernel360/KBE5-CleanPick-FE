import { AcceptedRequest } from '@/compoenet/hooks/useAcceptedRequests';

interface Props {
  request: AcceptedRequest;
  onToggle: (id: number) => void;
}

const AcceptedRequestCard = ({ request, onToggle }: Props) => {
  const isCheckedIn = request.status === '체크인됨';

  return (
    <div className="bg-gray-50 rounded-xl shadow p-4 text-sm text-gray-800">
      <h3 className="font-bold text-base mb-1">{request.title}</h3>
      <p className="text-gray-700">{request.date}</p>
      <p className="mt-2">📍 {request.address}</p>
      <p>👤 고객: {request.customer} (평점 {request.rating}★)</p>
      <p>⏱ 소요 시간: {request.duration}</p>
      <p>🌞 예상 수입: ₩{request.income.toLocaleString()}</p>

      <button
        onClick={() => onToggle(request.id)}
        className={`mt-4 w-full py-2 text-sm font-medium text-white rounded-lg ${
          isCheckedIn
            ? 'bg-red-500 hover:bg-red-600'
            : 'bg-indigo-600 hover:bg-indigo-700'
        }`}
      >
        {isCheckedIn ? '체크아웃 하기' : '체크인 하기'}
      </button>
    </div>
  );
};

export default AcceptedRequestCard;