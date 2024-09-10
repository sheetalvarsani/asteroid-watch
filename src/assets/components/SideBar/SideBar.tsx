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
};

//----------------------------------------------------------------------

const SideBar = ({
    minSize,
    maxSize,
    minSpeed,
    maxSpeed,
    onSizeChange,
    onSpeedChange,
}: SideBarProps) => {
    const [minRangeSize, setMinRangeSize] = useState<number>(minSize);
    const [maxRangeSize, setMaxRangeSize] = useState<number>(maxSize);
    const [minRangeSpeed, setMinRangeSpeed] = useState<number>(minSpeed);
    const [maxRangeSpeed, setMaxRangeSpeed] = useState<number>(maxSpeed);

    //----------------------------------------------------------------------

    // Update range when minSize or maxSize changes
    useEffect(() => {
        setMinRangeSize(minSize);
        setMaxRangeSize(maxSize);
    }, [minSize, maxSize]);

    // useEffect for Speed filter
    useEffect(() => {
        setMinRangeSpeed(minSpeed);
        setMaxRangeSpeed(maxSpeed);
    }, [minSpeed, maxSpeed]);

    //----------------------------------------------------------------------

    // Handle changes to the SIZE slider (TWO SEPARATE SLIDERS FOR MIN AND MAX)

    const handleMinSizeChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newMinSize = parseFloat(event.target.value);
        setMinRangeSize(newMinSize);
        onSizeChange(newMinSize, maxRangeSize);
    };

    const handleMaxSizeChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newMaxSize = parseFloat(event.target.value);
        setMaxRangeSize(newMaxSize);
        onSizeChange(minRangeSize, newMaxSize);
    };

    //----------------------------------------------------------------------

    // Handle changes to the SPEED slider (TWO SEPARATE SLIDERS FOR MIN AND MAX)

    const handleMinSpeedChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newMinSpeed = parseFloat(event.target.value);
        setMinRangeSpeed(newMinSpeed);
        onSpeedChange(newMinSpeed, maxRangeSpeed);
    };

    const handleMaxSpeedChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newMaxSpeed = parseFloat(event.target.value);
        setMaxRangeSpeed(newMaxSpeed);
        onSpeedChange(minRangeSpeed, newMaxSpeed);
    };
    //----------------------------------------------------------------------

    // show values to 2 decimal plaaces on label of slider:
    const formatNumber = (num: number) => num.toFixed(2);

    return (
        <div className="side-bar">
            <div className="side-bar__filters">
                <h2 className="side-bar__heading">FILTERS:</h2>
                <div className="side-bar__size-filter">
                    <h3 className="side-bar__subheading">Size of Asteroid (km)</h3>
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
                    <br></br>

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
 <br></br>
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
            </div>
        </div>
    );
};

export default SideBar;
