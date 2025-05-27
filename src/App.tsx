import './index.css';
import { Routes, Route, Outlet } from 'react-router-dom';
import { MainPage } from './customer/pages/main';
import { SchedulePage } from './customer/pages/schedule';
import { BottomNav } from './customer/components/layout/BottomNav';
import { MyPage } from './customer/pages/my';
import { ManagerListPage } from './customer/pages/manager/list';
import { MyPageEdit } from './customer/pages/my/edit';
import { ReviewList } from './customer/pages/review/list';
import Home from './manager/pages/Home';
import FindRequest from './manager/pages/FindRequest';
import Schedule from './manager/pages/Schedule';
import ManagerMyPage from './manager/pages/ManagerMyPage';
import IncomeList from './manager/pages/IncomeList';
import ScheduleList from './manager/pages/TodayList';
import ProfileForm from './manager/pages/ProfileForm';
import Policy from './manager/pages/Policy';
import ProfileDetail from './manager/pages/ProfileDetail';
import ReviewToUser from './manager/pages/ReviewToUser';
import LoginPage from './common/pages/auth/LoginPage';
import SignupPage from './common/pages/auth/SignUpPage';
import { CustomerSignUpDetailPage } from './customer/pages/signupdetail';


const Layout = () => {
    return (
        <div>
            <Outlet />
            <BottomNav className="mt-[500px]" />
        </div>
    )
}

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
      </Route>

      <Route path="/manager">
        <Route index element={<Home />} />
        <Route path="findrequest" element={<FindRequest />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="mypage" element={<ManagerMyPage />} />
        <Route path="incomelist" element={<IncomeList />} />
        <Route path="todaylist" element={<ScheduleList />} />
        <Route path="profileform" element={<ProfileForm />} />
        <Route path="policy" element={<Policy />} />
        <Route path="profileDetail" element={<ProfileDetail />} />
        <Route path="reviewToUser" element={<ReviewToUser />} />
      </Route>

      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/customer/signup-detail" element={<CustomerSignUpDetailPage />} />
    </Routes>
  );
}

export default App;
