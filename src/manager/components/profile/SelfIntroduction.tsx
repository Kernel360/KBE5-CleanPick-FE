import React from 'react';

interface SelfIntroductionProps {
  introduction: string;
  onIntroductionChange: (introduction: string) => void;
}

export default function SelfIntroduction({ introduction, onIntroductionChange }: SelfIntroductionProps) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        자기소개(선택사항)
      </label>
      <textarea
        value={introduction}
        onChange={(e) => onIntroductionChange(e.target.value)}
        placeholder="자신을 소개하는 글을 작성해주세요"
        rows={4}
        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
      />
      <p className="text-sm text-gray-500">
        고객에게 보여질 소개글입니다. 경험이나 장점 등을 작성해주세요.
      </p>
    </div>
  );
} 