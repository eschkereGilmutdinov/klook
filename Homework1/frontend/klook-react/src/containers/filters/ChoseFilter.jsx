import ShowFiltersForAll from './FiltersForAll';
import ShowFiltersForTours from './FiltersForTours';
import ShowFiltersForTickets from './FiltersForTickets';
import ShowFiltersForTransport from './FiltersForTransport';
import ShowFiltersForHotels from './FiltersForHotels';
import ShowFiltersForMore from './FiltersForMore';

function getFiltersByTab(activeTab, filterProps) {
    switch (activeTab) {
        case 'tours':
            return <ShowFiltersForTours {...filterProps} />;
        case 'tickets':
            return <ShowFiltersForTickets {...filterProps} />;
        case 'transport':
            return <ShowFiltersForTransport {...filterProps} />;
        case 'hotels':
            return <ShowFiltersForHotels {...filterProps} />;
        case 'more':
            return <ShowFiltersForMore {...filterProps} />;
        case 'all':
        default:
            return <ShowFiltersForAll {...filterProps} />;
    }
}

export default function ChoseFilter(props) {
    const { activeTab, ...filterProps } = props;

    return getFiltersByTab(activeTab, filterProps);
}
