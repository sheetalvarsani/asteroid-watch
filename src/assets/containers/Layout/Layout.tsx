import "./Layout.scss";
import { useState } from "react";
import TopBar from "../../components/TopBar/TopBar";
import SideBar from "../../components/SideBar/SideBar";
import DisplayArea from "../../components/DisplayArea/DisplayArea";

//----------------------------------------------------------------------
// | TOP BAR | SIDE BAR | DISPLAY AREA |
//----------------------------------------------------------------------

function Layout() {
    // State to track if search has been clicked:
    const [hasSearched, setHasSearched] = useState(false);

    // State for the selected date range:
    const [dateRange, setDateRange] = useState<{
        startDate: string;
        endDate: string;
    } | null>(null);

    // State for the filters applied to the asteroids (SIZE and SPEED):
    const [filters, setFilters] = useState<{
        size?: { min: number; max: number };
        speed?: { min: number; max: number };
    }>({});

    // State for range of asteroid SIZES (min/max)
    const [sizeRange, setSizeRange] = useState<{ min: number; max: number }>({
        min: 0,
        max: 1000,
    });

    // State for range of asteroid SPEEDS (min/max)
    const [speedRange, setSpeedRange] = useState<{ min: number; max: number }>({
        min: 0,
        max: 100,
    });

    //----------------------------------------------------------------------

    // Handle search from TOPBAR - updates date range and set search treu:

    const handleSearch = (startDate: string, endDate: string) => {
        setDateRange({ startDate, endDate });
        setHasSearched(true);
    };

    //----------------------------------------------------------------------

    // Handle changes in SIZE filter - updates filters with MIN and MAX values:

    const handleSizeChange = (minSize: number, maxSize: number) => {
        setFilters((prevFilters) => ({
            ...prevFilters, // to keep previous filters filtered
            size: { min: minSize, max: maxSize },
        }));
    };

    // Handle updates to the available SIZE range (min and max) from DISPLAYAREA
    const handleSizeRangeChange = (minSize: number, maxSize: number) => {
        setSizeRange({ min: minSize, max: maxSize });
    };

    //----------------------------------------------------------------------

    // Handle changes in SPEED filter - updates filters with MIN and MAX values:

    const handleSpeedChange = (minSpeed: number, maxSpeed: number) => {
        setFilters((prevFilters) => ({
            ...prevFilters, // to keep previous filters filtered
            speed: { min: minSpeed, max: maxSpeed },
        }));
    };

    // Handle updates to the available SPEED range (min and max) from DISPLAYAREA
    const handleSpeedRangeChange = (minSpeed: number, maxSpeed: number) => {
        setSpeedRange({ min: minSpeed, max: maxSpeed });
    };

    //----------------------------------------------------------------------

    return (
        <div className="layout">
            <TopBar onSearch={handleSearch} hasSearched={hasSearched} />

            {hasSearched && (
                <div className="layout__content">
                    <SideBar
                        minSize={sizeRange.min}
                        maxSize={sizeRange.max}
                        minSpeed={speedRange.min}
                        maxSpeed={speedRange.max}
                        onSizeChange={handleSizeChange}
                        onSpeedChange={handleSpeedChange}
                    />

                    {dateRange && (
                        <DisplayArea
                            startDate={dateRange.startDate}
                            endDate={dateRange.endDate}
                            filters={filters}
                            onSizeRangeChange={handleSizeRangeChange}
                            onSpeedRangeChange={handleSpeedRangeChange}
                        />
                    )}
                </div>
            )}
        </div>
    );
}

export default Layout;
