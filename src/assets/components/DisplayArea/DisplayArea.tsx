import { useState, useEffect } from "react";
import AsteroidList from "../../containers/AsteroidList/AsteroidList";
import Navigation from "../Navigation/Navigation";
import fetchAsteroids from "../../../api";

const itemsPerPage = 9;

function DisplayArea() {
    const [asteroids, setAsteroids] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // date range ** change when search bar added **
    const startDate = "2024-01-01";
    const endDate = "2024-01-31";

    useEffect(() => {
        // Fetch asteroids when the component renders
        fetchAsteroids(startDate, endDate)
            .then((fetchedAsteroids) => {
                setAsteroids(fetchedAsteroids);
            })
            // If there's an error, update the error state with the error message
            .catch((error: any) => {
                setError(error.message);
            })
            // Show loading text:
            .finally(() => {
                setLoading(false);
            });
    }, []); // Empty dependency array means this runs once on component mount

    const totalItems = asteroids.length; // calculate total number of asteroids returned

    // function to handle page changes
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    // calculate when to slice asteroid array to get 9 asteroids per page:
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentAsteroids = asteroids.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    // Show loading message while data is being fetched
    if (loading) return <p>Loading...</p>;

    // Show error message if there's an error
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <AsteroidList asteroids={currentAsteroids} />
            <Navigation
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
            />
        </div>
    );
}

export default DisplayArea;
