function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function hasPrimaryBadge(tour, expectedBadge) {
    const primaryBadges = tour?.badges?.primary ?? [];

    return primaryBadges.some((badge) => badge?.toLowerCase() === expectedBadge);
}

export function getPriceBounds(tours) {
    const prices = tours
        .map((tour) => tour?.price?.from)
        .filter((price) => typeof price === "number");

    if (!prices.length) {
        return { min: 0, max: 0 };
    }

    return {
        min: 0,
        max: Math.ceil(Math.max(...prices)),
    };
}

export function normalizePriceRange(range, bounds) {
    const safeMin = typeof bounds?.min === "number" ? bounds.min : 0;
    const safeMax = typeof bounds?.max === "number" ? bounds.max : safeMin;
    const nextMin = typeof range?.min === "number" ? range.min : safeMin;
    const nextMax = typeof range?.max === "number" ? range.max : safeMax;
    const clampedMin = clamp(nextMin, safeMin, safeMax);
    const clampedMax = clamp(nextMax, safeMin, safeMax);

    return {
        min: Math.min(clampedMin, clampedMax),
        max: Math.max(clampedMin, clampedMax),
    };
}

export function matchesPriceRange(tour, priceRange) {
    const price = tour?.price?.from;

    if (typeof price !== "number") {
        return false;
    }

    return price >= priceRange.min && price <= priceRange.max;
}

export function matchesInstantConfirmation(tour, instantConfirmationOnly) {
    if (!instantConfirmationOnly) {
        return true;
    }

    return hasPrimaryBadge(tour, "instant confirmation");
}

export function matchesCategories(tour, selectedCategories) {
    if (!selectedCategories?.length) {
        return true;
    }

    const tourCategory = tour?.category?.toLowerCase();

    return selectedCategories.some((category) => category.toLowerCase() === tourCategory);
}
