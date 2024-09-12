import "./AsteroidList.scss";
import AsteroidCard from "../../components/AsteroidCard/AsteroidCard";

//----------------------------------------------------------------------
// | ASTEROID CARD |
//----------------------------------------------------------------------

type AsteroidListProps = {
    asteroids: any[];
    searchParams: { startDate: string; endDate: string }; // Include searchParams
};

//----------------------------------------------------------------------

const AsteroidList = ({ asteroids, searchParams }: AsteroidListProps) => {
    return (
        <div className="asteroid-list">
            <div className="asteroid-list__heading">
                <h2>Asteroids Found:</h2>
            </div>
            <div className="asteroid-list__results">
                {asteroids.map((asteroid: any, index: number) => (
                    <AsteroidCard
                        key={`asteroid-${index}`}
                        asteroid={asteroid}
                        searchParams={searchParams} // Pass searchParams here
                    />
                ))}
            </div>
        </div>
    );
};
export default AsteroidList;
