import { ShowEveryOneFiltersDate, ShowEveryOneFiltersAnother } from "../../components/content/FiltersForEveryone";
import CategoriesFilter from "../../components/content/CategoriesFilter";
import filterCategoriesByTab from "../../data/filterCategoriesByTab";

export default function ShowFiltersForTours({
    dateFilter,
    setDateFilter,
    priceRange,
    priceBounds,
    setPriceRange,
    instantConfirmationOnly,
    setInstantConfirmationOnly,
    selectedCategories,
    onToggleCategory,
}) {
    return (
        <div className="sidebar-nav">
            <aside className="sidebar">
                <ShowEveryOneFiltersDate dateFilter={dateFilter} setDateFilter={setDateFilter}></ShowEveryOneFiltersDate>
                <div className="panel">
                    <CategoriesFilter
                        categories={filterCategoriesByTab.tours}
                        selectedCategories={selectedCategories}
                        onToggleCategory={onToggleCategory}
                    />
                    <h3>Guided language</h3>
                    <button className="other-button" style={{ marginBottom: "8px" }}>English guided</button>
                    <h3>Services</h3>
                    <button className="other-button" style={{ marginBottom: "8px" }}>Private Group</button>
                    <button className="other-button" style={{ marginBottom: "8px" }}>Free cancellation</button>
                    <h3>Review score</h3>
                    <div className="review-score">
                        <button className="other-button">3+</button>
                        <button className="other-button">3.5+</button>
                        <button className="other-button">4+</button>
                        <button className="other-button">4.5+</button>
                    </div>
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
    )
}
