import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom"
import { BottomNav } from "./BottomNav"
import { useEffect } from "react";
import useAuthStore from "@/stores/useAuthStore"

export const Layout = () => {

    const { user, userType } = useAuthStore();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (userType === 'customer' && user?.userStatus === 'PENDING' && location.pathname !== '/mypage/edit') {
            navigate('/mypage/edit');
        }
    }, [user, userType]);

    // customer이고 status가 PENDING이면 MyPageEdit으로 리다이렉트
  

    return (
        <div>
            <Outlet />
            <BottomNav className="mt-[500px]" />
        </div>
    )
}