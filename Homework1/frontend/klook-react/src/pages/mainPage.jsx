import TabsContainer from '../containers/tabsMain';
import '../styles/page.css'
import ChoseFilter from '../containers/filters/ChoseFilter';
import ToursGrid from '../containers/ToursGrid';
import useMainPageFilters from '../hooks/useMainPageFilters';

function MainPage() {
    const {
        activeTab,
        currentPage,
        dateFilter,
        instantConfirmationOnly,
        onToggleCategory,
        priceBounds,
        priceRange,
        selectedCategories,
        setActiveTab,
        setCurrentPage,
        setDateFilter,
        setInstantConfirmationOnly,
        setPriceRange,
        setSortBy,
        sortBy,
    } = useMainPageFilters();

    return (
        <div className="page">
            <div className="title-row">
                <h1>Results for "teamlab borderless"</h1>
            </div>
            <TabsContainer activeTab={activeTab} setActiveTab={setActiveTab}></TabsContainer>
            <div className="content">
                <ChoseFilter
                    activeTab={activeTab}
                    dateFilter={dateFilter}
                    setDateFilter={setDateFilter}
                    priceRange={priceRange}
                    priceBounds={priceBounds}
                    setPriceRange={setPriceRange}
                    instantConfirmationOnly={instantConfirmationOnly}
                    setInstantConfirmationOnly={setInstantConfirmationOnly}
                    selectedCategories={selectedCategories}
                    onToggleCategory={onToggleCategory}
                ></ChoseFilter>
                <ToursGrid
                    activeTab={activeTab}
                    currentPage={currentPage}
                    dateFilter={dateFilter}
                    priceRange={priceRange}
                    instantConfirmationOnly={instantConfirmationOnly}
                    selectedCategories={selectedCategories}
                    setCurrentPage={setCurrentPage}
                    setSortBy={setSortBy}
                    sortBy={sortBy}
                ></ToursGrid>
            </div>
        </div>
    )
}

export default MainPage;
