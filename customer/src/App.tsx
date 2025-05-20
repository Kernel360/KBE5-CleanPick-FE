import './index.css';
import { Routes, Route, Outlet } from 'react-router-dom';
import { MainPage } from './pages/main';
import { SchedulePage } from './pages/schedule';
import { BottomNav } from './components/layout/BottomNav';

const Layout = () => {
    return (
        <div>
            <Outlet />
            <BottomNav />
        </div>
    )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
      </Route>
    </Routes>
  );
}

export default App;
