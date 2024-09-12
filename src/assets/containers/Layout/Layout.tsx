import "./Layout.scss";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import TopBar from "../../components/TopBar/TopBar";
import SideBar from "../../components/SideBar/SideBar";
import DisplayArea from "../../components/DisplayArea/DisplayArea";

function Layout() {
    const location = useLocation();

    const [hasSearched, setHasSearched] = useState(false);

    const [dateRange, setDateRange] = useState<{
        startDate: string;
        endDate: string;
    } | null>(null);

    const [filters, setFilters] = useState<{
        size?: { min: number; max: number };
        speed?: { min: number; max: number };
        hazardousOnly?: boolean;
    }>({});

    const [sizeRange, setSizeRange] = useState<{ min: number; max: number }>({
        min: 0,
        max: 1000,
    });

    const [speedRange, setSpeedRange] = useState<{ min: number; max: number }>({
        min: 0,
        max: 100,
    });

    const [sortBy, setSortBy] = useState<{ field: string; order: string }>({
        field: "missDistance",
        order: "asc",
    });

    useEffect(() => {
        const state = location.state as any;
        if (state) {
            setDateRange({
                startDate: state.startDate,
                endDate: state.endDate,
            });

            setHasSearched(state.hasSearched || false);
        }
    }, [location.state]);

    const handleSearch = (startDate: string, endDate: string) => {
        setDateRange({ startDate, endDate });
        setHasSearched(true);
    };

    const handleSizeChange = (minSize: number, maxSize: number) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            size: { min: minSize, max: maxSize },
        }));
    };

    const handleSizeRangeChange = (minSize: number, maxSize: number) => {
        setSizeRange({ min: minSize, max: maxSize });
    };

    const handleSpeedChange = (minSpeed: number, maxSpeed: number) => {
        setFilters((prevFilters) => ({
            ...prevFilters, // to keep previous filters filtered
            speed: { min: minSpeed, max: maxSpeed },
        }));
    };

    const handleSpeedRangeChange = (minSpeed: number, maxSpeed: number) => {
        setSpeedRange({ min: minSpeed, max: maxSpeed });
    };

    const handleHazardousChange = (hazardousOnly: boolean) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            hazardousOnly,
        }));
    };

    const handleSortChange = (field: string, order: string) => {
        setSortBy({ field, order });
    };

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
                        onHazardousChange={handleHazardousChange}
                        onSortChange={handleSortChange}
                    />

                    {dateRange && (
                        <DisplayArea
                            startDate={dateRange.startDate}
                            endDate={dateRange.endDate}
                            filters={filters}
                            onSizeRangeChange={handleSizeRangeChange}
                            onSpeedRangeChange={handleSpeedRangeChange}
                            sortBy={sortBy}
                        />
                    )}
                </div>
            )}
        </div>
    );
}

export default Layout;
