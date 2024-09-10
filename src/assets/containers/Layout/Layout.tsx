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
    const [filters, setFilters] = useState<{
        size?: { min: number; max: number };
    }>({}); // State for filters
    const [sizeRange, setSizeRange] = useState<{ min: number; max: number }>({
        min: 0,
        max: 1000,
    }); // Default size range

    // Handle search from TopBar
    const handleSearch = (startDate: string, endDate: string) => {
        setDateRange({ startDate, endDate }); // user input
        setHasSearched(true); // user has clicked search
    };

    // Sidebar Filters:
    const handleSizeChange = (minSize: number, maxSize: number) => {
        setFilters({ size: { min: minSize, max: maxSize } });
    };

    //updating slider with results range:
    const handleSizeRangeChange = (minSize: number, maxSize: number) => {
        setSizeRange({ min: minSize, max: maxSize });
    };

    return (
        <div className="layout">
            <TopBar onSearch={handleSearch} hasSearched={hasSearched} />

            {/* Always show the sidebar after the first search, even if dateRange is null */}
            {hasSearched && (
                <div className="layout__content">
                    <SideBar
                        minSize={sizeRange.min}
                        maxSize={sizeRange.max}
                        onSizeChange={handleSizeChange}
                    />

                    {dateRange && (
                        <DisplayArea
                            startDate={dateRange.startDate}
                            endDate={dateRange.endDate}
                            filters={filters}
                            onSizeRangeChange={handleSizeRangeChange} // Pass the callback to update size range
                        />
                    )}
                </div>
            )}
        </div>
    );
}

export default Layout;
