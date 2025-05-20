import React from 'react';
import { ManagerCard } from './ManagerCard';

const managerList = [
  { name: '홍길동', initial: '홍', rating: 4.9, service: '가정집 청소' },
  { name: '김말수', initial: '김', rating: 4.8, service: '사무실 청소' },
  { name: '이연희', initial: '이', rating: 4.7, service: '특수 청소' },
  { name: '홍길동', initial: '홍', rating: 4.9, service: '가정집 청소' },
  { name: '김말수', initial: '김', rating: 4.8, service: '사무실 청소' },
  { name: '이연희', initial: '이', rating: 4.7, service: '특수 청소' },
];

export const ManagerSection = () => {
  return (
    <section>
      <div className="flex justify-between items-center mt-6 mx-4">
        <div className="text-base font-bold">인기 매니저</div>
        <div className="text-indigo-600 text-xs cursor-pointer hover:text-indigo-700">
          전체보기
        </div>
      </div>
      <div className="flex gap-2 mx-4 mt-2">
        {managerList.map((manager) => (
          <ManagerCard key={manager.name} {...manager} />
        ))}
      </div>
    </section>
  );
}; 