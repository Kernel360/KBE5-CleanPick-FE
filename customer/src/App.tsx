import './index.css';
import { Routes, Route, Outlet } from 'react-router-dom';
import { MainPage } from './pages/main';
import { SchedulePage } from './pages/schedule';
import { BottomNav } from './components/layout/BottomNav';
import { MyPage } from './pages/my';
import { ManagerListPage } from './pages/manager/list';
import { MyPageEdit } from './pages/my/edit';
import { ReviewList } from './pages/review/list';

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
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/managers" element={<ManagerListPage />} />
        <Route path="/mypage/edit" element={<MyPageEdit />} />
        <Route path="/review" element={<ReviewList />} />
      </Route>
    </Routes>
  );
}

export default App;
