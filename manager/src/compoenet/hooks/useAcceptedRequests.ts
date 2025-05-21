import { useState } from 'react';

export type AcceptedRequest = {
  id: number;
  title: '가정집 청소' | '사무실 청소';
  date: string;
  address: string;
  customer: string;
  rating: number;
  duration: string;
  income: number;
  status: '체크인전' | '체크인됨' | '완료됨';
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
      status: '체크인됨', // 빨간 버튼
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
      status: '체크인전', // 파란 버튼
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
      status: '체크인전',
    },
  ]);

  const handleToggleStatus = (id: number) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id
          ? {
              ...req,
              status:
                req.status === '체크인전'
                  ? '체크인됨'
                  : req.status === '체크인됨'
                  ? '완료됨'
                  : req.status,
            }
          : req
      )
    );
  };

  const filtered = requests.filter((r) => r.status !== '완료됨');

  return { requests: filtered, handleToggleStatus };
};