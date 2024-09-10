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
    const handleMinSizeChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newMin = parseFloat(event.target.value);
        setMinRange(newMin);
        onSizeChange(newMin, maxRange);
    };

    const handleMaxSizeChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newMax = parseFloat(event.target.value);
        setMaxRange(newMax);
        onSizeChange(minRange, newMax);
    };
    // show values to 2 decimal plaaces on label of slider:
    const formatNumber = (num: number) => num.toFixed(2);

    return (
        <div className="side-bar">
            <div className="side-bar_filters">
                <div className="side-bar__size-filter">
                    <h3 className="side-bar__heading">Size of Asteroid (km)</h3>
                    <label
                        className="side-bar__label"
                        htmlFor="min-size-slider"
                    >
                        Min Size: {formatNumber(minRange)}
                    </label>
                    <br></br>
                    <input
                        className="side-bar__slider"
                        type="range"
                        min={minSize}
                        max={maxSize}
                        step="0.01"
                        value={minRange}
                        onChange={handleMinSizeChange}
                    />
                    <br></br>

                    <label
                        className="side-bar__label"
                        htmlFor="max-size-slider"
                    >
                        Max Size: {formatNumber(maxRange)}
                    </label>
                    <br></br>
                    <input
                        className="side-bar__slider"
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
