import Button from "../Button/button";
import { useNavigate } from "react-router-dom";

const ProfileBar = () => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1); 
    };

    return (
        <div className="profile-bar">
            <div className="top-bar__heading">
                <h1>Asteroid Watch</h1>
            </div>
            <div className="top-bar__search">
                <Button text="Back to Search Results" onClick={handleBackClick} />
            </div>
        </div>
    );
};

export default ProfileBar;
