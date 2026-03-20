import ShowEveryOneFiltersDate from "./filtersForEveryone/EveryOneDateFilters";
import ShowEveryOneFiltersAnother from "./filtersForEveryone/EveryOneSharedFilters";

export default function ShowEveryOneFilters() {
    return (
        <>
            <ShowEveryOneFiltersDate />
            <ShowEveryOneFiltersAnother />
        </>
    );
}

export { ShowEveryOneFiltersDate, ShowEveryOneFiltersAnother };
