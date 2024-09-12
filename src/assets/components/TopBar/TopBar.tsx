import "react-datepicker/dist/react-datepicker.css";
import "./TopBar.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button/button";
import DatePicker from "react-datepicker";

type TopBarProps = {
    onSearch: (startDate: string, endDate: string) => void;
    hasSearched: boolean;
};

function TopBar({ onSearch, hasSearched }: TopBarProps) {
    const navigate = useNavigate();

    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const handleStartDateChange = (date: Date | null) => {
        setStartDate(date);

        if (endDate && date && endDate < date) {
            setEndDate(null);
        }
    };

    const handleEndDateChange = (date: Date | null) => {
        setEndDate(date);
    };

    const handleSearchClick = () => {
        if (startDate && endDate) {
            const formattedStartDate = startDate.toISOString().split("T")[0];
            const formattedEndDate = endDate.toISOString().split("T")[0];
            onSearch(formattedStartDate, formattedEndDate);

            navigate("/asteroid-watch/", {
                state: {
                    startDate: formattedStartDate,
                    endDate: formattedEndDate,
                    hasSearched: true,
                },
            });
        } else {
            alert("Please select both start and end dates.");
        }
    };

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
                <h3>Choose a date range to find some Asteroids:</h3>
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
                    minDate={startDate || undefined}
                />

                <Button text="Search" onClick={handleSearchClick} />
            </div>
        </div>
    );
}

export default TopBar;
