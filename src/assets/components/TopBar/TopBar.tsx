import "./TopBar.scss";
import { useState } from "react";
import Button from "../Button/button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type TopBarProps = {
    onSearch: (startDate: string, endDate: string) => void;
    hasSearched: boolean; // for TopBar styling change    
};

function TopBar({ onSearch, hasSearched }: TopBarProps) {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    // Handle search button click:
    const handleSearchClick = () => {
        // Make sure user selects both start and end dates:
        if (startDate && endDate) {
        const formattedStartDate = startDate.toISOString().split("T")[0];
        const formattedEndDate = endDate.toISOString().split("T")[0];
        onSearch(formattedStartDate, formattedEndDate);
        } else {
            alert("Please select both start and end dates.");
        }
    };

    return (
        <div className={`top-bar ${hasSearched ? 'top-bar--searched' : 'top-bar--initial'}`}>
            <div className="top-bar__heading">
                <h1>Asteroid Watch</h1>
            </div>

            <div className="top-bar__search">
                <label htmlFor="start-date">Start Date: </label>
                <DatePicker
                    selected={startDate}
                    onChange={(date: Date | null) => setStartDate(date)}
                    dateFormat="dd-MM-yyyy"
                    placeholderText="Select Start Date"
                    className="top-bar__date-picker"
                />
                <label htmlFor="end-date">End Date: </label>
                <DatePicker
                    selected={endDate}
                    onChange={(date: Date | null) => setEndDate(date)}
                    dateFormat="dd-MM-yyyy"
                    placeholderText="Select End Date"
                    className="top-bar__date-picker"
                />

                <Button text="Search" onClick={handleSearchClick} />
            </div>
        </div>
    );
}

export default TopBar;
