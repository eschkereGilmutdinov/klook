import { SORT_OPTIONS } from '../../containers/toursGrid/constants';
import { DATE_FILTERS } from '../../data/dateFilters';
import TabsMainPage from '../../data/tabsMainPage';

export const DEFAULT_SORT_VALUE = SORT_OPTIONS[0].value;
export const VALID_TABS = new Set(TabsMainPage.map((tab) => tab.key));
export const VALID_DATE_FILTERS = new Set(Object.values(DATE_FILTERS));
export const VALID_SORT_OPTIONS = new Set(SORT_OPTIONS.map((option) => option.value));

export function parseNumberParam(value) {
    if (value === null || value === "") {
        return null;
    }

    const parsedValue = Number(value);

    return Number.isFinite(parsedValue) ? parsedValue : null;
}
