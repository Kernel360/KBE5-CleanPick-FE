import { useReviewToUser } from '@/manager/components/hooks/useReviewToUser';
import HeaderNav from '@/manager/layer/HeaderNav';
import { FaStar, FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ReviewToUser = () => {
    const { reviews } = useReviewToUser();
    const navigate = useNavigate();

    return (
        <div className="pt-[3.5rem] pb-14 px-4 max-w-2xl mx-auto">
            <HeaderNav title="고객 리뷰" showBack={true} />
            <h2 className="text-lg font-bold text-gray-800 mb-4">고객 리뷰</h2>

            <div className="space-y-4">
                {reviews.map((review) => (
                    <div key={review.id} className="bg-white p-4 rounded-xl shadow text-sm text-gray-700">
                        {/* 상단: 이름, 별점 */}
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <p className="text-base font-bold text-gray-800">{review.author}</p>
                                <span>🧹 {review.reviewType}</span>
                                <span className="flex items-center gap-1">
                                    <FaMapMarkerAlt className="text-gray-500" />
                                    {review.location}
                                </span>
                            </div>
                            <div className="flex items-center gap-1 text-yellow-500 text-sm font-semibold">
                                <FaStar />
                                <span>{review.rating}</span>
                            </div>
                        </div>

                        {/* 리뷰 본문 */}
                        <p className="text-gray-800 mb-3">{review.content}</p>

                        {/* 예약 상세 버튼 */}
                        <button
                            onClick={() => navigate(`/reservation/${review.reservationId}`)}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 transition text-white text-sm py-2 rounded-lg"
                        >
                            예약 상세보기
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReviewToUser;