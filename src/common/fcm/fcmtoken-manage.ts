import { messaging } from "./settingFCM";
import { getToken, deleteToken } from "firebase/messaging";
import instance from "@/common/api/axios";

// 플랫폼 감지 함수
const getDeviceType = (): string => {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isAndroid = /Android/.test(navigator.userAgent);
  const isPWA = window.matchMedia('(display-mode: standalone)').matches || 
                (window.navigator as any).standalone === true;
  
  if (isIOS) return 'ios';
  if (isAndroid) return 'android';
  return 'web';
};


// Request permission and get token
export const requestPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        const token = await getToken(messaging, { 
          vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY 
        });
        if (token) {
          console.log('Registration token:', token);
          return token;
        } else {
          console.log('No registration token available.');
          return null;
        }
      } else {
        console.log('Permission denied for notifications');
        return null;
      }
    } catch (err) {
      console.log('An error occurred while retrieving token. ', err);
      return null;
    }
};

// 로그인 시: FCM 토큰 등록 및 서버에 전송
export const registerFCMToken = async () => {
  try {
    const token = await requestPermission();
    if (token) {
      const deviceType = getDeviceType();
      
      // 서버에 토큰 전송 (API 호출)
      const response = await instance.post('/device', {
        deviceToken: token,
        deviceType: getDeviceType()
      });
      
      if (response.status === 200) {
        console.log(`FCM token registered successfully as ${deviceType}`);
        return token;
      } else {
        console.error('Failed to register FCM token');
        return null;
      }
    }
    return null;
  } catch (error) {
    console.error('Error registering FCM token:', error);
    return null;
  }
};

// 로그아웃 시: FCM 토큰 만료/삭제
export const unregisterFCMToken = async () => {
  try {
    const currentToken = localStorage.getItem('fcmToken');
    
    if (currentToken) {
      // 서버에서 토큰 삭제
      await instance.post('/device/delete', {
        deviceToken: currentToken
      });
    }
    
    // Firebase에서 토큰 삭제
    await deleteToken(messaging);
    
    // 로컬 스토리지에서 토큰 제거
    localStorage.removeItem('fcmToken');
    
    console.log('FCM token unregistered successfully');
    return true;
  } catch (error) {
    console.error('Error unregistering FCM token:', error);
    return false;
  }
};

// 토큰 새로고침 (필요시)
export const refreshFCMToken = async () => {
  try {
    // 기존 토큰 삭제
    await deleteToken(messaging);
    
    // 새 토큰 등록
    return await registerFCMToken();
  } catch (error) {
    console.error('Error refreshing FCM token:', error);
    return null;
  }
};