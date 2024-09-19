import "./Layout.scss";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import TopBar from "../../components/TopBar/TopBar";
import SideBar from "../../components/SideBar/SideBar";
import AsteroidList from "../../containers/AsteroidList/AsteroidList";
import Navigation from "../../components/Navigation/Navigation";
import fetchAsteroids from "../../../api";
import loadingAsteroid from "../../../assets/images/loading-asteroid.png";

const itemsPerPage = 9;

const Layout = () => {
    const location = useLocation();

    const [hasSearched, setHasSearched] = useState(false);
    const [dateRange, setDateRange] = useState<{
        startDate: string;
        endDate: string;
    } | null>(null);
    const [sortBy, setSortBy] = useState<{ field: string; order: string }>({
        field: "missDistance",
        order: "asc",
    });
    const [filteredAsteroids, setFilteredAsteroids] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [noAsteroidsFound, setNoAsteroidsFound] = useState(false);

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
            ...prevFilters,
            speed: { min: minSpeed, max: maxSpeed },
        }));
    };

    const handleSpeedRangeChange = (minSpeed: number, maxSpeed: number) => {
        setSpeedRange({ min: minSpeed, max: maxSpeed });
    };

    const handleHazardousChange = (hazardousOnly: boolean) => {
        setFilters((prevFilters) => ({ ...prevFilters, hazardousOnly }));
    };

    const handleSortChange = (field: string, order: string) => {
        setSortBy({ field, order });
    };

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

    useEffect(() => {
        if (!dateRange) return;
        const { startDate, endDate } = dateRange;

        setLoading(true);
        setNoAsteroidsFound(false);
        setError(null);

        fetchAsteroids(startDate, endDate)
            .then((fetchedAsteroids) => {
                const sizes = fetchedAsteroids.map(
                    (asteroid: any) =>
                        asteroid.estimated_diameter.kilometers
                            .estimated_diameter_max
                );
                const minSize = Math.min(...sizes);
                const maxSize = Math.max(...sizes);
                handleSizeRangeChange(minSize, maxSize);

                const speeds = fetchedAsteroids.map(
                    (asteroid: any) =>
                        parseFloat(
                            asteroid.close_approach_data?.[0]?.relative_velocity
                                ?.kilometers_per_second
                        ) || 0
                );
                const minSpeed = Math.min(...speeds);
                const maxSpeed = Math.max(...speeds);
                handleSpeedRangeChange(minSpeed, maxSpeed);

                const filtered = fetchedAsteroids.filter((asteroid: any) => {
                    const sizeMax =
                        asteroid.estimated_diameter?.kilometers
                            ?.estimated_diameter_max || 0;
                    const speedValue = asteroid.close_approach_data?.[0]
                        ?.relative_velocity?.kilometers_per_second
                        ? parseFloat(
                              asteroid.close_approach_data[0].relative_velocity
                                  .kilometers_per_second
                          )
                        : 0;

                    const isHazardous =
                        asteroid.is_potentially_hazardous_asteroid;

                    return (
                        (filters.size
                            ? filters.size.min <= sizeMax &&
                              sizeMax <= filters.size.max
                            : true) &&
                        (filters.speed
                            ? filters.speed.min <= speedValue &&
                              speedValue <= filters.speed.max
                            : true) &&
                        (filters.hazardousOnly ? isHazardous === true : true)
                    );
                });

                const sorted = filtered.sort((a, b) => {
                    let compareValue = 0;
                    if (sortBy.field === "missDistance") {
                        compareValue =
                            parseFloat(
                                a.close_approach_data?.[0]?.miss_distance
                                    ?.kilometers || "0"
                            ) -
                            parseFloat(
                                b.close_approach_data?.[0]?.miss_distance
                                    ?.kilometers || "0"
                            );
                    } else if (sortBy.field === "size") {
                        compareValue =
                            (a.estimated_diameter?.kilometers
                                ?.estimated_diameter_max || 0) -
                            (b.estimated_diameter?.kilometers
                                ?.estimated_diameter_max || 0);
                    } else if (sortBy.field === "speed") {
                        compareValue =
                            parseFloat(
                                a.close_approach_data?.[0]?.relative_velocity
                                    ?.kilometers_per_second || "0"
                            ) -
                            parseFloat(
                                b.close_approach_data?.[0]?.relative_velocity
                                    ?.kilometers_per_second || "0"
                            );
                    }

                    return sortBy.order === "asc"
                        ? compareValue
                        : -compareValue;
                });

                setFilteredAsteroids(sorted);
                if (sorted.length === 0) {
                    setNoAsteroidsFound(true);
                }
            })
            .catch((error: any) => setError(error.message))
            .finally(() => setLoading(false));
    }, [dateRange, filters, sortBy]);

    const handleSearch = (startDate: string, endDate: string) => {
        setDateRange({ startDate, endDate });
        setHasSearched(true);
    };

    const totalItems = filteredAsteroids.length;

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentAsteroids = filteredAsteroids.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    const [sidebarVisible, setSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        setSidebarVisible((prev) => !prev);
    };

    return (
        <div className="layout">
            <TopBar onSearch={handleSearch} hasSearched={hasSearched} />

            {hasSearched && (
                <div className="layout__content">
                    <div
                        className={`layout__side-bar ${
                            sidebarVisible ? "visible" : "hidden"
                        }`}
                    >
                        <SideBar
                            minSize={sizeRange.min}
                            maxSize={sizeRange.max}
                            minSpeed={speedRange.min}
                            maxSpeed={speedRange.max}
                            onSizeChange={handleSizeChange}
                            onSpeedChange={handleSpeedChange}
                            onHazardousChange={handleHazardousChange}
                            onSortChange={handleSortChange}
                            visible={sidebarVisible}
                        />
                    </div>

                    <div className="layout__display-area">
                        <button
                            className="layout__toggle-button"
                            onClick={toggleSidebar}
                            aria-label="Toggle Sidebar"
                        >
                            {sidebarVisible ? (
                                <span className="layout__toggle-cross">
                                    <div className="layout__toggle-cross-bar"></div>
                                    <div className="layout__toggle-cross-bar"></div>
                                </span>
                            ) : (
                                <span className="layout__toggle-menu">
                                    <div className="layout__toggle-menu-bar"></div>
                                    <div className="layout__toggle-menu-bar"></div>
                                    <div className="layout__toggle-menu-bar"></div>
                                </span>
                            )}
                        </button>

                        <div className="layout__asteroids">
                            {loading ? (
                                <div className="layout__loading-container">
                                    <p className="layout__loading">Loading</p>
                                    <img
                                        className="layout__asteroid-image"
                                        src={loadingAsteroid}
                                        alt="Spinning Asteroid"
                                    />
                                </div>
                            ) : error ? (
                                <p className="layout__error">Error: {error}</p>
                            ) : noAsteroidsFound ? (
                                <h2 className="layout__no-asteroids">
                                    No Asteroids Found!
                                </h2>
                            ) : (
                                <AsteroidList asteroids={currentAsteroids} />
                            )}
                        </div>

                        <div className="layout__nav">
                            <Navigation
                                totalItems={totalItems}
                                itemsPerPage={itemsPerPage}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Layout;
