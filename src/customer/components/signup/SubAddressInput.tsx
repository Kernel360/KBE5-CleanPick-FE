import { Input } from '@/common/components/ui/input';

interface SubAddressInputProps {
  subAddress: string;
  onChange: (subAddress: string) => void;
  className?: string;
}

export default function SubAddressInput({ subAddress, onChange, className = '' }: SubAddressInputProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <label htmlFor="subAddress" className="block text-sm font-medium text-gray-700">
        상세 주소
      </label>
      <Input
        id="subAddress"
        type="text"
        value={subAddress}
        onChange={(e) => onChange(e.target.value)}
        placeholder="상세 주소를 입력해주세요"
        className="w-full h-[50px]"
      />
    </div>
  );
} 