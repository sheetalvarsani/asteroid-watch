import "./SideBar.scss";
import { useState, useEffect } from "react";

type SideBarProps = {
    minSize: number;
    maxSize: number;
    minSpeed: number;
    maxSpeed: number;
    onSizeChange: (minSize: number, maxSize: number) => void;
    onSpeedChange: (minSpeed: number, maxSpeed: number) => void;
    onHazardousChange: (hazardousOnly: boolean) => void;
    onSortChange: (sortBy: string, sortOrder: string) => void;
};

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

    useEffect(() => {
        setMinRangeSize(minSize);
        setMaxRangeSize(maxSize);
    }, [minSize, maxSize]);

    useEffect(() => {
        setMinRangeSpeed(minSpeed);
        setMaxRangeSpeed(maxSpeed);
    }, [minSpeed, maxSpeed]);

    const handleHazardousChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const isChecked = event.target.checked;
        setHazardousOnly(isChecked);
        onHazardousChange(isChecked);
    };

    const handleMinSizeChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newMinSize = parseFloat(event.target.value);
        if (newMinSize <= maxRangeSize) {
            setMinRangeSize(newMinSize);
            onSizeChange(newMinSize, maxRangeSize);
        }
    };

    const handleMaxSizeChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newMaxSize = parseFloat(event.target.value);
        if (newMaxSize >= minRangeSize) {
            setMaxRangeSize(newMaxSize);
            onSizeChange(minRangeSize, newMaxSize);
        }
    };

    const handleMinSpeedChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newMinSpeed = parseFloat(event.target.value);
        if (newMinSpeed <= maxRangeSpeed) {
            setMinRangeSpeed(newMinSpeed);
            onSpeedChange(newMinSpeed, maxRangeSpeed);
        }
    };

    const handleMaxSpeedChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const newMaxSpeed = parseFloat(event.target.value);
        if (newMaxSpeed >= minRangeSpeed) {
            setMaxRangeSpeed(newMaxSpeed);
            onSpeedChange(minRangeSpeed, newMaxSpeed);
        }
    };

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const [sortBy, sortOrder] = event.target.value.split("-");
        onSortChange(sortBy, sortOrder);
    };

    const formatNumber = (num: number) => num.toFixed(2);

    return (
        <div className="side-bar">
            <div className="side-bar__filters">
                <h2 className="side-bar__heading">Filter By:</h2>

                <div className="side-bar__size-filter">
                    <h3 className="side-bar__subheading-size">
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

                <div className="side-bar__speed-filter">
                    <h3 className="side-bar__subheading-speed">
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

                <div className="side-bar__sort-filter">
                    <h2 className="side-bar__heading">Sort By:</h2>
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
            </div>
        </div>
    );
};

export default SideBar;
