import { useState, useRef, useEffect } from 'react';
import { FaCamera } from 'react-icons/fa';
import instance from '@/common/api/axios';

interface PresignedUrlInfo {
  url: string;
  contentType: string;
}

interface ProfileImageUploadProps {
  selectedFile: File | null;
  onImageSelect: (file: File, presignedInfo: PresignedUrlInfo) => void;
}

interface PresignedUrlResponse {
  success: boolean;
  data: {
    url: string;
    filename: string;
    contentType: string;
  };
  code: string;
  message: string;
}

export default function ProfileImageUpload({ selectedFile, onImageSelect }: ProfileImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!selectedFile) {
      setPreview(null);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);
  }, [selectedFile]);

  const getPresignedUrl = async (file: File) => {
    try {
      const response = await instance.post<PresignedUrlResponse>('/images/presigned-url', {
        type: 'profiles',
        filename: file.name,
        contentType: file.type || 'image/jpeg'
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.data?.success) {
        throw new Error(response.data?.message || '프리사인드 URL을 가져오는데 실패했습니다.');
      }

      return {
        url: response.data.data.url,
        contentType: response.data.data.contentType
      };
    } catch (error) {
      console.error('프리사인드 URL 요청 실패:', error);
      throw new Error('이미지 업로드를 위한 URL을 가져오는데 실패했습니다.');
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsLoading(true);
      const presignedInfo = await getPresignedUrl(file);
      onImageSelect(file, presignedInfo);
    } catch (error) {
      console.error('이미지 처리 실패:', error);
      alert('이미지 처리에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div 
        className="relative w-32 h-32 rounded-full bg-gray-100 overflow-hidden cursor-pointer"
        onClick={() => !isLoading && fileInputRef.current?.click()}
      >
        {preview ? (
          <div className="relative w-full h-full">
            <img 
              src={preview} 
              alt="프로필 미리보기" 
              className="w-full h-full object-cover"
            />
            {isLoading && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-white text-sm">처리 중...</div>
              </div>
            )}
          </div>
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
        disabled={isLoading}
      />
      <p className="text-sm text-gray-500">
        {isLoading ? '처리 중...' : '프로필 이미지를 등록해주세요'}
      </p>
    </div>
  );
} 