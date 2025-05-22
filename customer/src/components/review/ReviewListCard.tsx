import React, { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { FaStar } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface Review {
  id: number;
  managerName: string;
  rating: number;
  content: string;
  createdAt: string;
}

const ReviewListCard: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [review, setReview] = useState<Review | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState('');
  const [editedRating, setEditedRating] = useState(0);

  // 임시 데이터 로드 (나중에 API 연동으로 대체)
  useEffect(() => {
    // TODO: API 연동
    setReview({
      id: Number(id),
      managerName: "홍길동",
      rating: 3,
      content: "넘 조아요~",
      createdAt: "방금전"
    });
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API 연동
    navigate('/review/list');
  };

  if (!review) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header 
        title={editMode ? "리뷰 수정" : "리뷰 상세"}
        showBack={true}
      />
      
      <div className="pt-[3.5rem] px-4">
        <div className="py-6">
          {/* 매니저 정보 */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              홍
            </div>
            <div>
              <div className="font-medium text-lg">{review.managerName}</div>
              <div className="text-sm text-gray-500">{review.createdAt}</div>
            </div>
          </div>

          {editMode ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 별점 선택 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  별점
                </label>
                <div className="flex gap-2">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setEditedRating(index + 1)}
                      className="focus:outline-none"
                    >
                      <FaStar
                        className={cn(
                          "w-8 h-8",
                          index < editedRating ? "text-yellow-400" : "text-gray-200"
                        )}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* 리뷰 내용 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  리뷰 내용
                </label>
                <textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  className={cn(
                    "w-full px-4 py-3 rounded-lg",
                    "border border-gray-300 focus:border-primary",
                    "outline-none transition-colors",
                    "min-h-[150px] resize-none"
                  )}
                  placeholder="리뷰 내용을 입력해주세요"
                />
              </div>

              {/* 수정 버튼 */}
              <button
                type="submit"
                className={cn(
                  "w-full py-4 rounded-lg",
                  "bg-primary text-white font-medium",
                  "hover:bg-primary/90 transition-colors"
                )}
              >
                수정하기
              </button>
            </form>
          ) : (
            <>
              {/* 별점 표시 */}
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, index) => (
                  <FaStar
                    key={index}
                    className={cn(
                      "w-6 h-6",
                      index < review.rating ? "text-yellow-400" : "text-gray-200"
                    )}
                  />
                ))}
              </div>

              {/* 리뷰 내용 */}
              <p className="text-gray-700 leading-relaxed">
                {review.content}
              </p>

              {/* 수정 버튼 */}
              <button
                onClick={() => {
                  setEditMode(true);
                  setEditedContent(review.content);
                  setEditedRating(review.rating);
                }}
                className={cn(
                  "w-full py-4 rounded-lg",
                  "bg-primary text-white font-medium",
                  "hover:bg-primary/90 transition-colors",
                  "mt-8"
                )}
              >
                수정하기
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewListCard; 