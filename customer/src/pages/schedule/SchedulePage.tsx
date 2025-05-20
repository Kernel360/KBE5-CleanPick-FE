import { Header } from "@/components/layout/Header";
import { useNavigate } from "react-router-dom";

const SchedulePage = () => {
    const navigate = useNavigate();

    return (
        <Header 
            title="Schedule" 
            showBack={true}
            showIcons={false}
            onBackClick={() => navigate(-1)}
        />
    )
}

export default SchedulePage;