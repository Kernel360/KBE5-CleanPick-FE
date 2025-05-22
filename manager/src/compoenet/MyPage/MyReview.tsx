import { useMyReviews } from "../hooks/useMyReview";
import { FaStar } from 'react-icons/fa';

const MyReview = () => {
  const { reviews } = useMyReviews();

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-800">고객 리뷰</h2>
        <div className="flex items-center gap-1 text-yellow-500 text-sm">
          <FaStar />
          <span className="font-semibold text-orange-500">4.8</span>
          <span className="text-gray-500">(32)</span>
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white p-4 rounded-xl shadow text-sm text-gray-700"
          >
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500 mr-2">
                {review.author.charAt(0)}
              </div>
              <p className="font-semibold mr-2">{review.author}</p>
              <div className="flex text-yellow-500">
                {Array.from({ length: review.rating }, (_, i) => (
                  <FaStar key={i} size={14} />
                ))}
              </div>
            </div>
            <p className="mb-2 text-gray-800">{review.content}</p>
            <p className="text-xs text-gray-400">{review.date}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <button className="text-indigo-600 text-sm font-medium">
          더 많은 리뷰 보기 ⌄
        </button>
      </div>
    </div>
  );
};

export default MyReview;