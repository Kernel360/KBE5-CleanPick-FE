import React from 'react';
import { Header } from '@/components/layout/Header';
import { FaStar } from 'react-icons/fa';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
interface Review {
  id: number;
  managerName: string;
  rating: number;
  content: string;
  createdAt: string;
}

// 임시 데이터 (나중에 API 연동으로 대체)
const tempReviews: Review[] = [
  {
    id: 1,
    managerName: "홍길동",
    rating: 3,
    content: "넘 조아요~",
    createdAt: "방금전"
  },
  {
    id: 2,
    managerName: "홍길동",
    rating: 3,
    content: "넘 조아요~",
    createdAt: "방금전"
  },
  {
    id: 3,
    managerName: "홍길동",
    rating: 3,
    content: "넘 조아요~",
    createdAt: "방금전"
  }
];

const ReviewCard: React.FC<Review> = ({ managerName, rating, content, createdAt }) => {
  return (
    <div className={cn(
      "bg-white p-4 rounded-lg",
      "border border-gray-100",
      "shadow-sm"
    )}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
          홍
        </div>
        <div>
          <div className="font-medium">{managerName}</div>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <FaStar
                key={index}
                className={cn(
                  "w-4 h-4",
                  index < rating ? "text-yellow-400" : "text-gray-200"
                )}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-xs text-gray-400 mt-4">{createdAt}</span>
      </div>
      <div className="mt-3">
        <p className="text-gray-600 text-sm my-5">{content}</p>
      </div>
      <button 
          className="text-white bg-primary text-sm font-medium w-full"
          onClick={() => {/* TODO: 리뷰 수정하기 */}}
        >
          리뷰 수정하기
        </button>
    </div>
  );
};

const ReviewList: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="나의 리뷰"
        showBack={true}
      />
      
      <div className="pt-[3.5rem] px-4">
        <div className="space-y-4 py-4">
          {tempReviews.map((review) => (
            <ReviewCard key={review.id} {...review} />
          ))}
        </div>

        {/* 리뷰가 없을 때 */}
        {tempReviews.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <p className="text-gray-500">아직 작성한 리뷰가 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewList; 