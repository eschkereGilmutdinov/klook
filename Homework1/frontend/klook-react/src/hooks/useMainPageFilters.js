import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import getToursByTab from '../containers/toursGrid/getToursByTab';
import filterCategoriesByTab from '../data/filterCategoriesByTab';
import { DATE_FILTERS } from '../data/dateFilters';
import { getPriceBounds, normalizePriceRange } from '../data/tourFilters';
import {
    DEFAULT_SORT_VALUE,
    parseNumberParam,
    VALID_DATE_FILTERS,
    VALID_SORT_OPTIONS,
    VALID_TABS,
} from './mainPageFilters/config';
import {
    resetPage,
    setBooleanParam,
    setPageParam,
    setParamWithDefault,
    setPriceParams,
    toggleCategoriesParam,
    updateSearchParams,
} from './mainPageFilters/searchParamHelpers';

export default function useMainPageFilters() {
    const [searchParams, setSearchParams] = useSearchParams();
    const activeTab = VALID_TABS.has(searchParams.get("tab")) ? searchParams.get("tab") : "all";
    const rawDateFilter = searchParams.get("date");
    const dateFilter = VALID_DATE_FILTERS.has(rawDateFilter) ? rawDateFilter : DATE_FILTERS.DEFAULT;
    const rawSortBy = searchParams.get("sort");
    const sortBy = VALID_SORT_OPTIONS.has(rawSortBy) ? rawSortBy : DEFAULT_SORT_VALUE;
    const instantConfirmationOnly = searchParams.get("instant") === "1";
    const currentPage = Math.max(1, parseNumberParam(searchParams.get("page")) ?? 1);
    const priceBounds = useMemo(() => getPriceBounds(getToursByTab(activeTab)), [activeTab]);
    const allowedCategories = filterCategoriesByTab[activeTab] ?? [];
    const selectedCategories = useMemo(() => {
        const rawCategories = searchParams.get("categories");

        if (!rawCategories) {
            return [];
        }

        const allowedCategorySet = new Set(allowedCategories);

        return rawCategories
            .split(",")
            .filter((category, index, categories) => (
                allowedCategorySet.has(category) && categories.indexOf(category) === index
            ));
    }, [allowedCategories, searchParams]);
    const priceRange = useMemo(() => {
        const rawMin = parseNumberParam(searchParams.get("minPrice"));
        const rawMax = parseNumberParam(searchParams.get("maxPrice"));

        return normalizePriceRange({
            min: rawMin ?? priceBounds.min,
            max: rawMax ?? priceBounds.max,
        }, priceBounds);
    }, [priceBounds, searchParams]);

    const setActiveTab = (nextTab) => {
        updateSearchParams(setSearchParams, (nextParams) => {
            setParamWithDefault(nextParams, "tab", nextTab, "all");
            nextParams.delete("categories");
            resetPage(nextParams);
        });
    };

    const setDateFilter = (nextDateFilter) => {
        updateSearchParams(setSearchParams, (nextParams) => {
            setParamWithDefault(nextParams, "date", nextDateFilter, DATE_FILTERS.DEFAULT);
            resetPage(nextParams);
        });
    };

    const setInstantConfirmationOnly = (nextValue) => {
        const resolvedValue = typeof nextValue === "function"
            ? nextValue(instantConfirmationOnly)
            : nextValue;

        updateSearchParams(setSearchParams, (nextParams) => {
            setBooleanParam(nextParams, "instant", resolvedValue);
            resetPage(nextParams);
        });
    };

    const setPriceRange = (nextRange) => {
        const resolvedRange = typeof nextRange === "function" ? nextRange(priceRange) : nextRange;
        const normalizedRange = normalizePriceRange(resolvedRange, priceBounds);

        updateSearchParams(setSearchParams, (nextParams) => {
            setPriceParams(nextParams, normalizedRange, priceBounds);
            resetPage(nextParams);
        });
    };

    const onToggleCategory = (category) => {
        updateSearchParams(setSearchParams, (nextParams) => {
            toggleCategoriesParam(nextParams, selectedCategories, category);
            resetPage(nextParams);
        });
    };

    const setCurrentPage = (nextPage) => {
        updateSearchParams(setSearchParams, (nextParams) => {
            const resolvedPage = typeof nextPage === "function" ? nextPage(currentPage) : nextPage;
            const safePage = Math.max(1, Number(resolvedPage) || 1);

            setPageParam(nextParams, safePage);
        });
    };

    const setSortBy = (nextSortBy) => {
        updateSearchParams(setSearchParams, (nextParams) => {
            setParamWithDefault(nextParams, "sort", nextSortBy, DEFAULT_SORT_VALUE);
            resetPage(nextParams);
        });
    };

    return {
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
    };
}
