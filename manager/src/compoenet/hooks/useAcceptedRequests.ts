import { useState } from 'react';

export interface AcceptedRequest {
  id: number;
  title: string;
  date: string;
  time: string;
  address: string;
  customer: string;
  rating: number;
  duration: string;
  income: number;
  manager: string;
  tasks?: string[];
  bookingDate: string;
  amount: number;
  fee: number;
  reviewWritten?: boolean;
  status?: string;
  memo?: string;
}

export const useAcceptedRequests = () => {
  const [requests, setRequests] = useState<AcceptedRequest[]>([
    {
      id: 1,
      title: '가정집 청소',
      date: '6월 15일, 오전 10:00 - 12:00',
      time: '오전 10:00 - 12:00',
      address: '비엔티안 시내, 123번지',
      customer: '김서연',
      rating: 4.8,
      duration: '2 hours',
      income: 150000,
      amount: 150000,
      fee: 15000,
      bookingDate: 'June 14, 10:00 AM',
      manager: '홍길동 님',
      tasks: ['일반 청소', '욕실 청소', '주방 청소'],
      memo: '고양이가 있으니까 아래쪽에 있는 창문은 절대 열지 말아주세요!!!!',
      reviewWritten: false,
      status: '체크아웃 대기',
    },
    {
      id: 2,
      title: '사무실 청소',
      date: '6월 16일, 오후 2:00 - 5:00',
      time: '오후 2:00 - 5:00',
      address: '비엔티안 상업지구, 456번지',
      customer: '이민준',
      rating: 4.5,
      duration: '3 hours',
      income: 250000,
      amount: 250000,
      fee: 20000,
      bookingDate: 'June 15, 11:00 AM',
      manager: '홍길동 님',
      tasks: ['바닥 청소', '책상 정리'],
      reviewWritten: false,
      status: '체크인 대기',
    },
    {
      id: 3,
      title: '가정집 청소',
      date: '6월 17일, 오전 9:00 - 11:00',
      time: '오전 9:00 - 11:00',
      address: '비엔티안 북부, 789번지',
      customer: '박지우',
      rating: 5.0,
      duration: '2 hours',
      income: 200000,
      amount: 200000,
      fee: 0,
      bookingDate: 'June 16, 9:00 AM',
      manager: '홍길동 님',
      tasks: ['욕실 청소', '거실 정리'],
      memo: '',
      reviewWritten: true, // 만약 리뷰가 있다면?
      status: '완료',
    },
    {
      id: 4,
      title: '에어컨 청소',
      date: '6월 10일, 오전 10:00 - 12:00',
      time: '오전 10:00 - 12:00',
      address: '비엔티안 시내, 123번지',
      customer: '최유진',
      rating: 4.2,
      duration: '2 hours',
      income: 180000,
      amount: 180000,
      fee: 10000,
      bookingDate: 'June 9, 2:00 PM',
      manager: '홍길동 님',
      tasks: ['에어컨 필터 청소'],
      memo: '고양이가 있으니까 아래쪽에 있는 창문은 절대 열지 말아주세요!!!!',
      reviewWritten: false,
      status: '완료',
    },
    {
      id: 5,
      title: '사무실 청소',
      date: '6월 18일, 오후 4:00 - 6:00',
      time: '오후 4:00 - 6:00',
      address: '비엔티안 남구, 654번지',
      customer: '정현우',
      rating: 4.6,
      duration: '2 hours',
      income: 220000,
      amount: 220000,
      fee: 10000,
      bookingDate: 'June 17, 5:00 PM',
      manager: '홍길동 님',
      tasks: ['바닥 청소', '창문 닦기'],
      reviewWritten: false,
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

  return {
    requests,
    acceptedRequests,
    completedRequests,
    handleToggleStatus,
  };
};