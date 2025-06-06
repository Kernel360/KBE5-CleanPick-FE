import { useState } from 'react';

export interface Review {
  id: number;
  author: string;
  content: string;
  date: string;
  rating: number;
}

export const useMyReviews = () => {
  const [reviews] = useState<Review[]>([
    {
      id: 1,
      author: '김서연',
      content:
        '정말 깨끗하게 청소해주셨어요! 특히 욕실 청소가 정말 만족스러웠습니다. 다음에도 꼭 부탁드릴게요.',
      date: '2023년 5월 20일',
      rating: 5,
    },
    {
      id: 2,
      author: '박지민',
      content:
        '시간 약속을 잘 지키시고 친절하게 응대해주셨어요. 청소도 꼼꼼하게 해주셔서 만족합니다.',
      date: '2023년 5월 15일',
      rating: 5,
    },
  ]);

  return { reviews };
};