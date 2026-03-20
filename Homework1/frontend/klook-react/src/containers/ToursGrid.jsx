import { useEffect, useMemo } from "react";
import TourCard from "../components/content/TourCard";
import SortDropdown from "../components/content/SortDropdown";
import { ITEMS_PER_PAGE, SORT_OPTIONS } from "./toursGrid/constants";
import getToursByTab from "./toursGrid/getToursByTab";
import sortTours from "./toursGrid/sortTours";
import { matchesDateFilter } from "../data/dateFilters";
import { matchesCategories, matchesInstantConfirmation, matchesPriceRange } from "../data/tourFilters";

export default function ToursGrid({
    activeTab,
    currentPage,
    dateFilter,
    priceRange,
    instantConfirmationOnly,
    selectedCategories,
    setCurrentPage,
    setSortBy,
    sortBy,
}) {
    const visibleTours = useMemo(() => {
        const tours = getToursByTab(activeTab).filter((tour) => (
            matchesDateFilter(tour, dateFilter)
            && matchesPriceRange(tour, priceRange)
            && matchesInstantConfirmation(tour, instantConfirmationOnly)
            && matchesCategories(tour, selectedCategories)
        ));

        return sortTours(tours, sortBy);
    }, [activeTab, dateFilter, instantConfirmationOnly, priceRange, selectedCategories, sortBy]);
    const totalPages = Math.max(1, Math.ceil(visibleTours.length / ITEMS_PER_PAGE));
    const safeCurrentPage = Math.min(currentPage, totalPages);

    useEffect(() => {
        if (safeCurrentPage !== currentPage) {
            setCurrentPage(safeCurrentPage);
        }
    }, [currentPage, safeCurrentPage, setCurrentPage]);

    const paginatedTours = useMemo(() => {
        const start = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
        return visibleTours.slice(start, start + ITEMS_PER_PAGE);
    }, [safeCurrentPage, visibleTours]);

    return (
        <section className="results-panel">
            <div className="results-meta">
                <span className="results-found">{visibleTours.length} results found</span>
                <div className="sort">
                    <p>Sort by</p>
                    <SortDropdown
                        options={SORT_OPTIONS}
                        value={sortBy}
                        onChange={setSortBy}
                    />
                </div>
            </div>

            <div className="grid">
                {paginatedTours.map((tour) => (
                    <TourCard key={tour.id} tour={tour} />
                ))}
            </div>

            {totalPages > 1 && (
                <div className="pagination">
                    <button
                        type="button"
                        className={safeCurrentPage === 1 ? "disabled" : ""}
                        onClick={() => setCurrentPage(safeCurrentPage - 1)}
                        disabled={safeCurrentPage === 1}
                        aria-label="Previous page"
                    >
                        {"<"}
                    </button>

                    {Array.from({ length: totalPages }, (_, index) => {
                        const page = index + 1;
                        return (
                            <button
                                key={page}
                                type="button"
                                className={safeCurrentPage === page ? "active" : ""}
                                onClick={() => setCurrentPage(page)}
                                aria-label={`Go to page ${page}`}
                            >
                                {page}
                            </button>
                        );
                    })}

                    <button
                        type="button"
                        className={safeCurrentPage === totalPages ? "disabled" : ""}
                        onClick={() => setCurrentPage(safeCurrentPage + 1)}
                        disabled={safeCurrentPage === totalPages}
                        aria-label="Next page"
                    >
                        {">"}
                    </button>
                </div>
            )}
        </section>
    );
}
