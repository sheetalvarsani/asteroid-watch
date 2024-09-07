import './AsteroidList.scss';
import AsteroidCard from "../../components/AsteroidCard/AsteroidCard";

type AsteroidListProps = {
    asteroids: any[];
};

const AsteroidList = ({ asteroids }: AsteroidListProps) => {
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
