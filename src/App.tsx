import './index.css';
import { CustomerSignUpDetailPage } from './customer/pages/signupdetail';
import { Layout } from './customer/components/layout/Layout';
import { Routes, Route, Outlet } from 'react-router-dom';
import { MainPage } from './customer/pages/main';
import { SchedulePage } from './customer/pages/schedule';
import { BottomNav } from './customer/components/layout/BottomNav';
import { MyPage } from './customer/pages/my';
import { ManagerListPage } from './customer/pages/manager/list';
import { MyPageEdit } from './customer/pages/my/edit';
import { ReviewList } from './customer/pages/review/list';
import LoginPage from './common/pages/auth/LoginPage';
import SignupPage from './common/pages/auth/SignUpPage';
// FCM 초기화
import '@/common/fcm/settingFCM';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="schedule" element={<SchedulePage />} />
        <Route path="mypage" element={<MyPage />} />
        <Route path="managers" element={<ManagerListPage />} />
        <Route path="mypage/edit" element={<MyPageEdit />} />
        <Route path="review" element={<ReviewList />} />
        <Route path="signupdetail" element={<CustomerSignUpDetailPage />} />
        <Route path="/signup-detail" element={<CustomerSignUpDetailPage />} />
      </Route>

      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
}

export default App;
