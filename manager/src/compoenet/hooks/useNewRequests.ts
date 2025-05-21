// useNewRequests.ts
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
    {
      id: 1,
      title: '사무실 청소',
      date: '6월 27일, 오후 10:00 - 10:00',
      address: '제주특별자치도 계룡시 학동거리',
      customer: '이예진',
      rating: 4.5,
      duration: '2시간',
      income: 251427,
      matchType: '신규',
      isRecurring: false,
      status: '대기전',
    },
    {
      id: 2,
      title: '가정집 청소',
      date: '6월 21일, 오전 10:00 - 10:00',
      address: '울산광역시 마포구 서초중앙0길',
      customer: '고상철',
      rating: 4.5,
      duration: '2시간',
      income: 294794,
      matchType: '1:1',
      isRecurring: true,
      status: '대기중',
    },
    {
      id: 3,
      title: '사무실 청소',
      date: '6월 29일, 오전 10:00 - 10:00',
      address: '제주특별자치도 충주시 삼성길',
      customer: '박준영',
      rating: 4.6,
      duration: '2시간',
      income: 283458,
      matchType: '1:1',
      isRecurring: true,
      status: '대기중',
    },
    {
      id: 4,
      title: '가정집 청소',
      date: '6월 22일, 오전 10:00 - 12:00',
      address: '경기도 부천시 테헤란3가',
      customer: '김정식',
      rating: 4.3,
      duration: '3시간',
      income: 163767,
      matchType: '신규',
      isRecurring: false,
      status: '대기전',
    },
    {
      id: 5,
      title: '사무실 청소',
      date: '6월 19일, 오후 9:00 - 10:00',
      address: '경기도 태안군 학동길',
      customer: '허경희',
      rating: 4.1,
      duration: '1시간',
      income: 284519,
      matchType: '1:1',
      isRecurring: true,
      status: '대기전',
    },
    {
      id: 6,
      title: '사무실 청소',
      date: '6월 28일, 오후 9:00 - 11:00',
      address: '제주특별자치도 청주시 상당구',
      customer: '김정수',
      rating: 4.8,
      duration: '1시간',
      income: 120288,
      matchType: '1:1',
      isRecurring: false,
      status: '대기전',
    },
    {
      id: 7,
      title: '사무실 청소',
      date: '6월 26일, 오후 11:00 - 11:00',
      address: '경기도 홍천군 논현길',
      customer: '한정식',
      rating: 4.2,
      duration: '3시간',
      income: 203256,
      matchType: '신규',
      isRecurring: false,
      status: '대기전',
    },
    {
      id: 8,
      title: '사무실 청소',
      date: '6월 16일, 오후 9:00 - 11:00',
      address: '대구광역시 양천구 서초대길',
      customer: '이정웅',
      rating: 4.8,
      duration: '2시간',
      income: 183019,
      matchType: '신규',
      isRecurring: true,
      status: '대기전',
    },
    {
      id: 9,
      title: '사무실 청소',
      date: '6월 24일, 오후 9:00 - 11:00',
      address: '경상남도 성남시 수정구 역삼로',
      customer: '윤중수',
      rating: 4.4,
      duration: '1시간',
      income: 117085,
      matchType: '1:1',
      isRecurring: false,
      status: '대기중',
    },
    {
      id: 10,
      title: '사무실 청소',
      date: '6월 26일, 오전 11:00 - 11:00',
      address: '광주광역시 동구 봉은사거리',
      customer: '김은경',
      rating: 4.5,
      duration: '3시간',
      income: 182047,
      matchType: '1:1',
      isRecurring: true,
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

  const appliedRequests = requests.filter((r) => r.status === '대기중');

  return { requests, handleApply, appliedRequests };
};