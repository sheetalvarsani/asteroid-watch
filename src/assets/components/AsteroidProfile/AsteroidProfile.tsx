import { useLocation, useNavigate } from "react-router-dom";
 // Import ProfileBar component
import "./AsteroidProfile.scss";
import ProfileBar from "../ProfileBar/ProfileBar";

// Define the Asteroid type
type Asteroid = {
    id: string;
    name: string;
    estimated_diameter: {
        kilometers: {
            estimated_diameter_max: number;
        };
    };
    close_approach_data: {
        close_approach_date: string;
        miss_distance: {
            kilometers: string;
        };
        relative_velocity?: {
            kilometers_per_second?: string;
        };
    }[];
    is_potentially_hazardous_asteroid: boolean;
};

const AsteroidProfile = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const asteroid = location.state?.asteroid as Asteroid;
    const searchParams = location.state?.searchParams as { startDate: string; endDate: string };

    if (!asteroid) {
        return <p>No asteroid data available.</p>;
    }

    const maxSize = asteroid.estimated_diameter?.kilometers?.estimated_diameter_max || 0;
    const maxSpeed = asteroid.close_approach_data?.[0]?.relative_velocity?.kilometers_per_second
        ? parseFloat(asteroid.close_approach_data[0].relative_velocity.kilometers_per_second)
        : 0;
    const missDistance = parseFloat(asteroid.close_approach_data[0].miss_distance.kilometers).toFixed(0);
    const closeApproachDate = asteroid.close_approach_data[0].close_approach_date;

        // Handle back navigation
        const handleBackClick = () => {
            navigate("/asteroid-watch", { state: { searchParams } });
        };

    return (
        <>
           <ProfileBar onBackClick={handleBackClick} />
            
            <div className="asteroid-profile">
                <img src="/path/to/your/image.jpg" alt="Asteroid Image" className="asteroid-image" />
                <h3>{asteroid.name}</h3>
                <p>Close Approach On: {new Date(closeApproachDate).toLocaleDateString()}</p>
                <p>Size: {maxSize.toFixed(2)} km</p>
                <p>Speed: {maxSpeed.toFixed(2)} km/s</p>
                <p>Hazardous: {asteroid.is_potentially_hazardous_asteroid ? "Yes" : "No"}</p>
                <p>Miss Distance: {missDistance} km</p>
            </div>
        </>
    );
};

export default AsteroidProfile;
