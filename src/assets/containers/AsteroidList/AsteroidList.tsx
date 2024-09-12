import "./AsteroidList.scss";
import AsteroidCard from "../../components/AsteroidCard/AsteroidCard";

//----------------------------------------------------------------------
// | ASTEROID CARD |
//----------------------------------------------------------------------

type AsteroidListProps = {
    asteroids: any[];
 
};

//----------------------------------------------------------------------

const AsteroidList = ({ asteroids }: AsteroidListProps) => {
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
                    />
                ))}
            </div>
        </div>
    );
};
export default AsteroidList;
