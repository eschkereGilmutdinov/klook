export default function getBookedCountValue(bookedText) {
    if (typeof bookedText !== "string") {
        return 0;
    }

    const normalized = bookedText.toLowerCase();
    const match = normalized.match(/(\d+)\s*(km)?/);

    if (!match) {
        return 0;
    }

    const value = Number.parseFloat(match[1]);

    if (Number.isNaN(value)) {
        return 0;
    }

    if (match[2] === "k") {
        return value * 1000;
    }

    return value;
}
