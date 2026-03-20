import tours from "../../data/tours.json";

export default function getToursByTab(activeTab) {
    if (activeTab === "all") {
        return tours;
    }

    return tours.filter((tour) => tour?.tab === activeTab);
}
