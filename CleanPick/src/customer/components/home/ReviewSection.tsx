import React from 'react';
import { ReviewCard } from './ReviewCard';

const review = [
  {
    user: '김세리',
    date: '2023년 5월 20일',
    content: '매니저님이 꼼꼼하게 청소해주셔서 집이 정말 깨끗해졌어요! 다음에도 또 이용할게요.',
    rating: 5,
  },
  {
    user: '김세리',
    date: '2023년 5월 20일',
    content: '매니저님이 꼼꼼하게 청소해주셔서 집이 정말 깨끗해졌어요! 다음에도 또 이용할게요.',
    rating: 5,
  },
  {
    user: '김세리',
    date: '2023년 5월 20일',
    content: '매니저님이 꼼꼼하게 청소해주셔서 집이 정말 깨끗해졌어요! 다음에도 또 이용할게요.',
    rating: 5,
  },
  {
    user: '김세리',
    date: '2023년 5월 20일',
    content: '매니저님이 꼼꼼하게 청소해주셔서 집이 정말 깨끗해졌어요! 다음에도 또 이용할게요.',
    rating: 5,
  },


];

export const ReviewSection = () => {
  return (
    <section className="mx-4 mt-7 mb-[70px]">
      <div className="text-base font-bold mb-2">사용자 리뷰</div>
      {review.map((review) => (
        <ReviewCard key={review.user} {...review}  />
      ))}
    </section>
  );
}; 