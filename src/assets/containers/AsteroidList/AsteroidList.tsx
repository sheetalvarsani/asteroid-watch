import './AsteroidList.scss';
import AsteroidCard from "../../components/AsteroidCard/AsteroidCard";
import fetchAsteroids from "../../../api";
import { useEffect, useState } from "react";

const AsteroidList = () => {
    const [asteroids, setAsteroids] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true); // Add loading state

    const startDate = "2024-01-01";
    const endDate = "2024-01-31";

    useEffect(() => {
        const getAsteroids = async () => {
            try {
                // Fetch asteroids when the component renders
                const fetchedAsteroids = await fetchAsteroids(startDate, endDate);
                console.log("Fetched asteroids:", fetchedAsteroids);
                setAsteroids(fetchedAsteroids);
            } catch (error: any) {
                // If there's an error, update the error state with the error message
                setError(error.message);
            } finally {
                // Update loading state
                setLoading(false);
            }
        };

        getAsteroids();
    }, []); // Empty dependency array means this runs once on component mount

    // Show loading message while data is being fetched
    if (loading) return <p>Loading...</p>;

    // Show error message if there's an error
    if (error) return <p>Error: {error}</p>;

    // Render list of asteroids
    return (
        <div className="asteroid-list">
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
