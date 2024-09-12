import "./DisplayArea.scss";
import { useState, useEffect } from "react";
import AsteroidList from "../../containers/AsteroidList/AsteroidList";
import Navigation from "../Navigation/Navigation";
import fetchAsteroids from "../../../api";
import loadingAsteroid from "../../../assets/images/loading-asteroid.png";

const itemsPerPage = 6;

type DisplayAreaProps = {
    startDate: string;
    endDate: string;
    filters: {
        size?: { min: number; max: number };
        speed?: { min: number; max: number };
        hazardousOnly?: boolean;
    };

    onSizeRangeChange: (minSize: number, maxSize: number) => void;

    onSpeedRangeChange: (minSpeed: number, maxSpeed: number) => void;

    sortBy: { field: string; order: string };
};

function DisplayArea({
    startDate,
    endDate,
    filters,
    onSizeRangeChange,
    onSpeedRangeChange,
    sortBy,
}: DisplayAreaProps) {
    const [filteredAsteroids, setFilteredAsteroids] = useState<any[]>([]);

    const [currentPage, setCurrentPage] = useState(1);

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const [noAsteroidsFound, setNoAsteroidsFound] = useState(false);

    useEffect(() => {
        setLoading(true);
        setNoAsteroidsFound(false);

        fetchAsteroids(startDate, endDate)
            .then((fetchedAsteroids) => {
                const sizes = fetchedAsteroids.map(
                    (asteroid: any) =>
                        asteroid.estimated_diameter.kilometers
                            .estimated_diameter_max
                );
                const minSize = Math.min(...sizes);
                const maxSize = Math.max(...sizes);

                onSizeRangeChange(minSize, maxSize);

                const speeds = fetchedAsteroids.map(
                    (asteroid: any) =>
                        parseFloat(
                            asteroid.close_approach_data?.[0]?.relative_velocity
                                ?.kilometers_per_second
                        ) || 0
                );
                const minSpeed = Math.min(...speeds);
                const maxSpeed = Math.max(...speeds);

                onSpeedRangeChange(minSpeed, maxSpeed);

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

    const totalItems = filteredAsteroids.length;

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentAsteroids = filteredAsteroids.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    return (
        <div className="display-area">
            <div className="display-area__asteroids">
                {loading ? (
                    <div className="display-area__loading-container">
                       
                        <p className="display-area__loading">Loading</p>
                        <img
                            className="display-area__asteroid-image"
                            src={loadingAsteroid}
                            alt="Spinning Asteroid"
                        />
                    </div>
                ) : error ? (
                    <p className="display-area__error">Error: {error}</p>
                ) : noAsteroidsFound ? (
                    <h2 className="display-area__no-asteroids">
                        No Asteroids Found!
                    </h2>
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
