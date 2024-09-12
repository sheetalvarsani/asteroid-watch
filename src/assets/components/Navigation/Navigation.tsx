import "./Navigation.scss";
import { useEffect, useState } from "react";
import leftArrow from "../../../assets/images/left-arrow.png";
import rightArrow from "../../../assets/images/right-arrow.png";

type NavigationProps = {
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (pageNumber: number) => void;
};

const Navigation = ({
    totalItems,
    itemsPerPage,
    onPageChange,
}: NavigationProps) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    useEffect(() => {
        setCurrentPage(1);
    }, [totalItems, itemsPerPage]);

    const handlePageChange = (pageNumber: number) => {
        if (pageNumber < 1 || pageNumber > totalPages) return;
        setCurrentPage(pageNumber);
        onPageChange(pageNumber);
    };

    return (
        <div className="navigation">
            <button
                className="navigation__arrow"
                aria-label="Navigate left"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <img
                    src={leftArrow}
                    alt="Left arrow to navigate results pages"
                />
            </button>
            <span className="navigation__page-info">
                Page {currentPage} of {totalPages}
            </span>
            <button
                className="navigation__arrow"
                aria-label="Navigate right"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <img
                    src={rightArrow}
                    alt="Right arrow to navigate results pages"
                />
            </button>
        </div>
    );
};

export default Navigation;
