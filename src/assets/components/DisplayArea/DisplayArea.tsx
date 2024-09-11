import "./DisplayArea.scss";
import { useState, useEffect } from "react";
import AsteroidList from "../../containers/AsteroidList/AsteroidList";
import Navigation from "../Navigation/Navigation";
import fetchAsteroids from "../../../api";

//----------------------------------------------------------------------
// | ASTEROID LIST | NAVIGATION |
//----------------------------------------------------------------------

const itemsPerPage = 6; // change if needed

type DisplayAreaProps = {
    startDate: string;
    endDate: string;
    filters: {
        size?: { min: number; max: number }; // SIZE
        speed?: { min: number; max: number }; // SPEED
        hazardousOnly?: boolean; // HAZARDOUS
    };
    // update SIZE range in LAYOUT:
    onSizeRangeChange: (minSize: number, maxSize: number) => void;
    // update SPEED range in LAYOUT:
    onSpeedRangeChange: (minSpeed: number, maxSpeed: number) => void;
};

//----------------------------------------------------------------------

function DisplayArea({
    startDate,
    endDate,
    filters,
    onSizeRangeChange,
    onSpeedRangeChange,
}: DisplayAreaProps) {
    // Store list of asteroids:
    const [asteroids, setAsteroids] = useState<any[]>([]);

    // Managing current page in navigation
    const [currentPage, setCurrentPage] = useState(1);

    // Loading / Error mesaages
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    //----------------------------------------------------------------------

    // Fetch asteroids from API based on date range:

    const fetchAsteroidData = (startDate: string, endDate: string) => {
        setLoading(true); // Show loading text
        fetchAsteroids(startDate, endDate)
            .then((fetchedAsteroids) => {
                setAsteroids(fetchedAsteroids);
                //----------------------------------------------
                // Calculate min and max SIZES of asteroids
                const sizes = fetchedAsteroids.map(
                    (asteroid: any) =>
                        asteroid.estimated_diameter.kilometers
                            .estimated_diameter_max
                );
                const minSize = Math.min(...sizes);
                const maxSize = Math.max(...sizes);
                onSizeRangeChange(minSize, maxSize); // Pass SIZE range to LAYOUT
                //----------------------------------------------
                // Calculate min and max SPEEDS of asteroids
                const speeds = fetchedAsteroids.map(
                    (asteroid: any) =>
                        parseFloat(
                            asteroid.close_approach_data?.[0]?.relative_velocity
                                ?.kilometers_per_second
                        ) || 0
                );
                const minSpeed = Math.min(...speeds);
                const maxSpeed = Math.max(...speeds);
                onSpeedRangeChange(minSpeed, maxSpeed); // Pass SPEED range to LAYOUT
            })
            //----------------------------------------------
            // Error / Loading
            .catch((error: any) => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    //----------------------------------------------------------------------

    // fetch asteroids when startDate / endDate changes:
    useEffect(() => {
        fetchAsteroidData(startDate, endDate);
    }, [startDate, endDate]);

    //----------------------------------------------------------------------

    // Apply filters to asteroids (SIZE/SPEED)
    const [filteredAsteroids, setFilteredAsteroids] = useState<any[]>([]);

    useEffect(() => {
        // Filter asteroids based on user's selected SIZE and SPEED range
        const { size, speed, hazardousOnly } = filters;

        const filtered = asteroids.filter((asteroid: any) => {
            // Filter asteroids based on user's selected SIZE range
            const sizeMax =
                asteroid.estimated_diameter?.kilometers
                    ?.estimated_diameter_max || 0;
            // Filter asteroids based on the selected SPEED range
            const speedValue = asteroid.close_approach_data?.[0]
                ?.relative_velocity?.kilometers_per_second
                ? parseFloat(
                      asteroid.close_approach_data[0].relative_velocity
                          .kilometers_per_second
                  )
                : 0;

            // Filter by HAZARDOUS status
            const isHazardous = asteroid.is_potentially_hazardous_asteroid;

            // Make sure asteroid is within the SIZE and SPEED filters
            return (
                (size ? size.min <= sizeMax && sizeMax <= size.max : true) &&
                (speed
                    ? speed.min <= speedValue && speedValue <= speed.max
                    : true)&&
                    (hazardousOnly ? isHazardous === true : true) 
                    // apply HAZARDOUS filter
            );
        });
        // Update the filtered asteroid list
        setFilteredAsteroids(filtered);
    }, [asteroids, filters]);

    //----------------------------------------------------------------------

    // calculate total number of asteroids returned for page navigation
    const totalItems = filteredAsteroids.length;

    // Handle page changes for page navigation (Navigation Component):
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    // calculate when to slice asteroid array to get asteroids per page:
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentAsteroids = filteredAsteroids.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    //----------------------------------------------------------------------

    return (
        <div className="display-area">
            <div className="display-area__asteroids">
                {loading ? (
                    // LOADING message while data being fetched
                    <p className="display-area__loading">Loading...</p>
                ) : error ? (
                    // ERROR message if issue
                    <p className="display-area__error">Error: {error}</p>
                ) : (
                    // Asteroid list of results after filtering
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
