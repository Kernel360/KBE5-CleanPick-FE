import { useState } from 'react';
import { FaStar } from 'react-icons/fa';

interface ReviewWriteModalProps {
  userId: number;
  customerName: string;
  serviceType: string;
  date: string;
  onClose: () => void;
  onSubmit: (rating: number, content: string) => void;
}

const ReviewWriteModal = ({
  userId,
  customerName,
  serviceType,
  date,
  onClose,
  onSubmit,
}: ReviewWriteModalProps) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (content.trim() && rating > 0) {
      onSubmit(rating, content.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl w-[90%] max-w-sm max-h-[90vh] overflow-y-auto p-6 shadow-lg text-sm text-gray-800">
        {/* 고객 정보 */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gray-200 rounded-full" />
          <div>
            <p className="font-bold">{customerName} 고객님</p>
            <p className="text-sm text-gray-500">{serviceType} · {date}</p>
          </div>
        </div>

        {/* 별점 */}
        <div className="bg-gray-50 p-4 rounded-xl mb-4">
          <p className="font-bold mb-2">서비스는 어떠셨나요?</p>
          <div className="flex items-center gap-1 mb-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar
                key={i}
                size={24}
                className={`cursor-pointer ${
                  (hover || rating) > i ? 'text-yellow-400' : 'text-gray-300'
                }`}
                onMouseEnter={() => setHover(i + 1)}
                onMouseLeave={() => setHover(0)}
                onClick={() => setRating(i + 1)}
              />
            ))}
          </div>
          <p className="text-sm mt-1 text-gray-600">{rating}.0 / 5.0</p>
        </div>

        {/* 텍스트 입력 */}
        <div className="mb-10">
          <p className="font-bold mb-1">리뷰를 작성해주세요</p>
          <textarea
            className="w-full border rounded px-3 py-2 text-sm text-gray-700"
            placeholder="청소 서비스에 대한 솔직한 의견을 남겨주세요. 다른 고객들에게 도움이 됩니다."
            maxLength={100}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <p className="text-xs text-right text-gray-400 mt-1">
            {content.length} / 100
          </p>
        </div>

        {/* 버튼 */}
        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded"
        >
          리뷰 등록하기
        </button>

        <button
          onClick={onClose}
          className="mt-2 w-full text-center text-sm text-gray-400"
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default ReviewWriteModal;