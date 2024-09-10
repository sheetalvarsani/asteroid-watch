import "./SideBar.scss";
import React, { useState, useEffect } from "react";

type SideBarProps = {
    minSize: number;
    maxSize: number;
    onSizeChange: (minSize: number, maxSize: number) => void;
};

const SideBar = ({ minSize, maxSize, onSizeChange }: SideBarProps) => {
    const [range, setRange] = useState<{ min: number; max: number }>({ min: minSize, max: maxSize });

    // Update range when minSize or maxSize changes
    useEffect(() => {
        setRange({ min: minSize, max: maxSize });
    }, [minSize, maxSize]);

    // Handle changes to the slider
    const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const [min, max] = event.target.value.split(',').map(Number);
        setRange({ min, max });
        onSizeChange(min, max);
    };

    return (
        <div className="side-bar">
            <div className="filter-section">
            <div className="side-bar__filter">
                    <label htmlFor="size-slider">
                        Size Range:
                    </label>
                    <input
                        id="size-slider"
                        type="range"
                        min={minSize}
                        max={maxSize}
                        step="1"
                        value={`${range.min},${range.max}`}
                        onChange={handleRangeChange}
                    />
                </div>
            </div>
        </div>
    );
}

export default SideBar;
