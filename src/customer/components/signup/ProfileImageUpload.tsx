import { useState, useRef } from 'react';
import { FaCamera } from 'react-icons/fa';

interface ProfileImageUploadProps {
  onImageSelect: (file: File) => void;
}

export default function ProfileImageUpload({ onImageSelect }: ProfileImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageSelect(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div 
        className="relative w-32 h-32 rounded-full bg-gray-100 overflow-hidden cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
      >
        {preview ? (
          <img 
            src={preview} 
            alt="프로필 미리보기" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FaCamera className="text-gray-400 text-3xl" />
          </div>
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
      <p className="text-sm text-gray-500">
        프로필 이미지를 등록해주세요
      </p>
    </div>
  );
} 