import { AcceptedRequest } from "../hooks/useAcceptedRequests";

interface AcceptedRequestCardProps {
    request: AcceptedRequest;
    onToggle: (id: number) => void;
    isCompleted?: boolean;
  }
  
  const AcceptedRequestCard = ({ request, onToggle, isCompleted }: AcceptedRequestCardProps) => {
    const getButton = () => {
      if (isCompleted) {
        return (
          <button className="w-full bg-gray-300 text-white py-2 rounded-lg text-sm cursor-default">
            상세 보기
          </button>
        );
      }
  
      const isCheckIn = request.status === '체크인 대기';
      return (
        <button
          onClick={() => onToggle(request.id)}
          className={`w-full py-2 rounded-lg text-sm font-medium text-white ${
            isCheckIn ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-red-500 hover:bg-red-600'
          }`}
        >
          {isCheckIn ? '체크인 하기' : '체크아웃 하기'}
        </button>
      );
    };
  
    return (
      <div className="bg-gray-50 rounded-xl shadow p-4 text-sm text-gray-800">
        <h3 className="font-bold text-base mb-1">{request.title}</h3>
        <p className="text-gray-700">{request.date}</p>
        <p className="mt-2">📍 {request.address}</p>
        <p>👤 고객: {request.customer} (평점 {request.rating}★)</p>
        <p>⏱ 소요 시간: {request.duration}</p>
        <p>🌞 예상 수입: ₩{request.income.toLocaleString()}</p>
        <div className="mt-4">{getButton()}</div>
      </div>
    );
  };
  
  export default AcceptedRequestCard;  