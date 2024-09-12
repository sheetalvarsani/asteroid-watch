import "./AsteroidProfile.scss";
import { useLocation } from "react-router-dom";
import asteroidImage from "../../../assets/images/asteroid-image.jpg";
import ProfileBar from "../ProfileBar/ProfileBar";
import Button from "../Button/button";

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
    nasa_jpl_url?: string;
};

const AsteroidProfile = () => {
    const location = useLocation();

    const asteroid = location.state?.asteroid as Asteroid;

    if (!asteroid) {
        return <p>No asteroid data available.</p>;
    }

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

    const handleMoreInfoClick = () => {
        if (asteroid.nasa_jpl_url) {
            window.open(asteroid.nasa_jpl_url, "_blank");
        }
    };

    return (
        <>
            <ProfileBar />

            <div className="profile">
                <img
                    className="profile__image"
                    src={asteroidImage}
                    alt="Asteroid"
                />
                <div className="profile__info">
                    <div className="profile__data">
                        <h3>Name: {asteroid.name}</h3>
                        <p>
                            Close Approach On:{" "}
                            {new Date(closeApproachDate).toLocaleDateString()}
                        </p>
                        <p>Size: {maxSize.toFixed(2)} km</p>
                        <p>Speed: {maxSpeed.toFixed(2)} km/s</p>
                        <p>
                            Hazardous:{" "}
                            {asteroid.is_potentially_hazardous_asteroid
                                ? "Yes"
                                : "No"}
                        </p>
                        <p>Miss Distance: {missDistance} km</p>
                    </div>
                    <Button
                        className="profile__button"
                        text="More Info"
                        onClick={handleMoreInfoClick}
                    />
                </div>
            </div>
        </>
    );
};

export default AsteroidProfile;
