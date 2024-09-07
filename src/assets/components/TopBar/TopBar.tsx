import "./TopBar.scss";
import { useState } from "react";
import Button from "../Button/button";

type TopBarProps = {
    onSearch: (startDate: string, endDate: string) => void;
};

function TopBar({ onSearch }: TopBarProps) {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    // Handle search button click:
    const handleSearchClick = () => {
        // Make sure user selects both start and end dates:
        if (startDate && endDate) {
            onSearch(startDate, endDate);
        } else {
            alert("Please select both start and end dates.");
        }
    };

    return (
        <div className="top-bar">
            <div className="top-bar__heading">
                <h1>Asteroid Watch</h1>
            </div>

            <div className="top-bar__search">
                <label htmlFor="start-date">Start Date: </label>
                <input
                    type="date"
                    id="start-date"
                    value={startDate}
                    onChange={(event) => setStartDate(event.target.value)}
                />

                <label htmlFor="end-date">End Date: </label>
                <input
                    type="date"
                    id="end-date"
                    value={endDate}
                    onChange={(event) => setEndDate(event.target.value)}
                />

                <Button text="Search" onClick={handleSearchClick} />
            </div>
        </div>
    );
}

export default TopBar;
