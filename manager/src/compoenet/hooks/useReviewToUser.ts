export interface ReviewToUserItem {
  id: number;
  author: string;
  rating: number;
  content: string;
  date: string;
  reservationId: number;
  reviewType: string; // 예: '특수 청소'
  location: string;   // 예: '비엔티안 시내'
}

export const useReviewToUser = () => {
  const reviews: ReviewToUserItem[] = [
    {
      id: 1,
      author: '김서연',
      rating: 1,
      content: '다 끝났는데 환불해달라고 난리난리',
      date: '2023년 5월 20일',
      reservationId: 101,
      reviewType: '특수 청소',
      location: '비엔티안 시내',
    },
    {
      id: 2,
      author: '박지민',
      rating: 5,
      content: '시간 약속도 잘 지키시고 청소도 꼼꼼하게 해주셔서 만족합니다.',
      date: '2023년 5월 15일',
      reservationId: 102,
      reviewType: '가정집 청소',
      location: '비엔티안 외곽',
    },
  ];

  return { reviews };
};