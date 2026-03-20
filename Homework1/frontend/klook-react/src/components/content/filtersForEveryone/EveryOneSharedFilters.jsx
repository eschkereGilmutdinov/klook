function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

export default function ShowEveryOneFiltersAnother({
    priceRange = { min: 0, max: 0 },
    priceBounds = { min: 0, max: 0 },
    setPriceRange = () => {},
    instantConfirmationOnly = false,
    setInstantConfirmationOnly = () => {},
}) {
    const hasPriceRange = priceBounds.max > priceBounds.min;
    const rangeSpan = hasPriceRange ? priceBounds.max - priceBounds.min : 1;
    const leftPercent = hasPriceRange ? ((priceRange.min - priceBounds.min) / rangeSpan) * 100 : 0;
    const rightPercent = hasPriceRange ? ((priceRange.max - priceBounds.min) / rangeSpan) * 100 : 100;
    const sliderTrackStyle = {
        background: `linear-gradient(to right, #e6e6e6 0%, #e6e6e6 ${leftPercent}%, #f96302 ${leftPercent}%, #f96302 ${rightPercent}%, #e6e6e6 ${rightPercent}%, #e6e6e6 100%)`,
    };
    const handleMinInput = (event) => {
        const rawValue = event.target.value;
        const nextMin = rawValue === ""
            ? priceBounds.min
            : clamp(Number(rawValue), priceBounds.min, priceBounds.max);

        setPriceRange({ min: nextMin, max: Math.max(priceRange.max, nextMin) });
    };
    const handleMaxInput = (event) => {
        const rawValue = event.target.value;
        const nextMax = rawValue === ""
            ? priceBounds.max
            : clamp(Number(rawValue), priceBounds.min, priceBounds.max);

        setPriceRange({ min: Math.min(priceRange.min, nextMax), max: nextMax });
    };
    const handleMinRangeChange = (event) => {
        const nextMin = clamp(Number(event.target.value), priceBounds.min, priceRange.max);
        setPriceRange({ min: nextMin, max: priceRange.max });
    };
    const handleMaxRangeChange = (event) => {
        const nextMax = clamp(Number(event.target.value), priceRange.min, priceBounds.max);
        setPriceRange({ min: priceRange.min, max: nextMax });
    };

    return (
        <div>
            <h3>Price range</h3>
            <div className="slider-container">
                <div className="slider-rail">
                    <div className="slider-track" style={sliderTrackStyle}></div>
                    <input className="slider-range" type="range" min={priceBounds.min} max={priceBounds.max} step="1" value={priceRange.min} onChange={handleMinRangeChange} aria-label="Minimum price" />
                    <input className="slider-range" type="range" min={priceBounds.min} max={priceBounds.max} step="1" value={priceRange.max} onChange={handleMaxRangeChange} aria-label="Maximum price" />
                    <div className="slider-handle" style={{ left: `${leftPercent}%` }}></div>
                    <div className="slider-handle" style={{ left: `${rightPercent}%` }}></div>
                </div>
            </div>
            <div className="price-inputs">
                <div className="price-wrapper">
                    <span>US$</span>
                    <input type="number" id="min-price" min={priceBounds.min} max={priceBounds.max} step="1" value={priceRange.min} onChange={handleMinInput} />
                </div>
                <span className="separator">–</span>
                <div className="price-wrapper">
                    <span>US$</span>
                    <input type="number" id="max-price" min={priceBounds.min} max={priceBounds.max} step="1" value={priceRange.max} onChange={handleMaxInput} />
                </div>
            </div>
            <h3>Others</h3>
            <button
                id="filterInstant"
                type="button"
                className={["other-button", instantConfirmationOnly ? "active" : ""].join(" ").trim()}
                style={{ marginBottom: "8px" }}
                aria-pressed={instantConfirmationOnly}
                onClick={() => setInstantConfirmationOnly((prev) => !prev)}
            >
                Instant confirmation
            </button>
            <h3>Location</h3>
            <p>Locations including products found with "teamlab borderless"</p>
            <button id="seeAllLocations" className="see-location">
                <svg width="16" height="16" viewBox="0 0 48 48" fill="none">
                    <path d="M42 21.0441C42 32.1335 30.6662 40.7078 25.9855 43.776C24.7669 44.5748 23.2331 44.5748 22.0145 43.776C17.3338 40.7078 6 32.1335 6 21.0441C6 11.0786 14.0589 3 24 3C33.9411 3 42 11.0786 42 21.0441Z" fill="transparent" stroke="#212121" strokeWidth="3.6"></path>
                    <circle cx="24" cy="20.5" r="6.5" fill="transparent" stroke="#212121" strokeWidth="3.6"></circle>
                </svg>
                <p style={{ margin: "3px" }}>See all</p>
            </button>
        </div>
    );
}
