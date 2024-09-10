import "./Layout.scss";
import { useState } from "react";
import TopBar from "../../components/TopBar/TopBar";
import SideBar from "../../components/SideBar/SideBar";
import DisplayArea from "../../components/DisplayArea/DisplayArea";

function Layout() {
    const [hasSearched, setHasSearched] = useState(false);
    const [dateRange, setDateRange] = useState<{
        startDate: string;
        endDate: string;
    } | null>(null);
    const [filters, setFilters] = useState<{ size?: { min: number; max: number } }>({}); // State for filters

    // Handle search from TopBar
    const handleSearch = (startDate: string, endDate: string) => {
        setDateRange({ startDate, endDate }); // user input
        setHasSearched(true); // user has clicked search
    };

    // Sidebar Filters:
    const handleSizeChange = (minSize: number, maxSize: number) => {
        setFilters({ size: { min: minSize, max: maxSize } });
    };

    return (
        <div className="layout">
            <TopBar onSearch={handleSearch} hasSearched={hasSearched} />

            {/* Always show the sidebar after the first search, even if dateRange is null */}
            {hasSearched && (
                <div className="layout__content">
                    <SideBar minSize={0} maxSize={1000} onSizeChange={handleSizeChange} />

                    {/* DisplayArea only appears if there's a valid date range */}
                    {dateRange && (
                        <DisplayArea
                            startDate={dateRange.startDate}
                            endDate={dateRange.endDate}
                            filters={filters}
                        />
                    )}
                </div>
            )}
        </div>
    );
}

export default Layout;
