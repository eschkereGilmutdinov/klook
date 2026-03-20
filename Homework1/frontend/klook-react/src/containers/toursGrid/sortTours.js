import getBookedCountValue from "./getBookedCountValue";

export default function sortTours(items, sortBy) {
    const next = [...items];

    switch (sortBy) {
        case "lowest-price":
            return next.sort((a, b) => (a?.price?.from ?? Number.MAX_SAFE_INTEGER) - (b?.price?.from ?? Number.MAX_SAFE_INTEGER));
        case "most-booked":
            return next.sort(
                (a, b) => getBookedCountValue(b?.rating?.booked_count_text) - getBookedCountValue(a?.rating?.booked_count_text),
            );
        case "recently-added":
            return next.sort((a, b) => (b?.id ?? 0) - (a?.id ?? 0));
        case "top-rated":
            return next.sort((a, b) => (b?.rating?.score ?? 0) - (a?.rating?.score ?? 0));
        case "recommended":
        default:
            return next;
    }
}
