import { ShowEveryOneFiltersDate, ShowEveryOneFiltersAnother } from "../../components/content/FiltersForEveryone";
import CategoriesFilter from "../../components/content/CategoriesFilter";
import filterCategoriesByTab from "../../data/filterCategoriesByTab";

export default function ShowFiltersForTransport({
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
                        categories={filterCategoriesByTab.transport}
                        selectedCategories={selectedCategories}
                        onToggleCategory={onToggleCategory}
                    />
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
