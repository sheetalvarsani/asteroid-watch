// ProfileBar.tsx
import Button from "../Button/button";

type ProfileBarProps = {
    onBackClick: () => void;
};

const ProfileBar = ({ onBackClick }: ProfileBarProps) => {
    return (
        <div className="profile-bar">
            <div className="top-bar__heading">
                <h1>Asteroid Watch</h1>
            </div>
            <div className="top-bar__search">
                <Button text="Back" onClick={onBackClick} />
            </div>
        </div>
    );
};

export default ProfileBar;
