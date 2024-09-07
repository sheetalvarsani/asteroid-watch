import './AsteroidCard.scss';

type Asteroid = {
    id: string;
    name: string;
    estimated_diameter: {
      kilometers: {
        estimated_diameter_max: number;
      };
    };
    close_approach_data: {
      miss_distance: {
        kilometers: string;
      };
      relative_velocity?: {
        kilometers_per_second?: string;
      };
    }[];
    hazardous: boolean;
  };
  
  
  
  const AsteroidCard = ({ asteroid }: { asteroid: Asteroid }) => {

    const maxSize = asteroid.estimated_diameter?.kilometers?.estimated_diameter_max || 0; // get size of Asteroid to be displayed

    const maxSpeed = asteroid.close_approach_data?.[0]?.relative_velocity?.kilometers_per_second
    ? parseFloat(asteroid.close_approach_data[0].relative_velocity.kilometers_per_second): 0; // get speed of Asteroid to be displayed

    const missDistance = parseFloat(asteroid.close_approach_data[0].miss_distance.kilometers).toFixed(0); // get miss distance of Asteroid to be displayed

    return (
      <div className="asteroid-card">
        {/* <img src={asteroid.imageUrl} alt={asteroid.name} /> // try and find images to use? */}
        <h3>{asteroid.name}</h3>
        <p>Size: {maxSize.toFixed(2)} km</p>
        <p>Speed: {maxSpeed.toFixed(2)} km/s</p> 
        <p>Hazardous: {asteroid.hazardous ? 'Yes' : 'No'}</p>
        <p>Miss Distance: {missDistance} km</p>
      </div>
    );
  };
  
  export default AsteroidCard;
  