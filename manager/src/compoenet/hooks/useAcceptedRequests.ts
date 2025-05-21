import { useState } from 'react';

export type AcceptedRequest = {
  id: number;
  title: string;
  date: string;
  address: string;
  customer: string;
  rating: number;
  duration: string;
  income: number;
  status: '체크인 대기' | '체크아웃 대기' | '완료';
};

export const useAcceptedRequests = () => {
  const [requests, setRequests] = useState<AcceptedRequest[]>([
    {
      id: 1,
      title: '가정집 청소',
      date: '6월 15일, 오전 10:00 - 12:00',
      address: '비엔티안 시내, 123번지',
      customer: '김서연',
      rating: 4.8,
      duration: '2시간',
      income: 150000,
      status: '체크아웃 대기',
    },
    {
      id: 2,
      title: '사무실 청소',
      date: '6월 16일, 오후 2:00 - 5:00',
      address: '비엔티안 상업지구, 456번지',
      customer: '이민준',
      rating: 4.5,
      duration: '3시간',
      income: 250000,
      status: '체크인 대기',
    },
    {
      id: 3,
      title: '가정집 청소',
      date: '6월 17일, 오전 9:00 - 11:00',
      address: '비엔티안 북부, 789번지',
      customer: '박지우',
      rating: 5.0,
      duration: '2시간',
      income: 200000,
      status: '완료',
    },
    {
      id: 4,
      title: '에어컨 청소',
      date: '6월 10일, 오전 10:00 - 12:00',
      address: '비엔티안 시내, 123번지',
      customer: '최유진',
      rating: 4.2,
      duration: '2시간',
      income: 180000,
      status: '완료',
    },
    {
      id: 5,
      title: '사무실 청소',
      date: '6월 18일, 오후 4:00 - 6:00',
      address: '비엔티안 남구, 654번지',
      customer: '정현우',
      rating: 4.6,
      duration: '2시간',
      income: 220000,
      status: '체크인 대기',
    },
  ]);

  const handleToggleStatus = (id: number) => {
    setRequests((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        if (r.status === '체크인 대기') return { ...r, status: '체크아웃 대기' };
        if (r.status === '체크아웃 대기') return { ...r, status: '완료' };
        return r;
      })
    );
  };

  const acceptedRequests = requests.filter((r) => r.status !== '완료');
  const completedRequests = requests.filter((r) => r.status === '완료');

  return { requests, acceptedRequests, completedRequests, handleToggleStatus };
};