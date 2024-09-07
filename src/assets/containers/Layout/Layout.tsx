import './Layout.scss';
import { useState } from 'react';
import TopBar from "../../components/TopBar/TopBar";
import SideBar from "../../components/SideBar/SideBar";
import DisplayArea from "../../components/DisplayArea/DisplayArea";

function Layout() {

    // for displaying asteroids initially:
    const [startDate, setStartDate] = useState("2024-01-01"); // default start date
    const [endDate, setEndDate] = useState("2024-01-31"); // default end date

        // Handle search from TopBar
        const handleSearch = (newStartDate: string, newEndDate: string) => {
            setStartDate(newStartDate);
            setEndDate(newEndDate);
        };

    return (
        <div className="layout">
            <TopBar onSearch={handleSearch} />
            <div className="layout__content">
                <SideBar />
                <DisplayArea startDate={startDate} endDate={endDate} />
            </div>
        </div>
    );
}

export default Layout;
