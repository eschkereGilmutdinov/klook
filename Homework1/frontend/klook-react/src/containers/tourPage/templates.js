export const PACKAGE_TABS = [
    { id: 'standard', label: 'Standard', isActive: true },
    { id: 'combo-deals', label: 'Combo deals', badge: 'Great flash', isActive: false },
]

export const DATE_TABS = [
    { id: 'tomorrow', label: 'Tomorrow', isActive: true },
    { id: 'day-1', label: '16 Mar' },
    { id: 'day-2', label: '17 Mar' },
]

export const TICKET_TABS = [
    { id: 'admission-ticket', label: 'Admission', isActive: true },
]

export const PACKAGE_TAGS = [
    'No cancellation',
    'Valid on the selected date',
    'Enter with voucher',
    'Instant confirmation',
]

export const EXPLORE_SECTIONS = [
    {
        title: 'Top attractions in Tokyo',
        items: [
            'Ginza',
            'Shibuya Sky',
            'Ghibli Museum',
            'Asakusa',
            'Tokyo Sky Tree',
            'Tokyo Tower',
            'Odaiba',
            'Imperial Palace',
            'Akihabara',
            'Tokyo Station',
            'Ueno',
            'Shinjuku Station',
            'Harajuku',
            'Ueno Zoo',
            'Tsukiji Outer Market',
            'Ikebukuro',
            'Ueno Park',
            'Sensoji Temple',
            'Tokyo Dome City',
            'Shibuya Scramble Crossing',
        ],
    },
    {
        title: 'Everything you need for your Tokyo visit',
        items: [
            'Tokyo Hotels',
            'Tokyo Car rentals',
            'Tokyo Private airport transfers',
            'Tokyo Tours & experiences',
            'Tokyo Tours',
            'Tokyo Day trips',
            'Tokyo Cultural experiences',
            'Tokyo Food & drinks tours',
            'Tokyo Cooking classes',
            'Tokyo Outdoor & sports activities',
            'Tokyo Workshops',
            'Tokyo Traditional clothes rental',
            'Tokyo Go-karting',
            'Tokyo Photoshoot',
            'Tokyo Cruises',
            'Tokyo Sightseeing cruises',
            'Tokyo Massages',
            'Tokyo Fitness',
            'Tokyo Spa & massages',
            'Tokyo Wildlife',
        ],
    },
    {
        title: 'Top destinations in Japan',
        listClassName: 'cities-list',
        items: [
            'Tokyo',
            'Osaka',
            'Kyoto',
            'Chiba',
            'Okinawa',
            'Nagoya',
            'Sapporo',
            'Hokkaido',
            'Yamanashi',
            'Yokohama',
            'Kobe',
            'Fukuoka',
            'Aichi',
            'Narita',
            'Hiroshima',
            'Kanagawa',
            'Gifu',
            'Fujiyoshida',
            'Fujinomiya',
            'Kanazawa',
        ],
    },
]

function createOfferParts(offer) {
    if (!offer) {
        return null
    }

    const parts = [offer.title, offer.discount].filter(Boolean)

    return parts.length > 0 ? parts : null
}

function createFallbackHighlights(tour) {
    const fallbackHighlights = [
        tour?.location ? `Visit ${tour.location}` : null,
        tour?.price ? `Tickets available from ${tour.price}` : null,
        tour?.city ? `Plan this experience in ${tour.city}` : null,
    ]

    return fallbackHighlights.filter(Boolean)
}

function splitGoodToKnow(items = []) {
    if (items.length === 0) {
        return []
    }

    if (items.length <= 3) {
        return [{ title: null, items }]
    }

    if (items.length <= 7) {
        return [
            { title: null, items: [items[0]] },
            { title: 'Helpful before you go', items: items.slice(1) },
        ]
    }

    return [
        { title: null, items: [items[0]] },
        { title: 'Helpful before you go', items: items.slice(1, Math.ceil(items.length / 2)) },
        { title: 'Getting there', items: items.slice(Math.ceil(items.length / 2)) },
    ]
}

export function buildTourPageModel(tour) {
    const highlights = [...(tour?.image_info ?? [])]

    if (highlights.length === 0) {
        highlights.push(...createFallbackHighlights(tour))
    }

    const offers = (tour?.offers ?? []).map(createOfferParts).filter(Boolean)
    const goodToKnowGroups = splitGoodToKnow(tour?.good_to_know ?? [])

    return {
        breadcrumbs: ['Home', 'Japan', tour?.city, tour?.name].filter(Boolean),
        highlights,
        modalHighlights: [...highlights, ...offers.flat()].filter(Boolean),
        offers,
        packageCard: {
            title: tour?.name ?? 'Admission ticket',
            tags: PACKAGE_TAGS,
            availabilityText: 'Limited daily slots available',
            detailsLabel: 'Package details',
            pricePrefix: tour?.price ? 'From' : null,
            price: tour?.price ?? 'Check price',
            actionLabel: 'Select',
        },
        goodToKnowGroups,
    }
}
