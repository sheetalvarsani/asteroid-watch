import "./AsteroidCard.scss";
import { useNavigate } from "react-router-dom";

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

const AsteroidCard = ({ asteroid }: { asteroid: Asteroid }) => {
    const navigate = useNavigate();
    const maxSize =
        asteroid.estimated_diameter?.kilometers?.estimated_diameter_max || 0;

    const maxSpeed = asteroid.close_approach_data?.[0]?.relative_velocity
        ?.kilometers_per_second
        ? parseFloat(
              asteroid.close_approach_data[0].relative_velocity
                  .kilometers_per_second
          )
        : 0;

    const missDistance = parseFloat(
        asteroid.close_approach_data[0].miss_distance.kilometers
    ).toFixed(0);

    const closeApproachDate =
        asteroid.close_approach_data[0].close_approach_date;

    const handleCardClick = () => {
        navigate(`/asteroid-watch/${asteroid.id}`, { state: { asteroid } });
    };

    return (
        <div className="asteroid-card" onClick={handleCardClick}>
            <h3>{asteroid.name}</h3>
            <p>
                Close Approach On:{" "}
                {new Date(closeApproachDate).toLocaleDateString()}
            </p>
            <p>Size: {maxSize.toFixed(2)} km</p>
            <p>Speed: {maxSpeed.toFixed(2)} km/s</p>
            <p>
                Hazardous:{" "}
                {asteroid.is_potentially_hazardous_asteroid ? "Yes" : "No"}
            </p>
            <p>Miss Distance: {missDistance} km</p>
        </div>
    );
};

export default AsteroidCard;
