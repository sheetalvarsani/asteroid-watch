import "./DisplayArea.scss";
import { useState, useEffect } from "react";
import AsteroidList from "../../containers/AsteroidList/AsteroidList";
import Navigation from "../Navigation/Navigation";
import fetchAsteroids from "../../../api";

const itemsPerPage = 6;

type DisplayAreaProps = {
    startDate: string;
    endDate: string;
    filters: {
        size?: { min: number; max: number };
        speed?: { min: number; max: number };
    };
    onSizeRangeChange: (minSize: number, maxSize: number) => void; // min/max SIZE
    onSpeedRangeChange: (minSpeed: number, maxSpeed: number) => void; // min/max SPEED
};

function DisplayArea({
    startDate,
    endDate,
    filters,
    onSizeRangeChange,
    onSpeedRangeChange,
}: DisplayAreaProps) {
    const [asteroids, setAsteroids] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // Fetch asteroids when the component renders
    const fetchAsteroidData = (startDate: string, endDate: string) => {
        setLoading(true); // Show loading text
        fetchAsteroids(startDate, endDate)
            .then((fetchedAsteroids) => {
                setAsteroids(fetchedAsteroids);

                // Calculate min and max SIZES
                const sizes = fetchedAsteroids.map(
                    (asteroid: any) =>
                        asteroid.estimated_diameter.kilometers
                            .estimated_diameter_max
                );
                const minSize = Math.min(...sizes);
                const maxSize = Math.max(...sizes);
                onSizeRangeChange(minSize, maxSize); // Update with size range

                // Calculate min and max SPEEDS
                const speeds = fetchedAsteroids.map(
                    (asteroid: any) =>
                        parseFloat(
                            asteroid.close_approach_data?.[0]?.relative_velocity
                                ?.kilometers_per_second
                        ) || 0
                );

                const minSpeed = Math.min(...speeds);
                const maxSpeed = Math.max(...speeds);

                // Pass calculated speeds to Layout via the handler
                onSpeedRangeChange(minSpeed, maxSpeed); // Update with speed range
            })
            // If there's an error, update the error state with the error message
            .catch((error: any) => {
                setError(error.message);
            })
            // Show results
            .finally(() => {
                setLoading(false);
            });
    };

    // fetch asteroids when startDate / endDate changes:
    useEffect(() => {
        fetchAsteroidData(startDate, endDate);
    }, [startDate, endDate]);

    // Apply filters to asteroids
    const [filteredAsteroids, setFilteredAsteroids] = useState<any[]>([]);

    useEffect(() => {
        // Filter asteroids based on the selected SIZE and SPEED range
        const { size, speed } = filters;
        const filtered = asteroids.filter((asteroid: any) => {
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
            return (
                (size ? size.min <= sizeMax && sizeMax <= size.max : true) &&
                (speed
                    ? speed.min <= speedValue && speedValue <= speed.max
                    : true)
            );
        });
        setFilteredAsteroids(filtered);
    }, [asteroids, filters]);

    const totalItems = filteredAsteroids.length; // calculate total number of asteroids returned

    // function to handle page changes
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    // calculate when to slice asteroid array to get 9 asteroids per page:
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentAsteroids = filteredAsteroids.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    return (
        <div className="display-area">
            <div className="display-area__asteroids">
                {loading ? (
                    <p className="display-area__loading">Loading...</p>
                ) : error ? (
                    <p className="display-area__error">Error: {error}</p>
                ) : (
                    <AsteroidList asteroids={currentAsteroids} />
                )}
            </div>

            <div className="display-area__nav">
                <Navigation
                    totalItems={totalItems}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
}

export default DisplayArea;
