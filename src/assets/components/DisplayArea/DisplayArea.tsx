import './DisplayArea.scss';
import { useState, useEffect } from "react";
import AsteroidList from "../../containers/AsteroidList/AsteroidList";
import Navigation from "../Navigation/Navigation";
import fetchAsteroids from "../../../api";

const itemsPerPage = 9;

type DisplayAreaProps = {
    startDate: string;
    endDate: string;
};

function DisplayArea({ startDate, endDate }: DisplayAreaProps) {
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
              })
            // If there's an error, update the error state with the error message
            .catch((error: any) => {
                setError(error.message);
            })
            // Show loading text:
            .finally(() => {
                setLoading(false);
            });
    }
    
// fetch asteroids when startDate / endDate changes:
useEffect(() => {
    fetchAsteroidData(startDate, endDate);
}, [startDate, endDate]); 

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
        <div className="display-area">
               
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
