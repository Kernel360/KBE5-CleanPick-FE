import { useState } from 'react';

export type MatchType = '1:1' | '신규';

export type Request = {
  id: number;
  title: string;
  date: string;
  address: string;
  customer: string;
  rating: number;
  duration: string;
  income: number;
  matchType: MatchType;
  isRecurring: boolean;
  status: string;
};

export const useNewRequests = () => {
  const [requests, setRequests] = useState<Request[]>([
    // ✅ 주황 (직접요청)
    {
      id: 1,
      title: '가정집 청소',
      date: '6월 15일, 오전 10:00 - 12:00',
      address: '비엔티안 시내, 123번지',
      customer: '김서연',
      rating: 4.8,
      duration: '2시간',
      income: 150000,
      matchType: '1:1',
      isRecurring: false,
      status: '대기전',
    },
    // ✅ 초록 (랜덤 + 정기예약)
    {
      id: 2,
      title: '사무실 청소',
      date: '6월 16일, 오후 2:00 - 5:00',
      address: '비엔티안 상업지구, 456번지',
      customer: '이민준',
      rating: 4.5,
      duration: '3시간',
      income: 250000,
      matchType: '신규',
      isRecurring: true,
      status: '대기전',
    },
    // ✅ 회색 (랜덤 + 1회)
    {
      id: 3,
      title: '원룸 청소',
      date: '6월 17일, 오후 1:00 - 2:30',
      address: '비엔티안 북구, 789번지',
      customer: '최예린',
      rating: 4.6,
      duration: '1.5시간',
      income: 100000,
      matchType: '신규',
      isRecurring: false,
      status: '대기전',
    },
  ]);

  const handleApply = (id: number) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: '대기중' } : r
      )
    );
  };

  return { requests, handleApply };
};