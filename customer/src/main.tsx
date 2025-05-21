import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import App from './App'
import React from 'react'
import './index.css'

// 카카오맵 API 초기화
const script = document.createElement('script');
script.onload = () => {
  window.kakao.maps.load(() => {
    console.log('Kakao Maps API loaded');
  });
};
script.src = '//dapi.kakao.com/v2/maps/sdk.js?appkey=db61549ba91dbc274892b8bb84d28846&libraries=services,clusterer&autoload=false';
document.head.appendChild(script);

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
     <App />
    </BrowserRouter>
  </React.StrictMode>
)
