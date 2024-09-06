import AsteroidCard from "../../components/AsteroidCard/AsteroidCard";
import fetchAsteroids from "../../../api";
import { useEffect, useState } from "react";

const AsteroidList = () => {
    const [asteroids, setAsteroids] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    const startDate = "2024-01-01";
    const endDate = "2024-01-31";

    useEffect(() => {
        // Fetch asteroids when the component renders
        fetchAsteroids(startDate, endDate)
            .then((fetchedAsteroids) => {
                console.log("Fetched asteroids:", fetchedAsteroids);
                setAsteroids(fetchedAsteroids);
            })
            .catch((error: any) => {
                setError(error.message);
            });
    }, []);

    //   if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    // render list of asteroids:
    return (
        <div>
            {asteroids.length === 0 ? (
                <p>No asteroids found.</p>
            ) : (
                asteroids.map((asteroid: any, index: number) => (
                    <AsteroidCard
                        key={`asteroid-${index}`}
                        asteroid={asteroid}
                    />
                ))
            )}
        </div>
    );
};

export default AsteroidList;
