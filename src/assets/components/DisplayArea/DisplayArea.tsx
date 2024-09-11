import "./DisplayArea.scss";
import { useState, useEffect } from "react";
import AsteroidList from "../../containers/AsteroidList/AsteroidList";
import Navigation from "../Navigation/Navigation";
import fetchAsteroids from "../../../api";
import loadingAsteroid from "../../../assets/images/loading-asteroid.png";

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
    // Sort state:
    sortBy: { field: string; order: string };
};

//----------------------------------------------------------------------

function DisplayArea({
    startDate,
    endDate,
    filters,
    onSizeRangeChange,
    onSpeedRangeChange,
    sortBy,
}: DisplayAreaProps) {
    // Store list of asteroids:
    const [filteredAsteroids, setFilteredAsteroids] = useState<any[]>([]);

    // Managing current page in navigation
    const [currentPage, setCurrentPage] = useState(1);

    // Loading / Error mesaages
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // Message for no asteroids found
    const [noAsteroidsFound, setNoAsteroidsFound] = useState(false);

    //----------------------------------------------------------------------

    // Fetch asteroids from API based on date range, filters, and sorting

    useEffect(() => {
        setLoading(true); // Show LOADING message
        setNoAsteroidsFound(false); // Reset no asteroids found message

        fetchAsteroids(startDate, endDate)
            .then((fetchedAsteroids) => {

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

                //----------------------------------------------
                // Apply filters:
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

                    //----------------------------------------------
                    // Filter based on size, speed, and hazardous status
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

                //----------------------------------------------
                // SORT filtered asteroids:

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

                setFilteredAsteroids(sorted); // update results

                //----------------------------------------------

                // Show no asteroids found message if no results
                if (sorted.length === 0) {
                    setNoAsteroidsFound(true);
                } else {
                    setNoAsteroidsFound(false);
                }
            })
            .catch((error: any) => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [startDate, endDate, filters, sortBy]);

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
                    <div className="display-area__loading-container">
                        {/* LOADING message while data being fetched */}
                        <p className="display-area__loading">Loading</p>
                        <img
                            className="display-area__asteroid-image"
                            src={loadingAsteroid}
                            alt="Spinning Asteroid"
                        />
                    </div>
                ) : error ? (
                    // ERROR message if issue
                    <p className="display-area__error">Error: {error}</p>
                ) : noAsteroidsFound ? (
                    // NO ASTEROIDS FOUND message
                    <h2 className="display-area__no-asteroids">
                        No Asteroids Found!
                    </h2>
                ) : (
                    // Asteroid list of results after filtering/sorting
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
