import { ShowEveryOneFiltersDate, ShowEveryOneFiltersAnother } from "../../components/content/FiltersForEveryone";

export default function ShowFiltersForAll({
    dateFilter,
    setDateFilter,
    priceRange,
    priceBounds,
    setPriceRange,
    instantConfirmationOnly,
    setInstantConfirmationOnly,
}) {
    return (
        <div className="sidebar-nav">
            <aside className="sidebar">
                <ShowEveryOneFiltersDate dateFilter={dateFilter} setDateFilter={setDateFilter}></ShowEveryOneFiltersDate>
                <div className="panel">
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
