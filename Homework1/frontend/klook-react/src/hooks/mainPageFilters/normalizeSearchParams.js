const SEARCH_PARAM_ORDER = [
    "tab",
    "date",
    "instant",
    "minPrice",
    "maxPrice",
    "categories",
    "sort",
    "page",
];

export default function normalizeSearchParams(searchParams) {
    const normalizedParams = new URLSearchParams();
    const knownKeys = new Set(SEARCH_PARAM_ORDER);

    SEARCH_PARAM_ORDER.forEach((key) => {
        searchParams.getAll(key).forEach((value) => {
            normalizedParams.append(key, value);
        });
    });

    Array.from(new Set(searchParams.keys()))
        .filter((key) => !knownKeys.has(key))
        .sort()
        .forEach((key) => {
            searchParams.getAll(key).forEach((value) => {
                normalizedParams.append(key, value);
            });
        });

    return normalizedParams;
}
