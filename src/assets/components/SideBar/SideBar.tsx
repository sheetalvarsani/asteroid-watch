import "./SideBar.scss";
import React, { useState, useEffect } from "react";

type SideBarProps = {
    minSize: number;
    maxSize: number;
    onSizeChange: (minSize: number, maxSize: number) => void;
};

const SideBar = ({ minSize, maxSize, onSizeChange }: SideBarProps) => {
    const [minRange, setMinRange] = useState<number>(minSize);
    const [maxRange, setMaxRange] = useState<number>(maxSize);

    // Update range when minSize or maxSize changes
    useEffect(() => {
        setMinRange(minSize);
        setMaxRange(maxSize);
    }, [minSize, maxSize]);

    // Handle changes to the slider (TWO SEPARATE SLIDERS FOR MIN AND MAX
    const handleMinSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newMin = parseFloat(event.target.value);
        setMinRange(newMin);
        onSizeChange(newMin, maxRange);
    };

    const handleMaxSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newMax = parseFloat(event.target.value);
        setMaxRange(newMax);
        onSizeChange(minRange, newMax);
    };

    return (
        <div className="side-bar">
            <div className="filter-section">
                <div className="side-bar__filter">
                    <label htmlFor="min-size-slider">
                        Min Size (km): {minRange}
                    </label>
                    <input
                        id="min-size-slider"
                        type="range"
                        min={minSize}
                        max={maxSize}
                        step="0.01"
                        value={minRange}
                        onChange={handleMinSizeChange}
                    />
                </div>
                <div className="side-bar__filter">
                    <label htmlFor="max-size-slider">
                        Max Size (km): {maxRange}
                    </label>
                    <input
                        id="max-size-slider"
                        type="range"
                        min={minSize}
                        max={maxSize}
                        step="0.01"
                        value={maxRange}
                        onChange={handleMaxSizeChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default SideBar;
