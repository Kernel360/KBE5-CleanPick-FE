import "@/index.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import FindRequest from '@/pages/FindRequest';
import Schedule from '@/pages/Schedule';
import MyPage from '@/pages/MyPage';  
import IncomeList from '@/pages/IncomeList';
import ScheduleList from '@/pages/TodayList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/findrequest" element={<FindRequest />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/incomelist" element={<IncomeList />} />
        <Route path="/todaylist" element={<ScheduleList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
