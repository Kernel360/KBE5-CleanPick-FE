/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react';
import { MapPin, X } from 'lucide-react';

interface ScheduleAddressProps {
  location: string;
  onLocationChange: (location: string, detail?: { address: string; latitude: number; longitude: number }) => void;
}

declare global {
  interface Window {
    kakao: any;
  }
}

export const ScheduleAddress = ({ location, onLocationChange }: ScheduleAddressProps) => {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<string>(location);
  const [map, setMap] = useState<any>(null);
  const [marker, setMarker] = useState<any>(null);
  const [searchInput, setSearchInput] = useState('');
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const mapRef = useRef<any>(null);

  // location prop이 변경될 때 selectedAddress 업데이트
  useEffect(() => {
    setSelectedAddress(location);
  }, [location]);

  // 스크립트 로딩
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_API_KEY}&libraries=services&autoload=false`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        setIsScriptLoaded(true);
      });
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // 지도 초기화
  useEffect(() => {
    if (isScriptLoaded && isModalOpen && !map) {
      const container = document.getElementById('map');
      if (container) {
        const options = {
          center: new window.kakao.maps.LatLng(37.566826, 126.978656),
          level: 3
        };
        
        const newMap = new window.kakao.maps.Map(container, options);
        const newMarker = new window.kakao.maps.Marker();
        
        setMap(newMap);
        setMarker(newMarker);
        mapRef.current = newMap;
      }
    }
  }, [isScriptLoaded, isModalOpen, map]);

  // 모달이 열릴 때 지도 리사이즈
  useEffect(() => {
    if (isModalOpen && map) {
      setTimeout(() => {
        map.relayout();
        if (selectedAddress) {
          const geocoder = new window.kakao.maps.services.Geocoder();
          geocoder.addressSearch(selectedAddress, (result: any[], status: any) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
              map.setCenter(coords);
              if (marker) {
                marker.setPosition(coords);
                marker.setMap(map);
              }
            }
          });
        }
      }, 100);
    }
  }, [isModalOpen, map, selectedAddress]);

  useEffect(() => {
    if (!isScriptLoaded || !map) return;

    const searchAddress = () => {
      if (!location) {
        setSearchResults([]);
        return;
      }

      const places = new window.kakao.maps.services.Places();

      places.keywordSearch(location, (result: any[], status: any) => {
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
  }, [location, isScriptLoaded, map]);

  const handleSelectAddress = (item: any) => {
    if (!isScriptLoaded || !map) return;

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

        onLocationChange(item.address_name, {
          address: item.address_name,
          latitude: Number(result[0].y),
          longitude: Number(result[0].x)
        });
        setSelectedAddress(item.address_name);
        setSearchInput(item.address_name);
        setSearchResults([]);
        setIsSearching(false);
      }
    });
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    if (marker) {
      marker.setMap(null);
    }
    setMap(null);
  };

  return (
    <div className="mb-6 relative">
      <h3 className="text-lg font-medium mb-3">위치 입력</h3>
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={selectedAddress}
          onClick={() => setIsModalOpen(true)}
          readOnly
          placeholder="주소를 입력해주세요"
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-3/4 h-3/4 relative">
            <button 
              onClick={handleModalClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 bg-white"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-xl font-bold mb-4">주소 검색</h2>
            
            <div className="mb-4 relative">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  onLocationChange(e.target.value);
                  setIsSearching(true);
                }}
                placeholder="주소를 검색해주세요"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg"
              />

              {isSearching && searchResults.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-lg shadow-lg max-h-[200px] overflow-y-auto z-10">
                  {searchResults.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleSelectAddress(item)}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-0 bg-white"
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
              className="mt-4"
              style={{ 
                width: '100%',
                height: 'calc(100% - 120px)',
                position: 'relative',
                overflow: 'hidden'
              }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}; 