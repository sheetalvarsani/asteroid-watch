import "./SideBar.scss";
import React, { useState, useEffect } from "react";

//----------------------------------------------------------------------

type SideBarProps = {
    minSize: number; // Size Filter
    maxSize: number; // Size Filter
    minSpeed: number; // Speed Filter
    maxSpeed: number; // Speed Filter
    onSizeChange: (minSize: number, maxSize: number) => void; // Size filter
    onSpeedChange: (minSpeed: number, maxSpeed: number) => void; // Speed filter
    onHazardousChange: (hazardousOnly: boolean) => void; // Hazardous filter
    onSortChange: (sortBy: string, sortOrder: string) => void; // sorting sidebar
};

//----------------------------------------------------------------------

const SideBar = ({
    minSize,
    maxSize,
    minSpeed,
    maxSpeed,
    onSizeChange,
    onSpeedChange,
    onHazardousChange,
    onSortChange,
}: SideBarProps) => {

    const [minRangeSize, setMinRangeSize] = useState<number>(minSize);
    const [maxRangeSize, setMaxRangeSize] = useState<number>(maxSize);
    const [minRangeSpeed, setMinRangeSpeed] = useState<number>(minSpeed);
    const [maxRangeSpeed, setMaxRangeSpeed] = useState<number>(maxSpeed);
    const [hazardousOnly, setHazardousOnly] = useState<boolean>(false);

    //----------------------------------------------------------------------

    // Update range when minSize or maxSize changes
    useEffect(() => {
        setMinRangeSize(minSize);
        setMaxRangeSize(maxSize);
    }, [minSize, maxSize]);

    // Update range when minSpeed or maxSpeed changes
    useEffect(() => {
        setMinRangeSpeed(minSpeed);
        setMaxRangeSpeed(maxSpeed);
    }, [minSpeed, maxSpeed]);

    // Handle changes to hazardous checkbox
    const handleHazardousChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const isChecked = event.target.checked;
        setHazardousOnly(isChecked);
        onHazardousChange(isChecked);
    };

    //----------------------------------------------------------------------

    // Handle changes to the SIZE slider (TWO SEPARATE SLIDERS FOR MIN AND MAX)

    const handleMinSizeChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newMinSize = parseFloat(event.target.value);
        if (newMinSize <= maxRangeSize) {
            // min slider doesn't go higher than max value
            setMinRangeSize(newMinSize);
            onSizeChange(newMinSize, maxRangeSize);
        }
    };

    const handleMaxSizeChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newMaxSize = parseFloat(event.target.value);
        if (newMaxSize >= minRangeSize) {
            // max slider doesn't go lowerr than min
            setMaxRangeSize(newMaxSize);
            onSizeChange(minRangeSize, newMaxSize);
        }
    };

    //----------------------------------------------------------------------

    // Handle changes to the SPEED slider (TWO SEPARATE SLIDERS FOR MIN AND MAX)

    const handleMinSpeedChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newMinSpeed = parseFloat(event.target.value);
        if (newMinSpeed <= maxRangeSpeed) {
            // min slider doesn't go higher than max value
            setMinRangeSpeed(newMinSpeed);
            onSpeedChange(newMinSpeed, maxRangeSpeed);
        }
    };

    const handleMaxSpeedChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newMaxSpeed = parseFloat(event.target.value);
        if (newMaxSpeed >= minRangeSpeed) {
            // max slider doesn't go lower than min value
            setMaxRangeSpeed(newMaxSpeed);
            onSpeedChange(minRangeSpeed, newMaxSpeed);
        }
    };

    //----------------------------------------------------------------------

    // Handle sorting changes:

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const [sortBy, sortOrder] = event.target.value.split("-");
        onSortChange(sortBy, sortOrder);
    };

    //----------------------------------------------------------------------

    // show values to 2 decimal plaaces on label of slider:
    const formatNumber = (num: number) => num.toFixed(2);

    //----------------------------------------------------------------------

    return (
        <div className="side-bar">
            <div className="side-bar__filters">
                <h2 className="side-bar__heading">Filter By:</h2>
                {/* -- SORT FILTER -- */}
                <div className="side-bar__sort-filter">
                    <select onChange={handleSortChange}>
                        <option value="size-asc">Size (Low to High)</option>
                        <option value="size-desc">Size (High to Low)</option>
                        <option value="speed-asc">Speed (Low to High)</option>
                        <option value="speed-desc">Speed (High to Low)</option>
                        <option value="missDistance-asc">
                            Miss Dist. (Low to High)
                        </option>
                        <option value="missDistance-desc">
                            Miss Dist. (High to Low)
                        </option>
                    </select>
                </div>
                {/* -- SIZE FILTER -- */}
                <div className="side-bar__size-filter">
                    <h3 className="side-bar__subheading">
                        Size of Asteroid (km)
                    </h3>
                    <label
                        className="side-bar__label"
                        htmlFor="min-size-slider"
                    >
                        Min Size: {formatNumber(minRangeSize)}
                    </label>

                    <input
                        className="side-bar__slider"
                        type="range"
                        min={minSize}
                        max={maxSize}
                        step="0.01"
                        value={minRangeSize}
                        onChange={handleMinSizeChange}
                    />
                    <br />

                    <label
                        className="side-bar__label"
                        htmlFor="max-size-slider"
                    >
                        Max Size: {formatNumber(maxRangeSize)}
                    </label>

                    <input
                        className="side-bar__slider"
                        type="range"
                        min={minSize}
                        max={maxSize}
                        step="0.01"
                        value={maxRangeSize}
                        onChange={handleMaxSizeChange}
                    />
                </div>
                {/* -- SPEED FILTER -- */}
                <div className="side-bar__speed-filter">
                    <h3 className="side-bar__subheading">
                        Speed of Asteroid (km/s)
                    </h3>
                    <label
                        className="side-bar__label"
                        htmlFor="min-speed-slider"
                    >
                        Min Speed: {formatNumber(minRangeSpeed)}
                    </label>

                    <input
                        className="side-bar__slider"
                        type="range"
                        min={minSpeed}
                        max={maxSpeed}
                        step="0.01"
                        value={minRangeSpeed}
                        onChange={handleMinSpeedChange}
                    />
                    <br />
                    <label
                        className="side-bar__label"
                        htmlFor="max-speed-slider"
                    >
                        Max Speed: {formatNumber(maxRangeSpeed)}
                    </label>

                    <input
                        className="side-bar__slider"
                        type="range"
                        min={minSpeed}
                        max={maxSpeed}
                        step="0.01"
                        value={maxRangeSpeed}
                        onChange={handleMaxSpeedChange}
                    />
                </div>
                {/* -- HAZARDOUS FILTER -- */}
                <div className="side-bar__hazardous-filter">
                    <label className="side-bar__checkbox">
                        <input
                            type="checkbox"
                            checked={hazardousOnly}
                            onChange={handleHazardousChange}
                        />
                        Hazardous
                        <span className="side-bar__checkbox-indicator"></span>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default SideBar;
