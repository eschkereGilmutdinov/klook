export const DATE_FILTERS = {
    DEFAULT: "default",
    ALL: "all-dates",
    TODAY: "today",
    TOMORROW: "tomorrow",
};

export const DATE_FILTER_OPTIONS = [
    { label: "Today", value: DATE_FILTERS.TODAY },
    { label: "Tomorrow", value: DATE_FILTERS.TOMORROW },
    { label: "All dates", value: DATE_FILTERS.ALL },
];

const DATE_FILTER_BADGES = {
    [DATE_FILTERS.TODAY]: "book now for today",
    [DATE_FILTERS.TOMORROW]: "book now for tomorrow",
};

export function matchesDateFilter(tour, dateFilter) {
    if (dateFilter === DATE_FILTERS.DEFAULT || dateFilter === DATE_FILTERS.ALL) {
        return true;
    }

    const expectedBadge = DATE_FILTER_BADGES[dateFilter];

    if (!expectedBadge) {
        return true;
    }

    const primaryBadges = tour?.badges?.primary ?? [];

    return primaryBadges.some((badge) => badge?.toLowerCase() === expectedBadge);
}
