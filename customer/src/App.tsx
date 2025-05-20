import './index.css';
import { Routes, Route, Outlet } from 'react-router-dom';
import { MainPage } from './pages/main';
import { SchedulePage } from './pages/schedule';


const Layout = () => {
    return (
        <div>
            <Outlet />
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
