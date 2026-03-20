import normalizeSearchParams from "./normalizeSearchParams";

export function updateSearchParams(setSearchParams, updater) {
    setSearchParams((currentParams) => {
        const nextParams = new URLSearchParams(currentParams);

        updater(nextParams);

        return normalizeSearchParams(nextParams);
    });
}

export function resetPage(nextParams) {
    nextParams.delete("page");
}

export function setParamWithDefault(nextParams, key, value, defaultValue) {
    if (!value || value === defaultValue) {
        nextParams.delete(key);
        return;
    }

    nextParams.set(key, value);
}

export function setBooleanParam(nextParams, key, value) {
    if (value) {
        nextParams.set(key, "1");
        return;
    }

    nextParams.delete(key);
}

export function setPriceParams(nextParams, range, bounds) {
    if (range.min <= bounds.min) {
        nextParams.delete("minPrice");
    } else {
        nextParams.set("minPrice", String(range.min));
    }

    if (range.max >= bounds.max) {
        nextParams.delete("maxPrice");
    } else {
        nextParams.set("maxPrice", String(range.max));
    }
}

export function setPageParam(nextParams, page) {
    if (page <= 1) {
        nextParams.delete("page");
        return;
    }

    nextParams.set("page", String(page));
}

export function toggleCategoriesParam(nextParams, selectedCategories, category) {
    const nextCategories = selectedCategories.includes(category)
        ? selectedCategories.filter((item) => item !== category)
        : [...selectedCategories, category];

    if (nextCategories.length === 0) {
        nextParams.delete("categories");
        return;
    }

    nextParams.set("categories", nextCategories.join(","));
}
