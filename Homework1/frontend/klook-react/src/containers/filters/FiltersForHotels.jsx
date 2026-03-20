import { useState } from "react";
import { ShowEveryOneFiltersDate, ShowEveryOneFiltersAnother } from "../../components/content/FiltersForEveryone";
import {
    ACCESSIBILITY_FACILITIES,
    BRAND_FILTERS,
    POPULAR_FILTERS,
    PROPERTY_DETAILS,
    PROPERTY_FACILITIES,
    PROPERTY_TYPE_FILTERS,
    REVIEW_SCORES,
    ROOM_FACILITIES,
    STAR_RATINGS,
} from "./hotels/constants";
import { HotelStarIcon, PlaceholderButton, PlaceholderCheckboxList } from "./hotels/PlaceholderControls";

export default function ShowFiltersForHotels({
    dateFilter,
    setDateFilter,
    priceRange,
    priceBounds,
    setPriceRange,
    instantConfirmationOnly,
    setInstantConfirmationOnly,
}) {
    const [activeButtons, setActiveButtons] = useState([]);
    const [activeChecks, setActiveChecks] = useState([]);
    const toggleButton = (key) => {
        setActiveButtons((prev) => (prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]));
    };
    const toggleCheck = (key) => {
        setActiveChecks((prev) => (prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]));
    };

    return (
        <div className="sidebar-nav">
            <aside className="sidebar hotels-filters">
                <ShowEveryOneFiltersDate dateFilter={dateFilter} setDateFilter={setDateFilter}></ShowEveryOneFiltersDate>
                <div className="panel">
                    <h3>Popular filters</h3>
                    <div className="popular-filters">
                        {POPULAR_FILTERS.map((filter, index) => (
                            <PlaceholderButton
                                key={filter}
                                isActive={activeButtons.includes(filter)}
                                onClick={() => toggleButton(filter)}
                                style={index === 2 ? { margin: 0 } : { marginBottom: "0px" }}
                            >
                                {filter}
                            </PlaceholderButton>
                        ))}
                    </div>

                    <h3>Star rating</h3>
                    <div className="star-rating">
                        {STAR_RATINGS.map((rating) => (
                            <PlaceholderButton key={rating.label} isActive={activeButtons.includes(rating.label)} onClick={() => toggleButton(rating.label)} style={{ marginBottom: "8px" }}>
                                <div>
                                    {rating.label}
                                    <HotelStarIcon />
                                </div>
                                <span className="span-down">({rating.count})</span>
                            </PlaceholderButton>
                        ))}
                    </div>

                    <h3>Review score</h3>
                    <div className="star-rating">
                        {REVIEW_SCORES.map((score) => (
                            <PlaceholderButton key={score.label} isActive={activeButtons.includes(score.label)} onClick={() => toggleButton(score.label)} style={{ marginBottom: "8px" }}>
                                <span>{score.label}</span>
                                <span className="span-down">{score.caption}</span>
                            </PlaceholderButton>
                        ))}
                    </div>

                    <h3>Property type</h3>
                    <PlaceholderCheckboxList items={PROPERTY_TYPE_FILTERS} activeItems={activeChecks} onToggle={toggleCheck} />

                    <h3>Brand</h3>
                    <PlaceholderCheckboxList items={BRAND_FILTERS} activeItems={activeChecks} onToggle={toggleCheck} />

                    <h3>Property facilities</h3>
                    <div className="property-facilities">
                        {PROPERTY_FACILITIES.map((facility) => (
                            <PlaceholderButton key={facility.label} className="other-button" isActive={activeButtons.includes(facility.label)} onClick={() => toggleButton(facility.label)}>
                                <img src={facility.icon} alt="" />
                                <span>{facility.label}</span>
                            </PlaceholderButton>
                        ))}
                    </div>

                    <PlaceholderCheckboxList items={PROPERTY_DETAILS} activeItems={activeChecks} onToggle={toggleCheck} />
                    <span className="see-more">See more</span>

                    <h3>Room facilities</h3>
                    <PlaceholderCheckboxList items={ROOM_FACILITIES} activeItems={activeChecks} onToggle={toggleCheck} />
                    <span className="see-more">See more</span>

                    <h3>Accessibility facilities</h3>
                    <PlaceholderCheckboxList items={ACCESSIBILITY_FACILITIES} activeItems={activeChecks} onToggle={toggleCheck} />

                    <ShowEveryOneFiltersAnother
                        priceRange={priceRange}
                        priceBounds={priceBounds}
                        setPriceRange={setPriceRange}
                        instantConfirmationOnly={instantConfirmationOnly}
                        setInstantConfirmationOnly={setInstantConfirmationOnly}
                    ></ShowEveryOneFiltersAnother>
                </div>
            </aside>
        </div>
    );
}
