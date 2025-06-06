import { useState, useEffect } from 'react';

const initialSchedules = [
  {
    id: 1,
    category: '가정집 청소',
    title: 'Home Cleaning',
    time: '10:00 AM - 12:00 PM',
    address: '123 Main Street, Vientiane',
    customer: 'Kim',
    rating: '5.0',
    status: 'ready',
  },
  {
    id: 2,
    category: '사무실 청소',
    title: 'Office Cleaning',
    time: '1:00 PM - 2:00 PM',
    address: '456 Office Street, Vientiane',
    customer: 'Park',
    rating: '4.8',
    status: 'checked-in',
  },
  {
    id: 3,
    category: '가정집 청소',
    title: 'Home Cleaning',
    time: '3:00 PM - 4:00 PM',
    address: '789 Villa Road, Vientiane',
    customer: 'Lee',
    rating: '5.0',
    status: 'completed',
  },
];

export const useSchedule = () => {
  const [schedules, setSchedules] = useState(initialSchedules);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        setIsLoading(true);
        // TODO: Replace with actual API call
        const response = await Promise.resolve(initialSchedules);
        setSchedules(response);
      } catch (err) {
        setError(err as Error);
        console.error('Failed to fetch schedules:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchedules();
  }, []);

  const handleStatusChange = (id: number) => {
    setSchedules((prev: any) =>
      prev.map((s: any) =>
        s.id === id
          ? {
              ...s,
              status:
                s.status === 'ready'
                  ? 'checked-in'
                  : s.status === 'checked-in'
                  ? 'completed'
                  : s.status,
            }
          : s
      )
    );
    
  };

  return { schedules, handleStatusChange, isLoading, error };
}; 