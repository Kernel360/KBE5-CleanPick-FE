import './index.css';
import { Routes, Route, Outlet } from 'react-router-dom';
import MainPage from './pages/MainPage';

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
      </Route>

    </Routes>
  );
}

export default App;
