import { Input } from '@/common/components/ui/input';

interface UserInfoFormProps {
  userInfo: {
    name: string;
    phoneNumber: string;
  };
  onChange: (field: string, value: string) => void;
}

export default function UserInfoForm({ userInfo, onChange }: UserInfoFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          닉네임
        </label>
        <Input
          id="name"
          type="text"
          value={userInfo.name}
          onChange={(e) => onChange('name', e.target.value)}
          placeholder="이름을 입력해주세요"
          className="w-full h-[50px]"
          required
        />
      </div>
      <div>
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
          전화번호
        </label>
        <Input
          id="phoneNumber"
          type="tel"
          value={userInfo.phoneNumber}
          onChange={(e) => onChange('phoneNumber', e.target.value)}
          placeholder="전화번호를 입력해주세요"
          className="w-full h-[50px]"
          required
        />
      </div>
    </div>
  );
} 