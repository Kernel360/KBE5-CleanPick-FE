import React from 'react';
import { FaBell, FaUserCircle, FaHome, FaCalendarAlt, FaUserFriends, FaRegUser } from 'react-icons/fa';

const serviceList = [
  { icon: '🏠', label: '가정집 청소' },
  { icon: '🏢', label: '사무실 청소' },
  { icon: '📅', label: '특수 청소' },
];

const managerList = [
  { name: '홍길동', initial: '홍', rating: 4.9, service: '가정집 청소' },
  { name: '김말수', initial: '김', rating: 4.8, service: '사무실 청소' },
  { name: '이연희', initial: '이', rating: 4.7, service: '특수 청소' },
];

const review = {
  user: '김세리',
  date: '2023년 5월 20일',
  content: '매니저님이 꼼꼼하게 청소해주셔서 집이 정말 깨끗해졌어요! 다음에도 또 이용할게요.',
  rating: 5,
};

export default function MainPage() {
  return (
    <div className="max-w-[400px] mx-auto bg-white min-h-screen relative pb-20">
      {/* 상단바 */}
      <div className="flex justify-between items-center pt-5 px-4">
        <div className="font-bold text-lg">클린매치</div>
        <div className="flex items-center">
          <FaBell size={20} />
          <FaUserCircle size={24} className="ml-3" />
        </div>
      </div>

      {/* 메인 배너 */}
      <div className="bg-indigo-600 text-white rounded-xl mx-4 mt-4 p-6 flex flex-col items-start">
        <div className="text-lg font-bold mb-2">깨끗한 공간을 위한 최고의 선택</div>
        <div className="text-sm mb-4">전문 청소 매니저와 함께 깨끗한 공간을 만들어보세요.</div>
        <button className="bg-white text-indigo-600 rounded-md px-5 py-2 font-bold text-sm">시작하기 +</button>
      </div>

      {/* 서비스 선택 */}
      <div className="text-base font-bold mt-6 mb-2 ml-5">서비스 선택</div>
      <div className="flex gap-3 mx-4">
        {serviceList.map((s) => (
          <div key={s.label} className="flex-1 bg-gray-100 rounded-lg flex flex-col items-center py-4">
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className="text-xs">{s.label}</div>
          </div>
        ))}
      </div>

      {/* 인기 매니저 */}
      <div className="flex justify-between items-center mt-6 mx-4">
        <div className="text-base font-bold">인기 매니저</div>
        <div className="text-indigo-600 text-xs cursor-pointer">전체보기</div>
      </div>
      <div className="flex gap-2 mx-4 mt-2">
        {managerList.map((m) => (
          <div key={m.name} className="flex-1 bg-gray-100 rounded-lg flex flex-col items-center py-3">
            <div className="w-9 h-9 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-base font-bold mb-1">{m.initial}</div>
            <div className="text-sm font-bold">{m.name}</div>
            <div className="text-yellow-500 text-xs my-0.5">★ {m.rating}</div>
            <div className="text-[11px] text-gray-500">{m.service}</div>
          </div>
        ))}
      </div>

      {/* 최근 리뷰 */}
      <div className="mx-4 mt-7">
        <div className="text-base font-bold mb-2">최근 리뷰</div>
        <div className="bg-gray-100 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <div className="text-xs font-bold">{review.user}</div>
            <div className="text-yellow-500 text-xs">★ {review.rating}</div>
          </div>
          <div className="text-xs my-2 leading-snug">{review.content}</div>
          <div className="text-[11px] text-gray-500">{review.date}</div>
        </div>
      </div>

      {/* 하단 네비게이션 */}
      <div className="fixed left-0 right-0 bottom-0 max-w-[400px] mx-auto bg-white border-t border-gray-200 flex justify-around items-center h-14 z-10">
        <div className="flex flex-col items-center text-gray-500 text-xs">
          <FaHome size={20} />
          <div className="mt-0.5">홈</div>
        </div>
        <div className="flex flex-col items-center text-gray-500 text-xs">
          <FaCalendarAlt size={20} />
          <div className="mt-0.5">예약</div>
        </div>
        <div className="flex flex-col items-center text-gray-500 text-xs">
          <FaUserFriends size={20} />
          <div className="mt-0.5">매니저</div>
        </div>
        <div className="flex flex-col items-center text-gray-500 text-xs">
          <FaRegUser size={20} />
          <div className="mt-0.5">내정보</div>
        </div>
      </div>
    </div>
  );
} 