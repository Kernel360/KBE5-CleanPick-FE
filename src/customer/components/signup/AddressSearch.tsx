import { useState, useEffect } from 'react';
import { Input } from '@/common/components/ui/input';
import { MapPin, X } from 'lucide-react';

declare global {
  interface Window {
    kakao: any;
  }
}

interface AddressSearchProps {
  onAddressSelect: (address: string) => void;
}

export default function AddressSearch({ onAddressSelect }: AddressSearchProps) {
  const [address, setAddress] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [map, setMap] = useState<any>(null);
  const [marker, setMarker] = useState<any>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_API_KEY}&libraries=services&autoload=false`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        setIsMapLoaded(true);
      });
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // 지도 초기화
  useEffect(() => {
    if (isModalOpen && isMapLoaded) {
      const mapContainer = document.getElementById('map');
      const mapOption = {
        center: new window.kakao.maps.LatLng(37.566826, 126.978656), // 서울시청
        level: 3
      };
      const newMap = new window.kakao.maps.Map(mapContainer, mapOption);
      const newMarker = new window.kakao.maps.Marker();
      setMap(newMap);
      setMarker(newMarker);
    }
  }, [isModalOpen, isMapLoaded]);

  useEffect(() => {
    if (!searchInput || !isMapLoaded) return;

    const places = new window.kakao.maps.services.Places();
    const searchAddress = () => {
      places.keywordSearch(searchInput, (result: any[], status: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const addressResults = result.filter(item => 
            item.address_name && (item.category_group_code === '' || item.category_group_code === 'BK9')
          );
          setSearchResults(addressResults);
        }
      });
    };

    const debounceTimer = setTimeout(searchAddress, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchInput, isMapLoaded]);

  const handleSelectAddress = (item: any) => {
    if (!isMapLoaded) return;

    const geocoder = new window.kakao.maps.services.Geocoder();
    
    geocoder.addressSearch(item.address_name, (result: any[], status: any) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
        
        if (map && marker) {
          marker.setMap(null);
          marker.setPosition(coords);
          marker.setMap(map);
          map.setCenter(coords);
        }

        setAddress(item.address_name);
        onAddressSelect(item.address_name);
        setSearchInput(item.address_name);
        setSearchResults([]);
        setIsSearching(false);
        setIsModalOpen(false);
      }
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
          주소
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            id="address"
            type="text"
            value={address}
            onClick={() => setIsModalOpen(true)}
            readOnly
            placeholder="주소를 입력해주세요"
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-50 h-[50px]"
            required
          />
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-3/4 h-3/4 relative">
            <button 
              onClick={() => setIsModalOpen(false)} 
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 bg-white"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-xl font-bold mb-4">주소 검색</h2>
            
            <div className="mb-4 relative">
              <Input
                type="text"
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  setIsSearching(true);
                }}
                placeholder="주소를 검색해주세요"
                className="w-full px-4 py-2 rounded-lg"
              />

              {isSearching && searchResults.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-lg shadow-lg max-h-[200px] overflow-y-auto z-10">
                  {searchResults.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleSelectAddress(item)}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-0"
                    >
                      <p className="font-medium text-gray-900">{item.place_name || item.address_name}</p>
                      <p className="text-sm text-gray-500">{item.address_name}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div 
              id="map" 
              className="w-full h-[calc(100%-120px)] relative overflow-hidden rounded-lg"
            ></div>
          </div>
        </div>
      )}
    </div>
  );
} 