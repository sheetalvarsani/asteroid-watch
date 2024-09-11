import "react-datepicker/dist/react-datepicker.css";
import "./TopBar.scss";
import { useState } from "react";
import Button from "../Button/button";
import DatePicker from "react-datepicker";

//----------------------------------------------------------------------
// | DATE PICKER | BUTTON |
//----------------------------------------------------------------------

type TopBarProps = {
    onSearch: (startDate: string, endDate: string) => void;
    hasSearched: boolean; // for TopBar styling change
};

//----------------------------------------------------------------------

function TopBar({ onSearch, hasSearched }: TopBarProps) {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    // Handle start date changes:
    const handleStartDateChange = (date: Date | null) => {
        setStartDate(date);
        // Reset endDate if it's before selected startDate
        if (endDate && date && endDate < date) {
            setEndDate(null);
        }
    };

    // Handle end date changes:
    const handleEndDateChange = (date: Date | null) => {
        setEndDate(date);
    };

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

    //----------------------------------------------------------------------

    return (
        <div
            className={`top-bar ${
                hasSearched ? "top-bar--searched" : "top-bar--initial"
            }`}
        >
            <div className="top-bar__heading">
                <h1>Asteroid Watch</h1>
            </div>

            <div className="top-bar__tagline">
                <h3> Choose a date range to find some Asteroids:</h3>
            </div>

            <div className="top-bar__search">
                <DatePicker
                    selected={startDate}
                    onChange={handleStartDateChange}
                    dateFormat="dd-MM-yyyy"
                    placeholderText="Select Start Date"
                    className="top-bar__date-picker"
                />
                <DatePicker
                    selected={endDate}
                    onChange={handleEndDateChange}
                    dateFormat="dd-MM-yyyy"
                    placeholderText="Select End Date"
                    className="top-bar__date-picker"
                    minDate={startDate || undefined} // make sure end date isn't before start date
                />

                <Button text="Search" onClick={handleSearchClick} />
            </div>
        </div>
    );
}

export default TopBar;
