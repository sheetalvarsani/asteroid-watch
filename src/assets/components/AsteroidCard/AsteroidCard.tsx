import "./AsteroidCard.scss";

//----------------------------------------------------------------------

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

//----------------------------------------------------------------------

const AsteroidCard = ({ asteroid }: { asteroid: Asteroid }) => {
    // get SIZE of Asteroid to be displayed:
    const maxSize =
        asteroid.estimated_diameter?.kilometers?.estimated_diameter_max || 0;

    // get SPEED of Asteroid to be displayed
    const maxSpeed = asteroid.close_approach_data?.[0]?.relative_velocity
        ?.kilometers_per_second
        ? parseFloat(
              asteroid.close_approach_data[0].relative_velocity
                  .kilometers_per_second
          )
        : 0;

    // get MISS DISTANCE of Asteroid to be displayed:
    const missDistance = parseFloat(
        asteroid.close_approach_data[0].miss_distance.kilometers
    ).toFixed(0);

    // get CLOSE APPROACH DATE of Asteroid to be displayed:
    const closeApproachDate =
        asteroid.close_approach_data[0].close_approach_date;

    //----------------------------------------------------------------------

    return (
        <div className="asteroid-card">
            {/* <img src={asteroid.imageUrl} alt={asteroid.name} /> // try and find images to use? */}
            <h3>{asteroid.name}</h3>
            <p>
                Close Approach On:{" "}
                {new Date(closeApproachDate).toLocaleDateString()}
            </p>
            <p>Size: {maxSize.toFixed(2)} km</p>
            <p>Speed: {maxSpeed.toFixed(2)} km/s</p>
            <p>Hazardous: {asteroid.is_potentially_hazardous_asteroid ? "Yes" : "No"}</p>
            <p>Miss Distance: {missDistance} km</p>
        </div>
    );
};

export default AsteroidCard;
