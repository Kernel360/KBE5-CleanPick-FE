import { useEffect, useState } from 'react';
// import axios from 'axios';

export interface IncomeItem {
  id: number;
  date: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  amount: number;
  reservationId: number;
}

// 더미 데이터
const dummyData: IncomeItem[] = [
  {
    id: 1,
    date: '2024-04-14',
    dayOfWeek: '월',
    startTime: '08:00',
    endTime: '12:00',
    amount: 170000,
    reservationId: 101,
  },
  {
    id: 2,
    date: '2024-04-14',
    dayOfWeek: '월',
    startTime: '14:00',
    endTime: '17:00',
    amount: 230000,
    reservationId: 102,
  },
  {
    id: 3,
    date: '2024-04-14',
    dayOfWeek: '월',
    startTime: '08:00',
    endTime: '12:00',
    amount: 70000,
    reservationId: 103,
  },
];

interface IncomeListResponse {
  items: IncomeItem[];
  totalIncome: number;
}

export function useIncomeList(page: number) {
  const [data, setData] = useState<IncomeItem[]>([]);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    // 실제 API 호출 코드 (나중에 사용)
    /*
    let isMounted = true;
    axios.get<IncomeListResponse>(`/api/manager/income?page=${page}&size=20`)
      .then(res => {
        if (!isMounted) return;
        if (page === 0) {
          setData(res.data.items);
        } else {
          setData(prev => [...prev, ...res.data.items]);
        }
        setTotal(res.data.totalIncome);
        setHasMore(res.data.items.length === 20);
      })
      .catch(() => {
        if (isMounted) setError('수입 내역을 불러오지 못했습니다.');
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => { isMounted = false; };
    */
    // 더미 데이터 사용
    setTimeout(() => {
      if (page === 0) {
        setData(dummyData);
        setTotal(dummyData.reduce((acc, cur) => acc + cur.amount, 0));
      } else {
        setData(prev => [...prev, ...dummyData]);
        setTotal(prev => prev + dummyData.reduce((acc, cur) => acc + cur.amount, 0));
      }
      setHasMore(false);
      setLoading(false);
    }, 500);
  }, [page]);

  return { data, total, hasMore, loading, error };
} 