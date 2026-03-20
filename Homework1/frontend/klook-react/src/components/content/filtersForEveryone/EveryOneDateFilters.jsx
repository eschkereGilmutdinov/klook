import { DATE_FILTER_OPTIONS, DATE_FILTERS } from "../../../data/dateFilters";

export default function ShowEveryOneFiltersDate({ dateFilter = DATE_FILTERS.DEFAULT, setDateFilter = () => {} }) {
    const topRowOptions = DATE_FILTER_OPTIONS.filter((option) => option.value !== DATE_FILTERS.ALL);
    const allDatesOption = DATE_FILTER_OPTIONS.find((option) => option.value === DATE_FILTERS.ALL);
    const toggleDateFilter = (nextFilter) => {
        setDateFilter(dateFilter === nextFilter ? DATE_FILTERS.DEFAULT : nextFilter);
    };

    return (
        <div className="panel">
            <h3>Dates</h3>
            <div className="date-btn">
                <div className="date-btn-up">
                    {topRowOptions.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            className={dateFilter === option.value ? "active" : ""}
                            aria-pressed={dateFilter === option.value}
                            onClick={() => toggleDateFilter(option.value)}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
                <div>
                    <button
                        type="button"
                        className={["date-btn-down", dateFilter === DATE_FILTERS.ALL ? "active" : ""].join(" ").trim()}
                        aria-pressed={dateFilter === DATE_FILTERS.ALL}
                        onClick={() => setDateFilter(dateFilter === DATE_FILTERS.ALL ? DATE_FILTERS.DEFAULT : DATE_FILTERS.ALL)}
                    >
                        <svg width="16" height="16" viewBox="0 0 48 48" fill="none">
                            <path d="M36.1353 8.00024H11.621C7.45518 8.00024 4.07812 11.4865 4.07812 15.7869V35.2536C4.07812 39.554 7.45518 43.0402 11.621 43.0402H36.1353C40.3011 43.0402 43.6781 39.554 43.6781 35.2536V15.7869C43.6781 11.4865 40.3011 8.00024 36.1353 8.00024Z" fill="transparent" stroke="currentColor" strokeWidth="3.6"></path>
                            <path d="M2.3999 20.2H44.5" stroke="currentColor" strokeWidth="3.6"></path>
                            <path d="M15.2017 12.1998V4.7998" stroke="currentColor" strokeWidth="3.6" strokeLinecap="round"></path>
                            <path d="M32.1982 12.1998V4.7998" stroke="currentColor" strokeWidth="3.6" strokeLinecap="round"></path>
                        </svg>
                        <span>{allDatesOption?.label}</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
