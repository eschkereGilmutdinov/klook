import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import toursPageData from '../../data/dataForToursPage.json'
import TourHeroSection from '../../components/tourPage/TourHeroSection'
import TourHighlightsSection from '../../components/tourPage/TourHighlightsSection'
import TourPackageSection from '../../components/tourPage/TourPackageSection'
import TourInfoSection from '../../components/tourPage/TourInfoSection'
import TourExploreSection from '../../components/tourPage/TourExploreSection'
import {
    buildTourPageModel,
    DATE_TABS,
    EXPLORE_SECTIONS,
    PACKAGE_TABS,
    TICKET_TABS,
} from './templates'

function getTourById(tourId) {
    return toursPageData.find((item) => String(item.id) === String(tourId)) ?? toursPageData[0]
}

export default function TourPageContainer() {
    const { id } = useParams()
    const [isHighlightsModalOpen, setIsHighlightsModalOpen] = useState(false)

    const tour = useMemo(() => getTourById(id), [id])
    const pageModel = useMemo(() => buildTourPageModel(tour), [tour])

    return (
        <div className="container">
            <TourHeroSection
                breadcrumbs={pageModel.breadcrumbs}
                tour={tour}
            ></TourHeroSection>

            <TourHighlightsSection
                highlights={pageModel.highlights}
                modalHighlights={pageModel.modalHighlights}
                isModalOpen={isHighlightsModalOpen}
                onOpenModal={() => setIsHighlightsModalOpen(true)}
                onCloseModal={() => setIsHighlightsModalOpen(false)}
            ></TourHighlightsSection>

            <TourPackageSection
                offers={pageModel.offers}
                packageTabs={PACKAGE_TABS}
                dateTabs={DATE_TABS}
                ticketTabs={TICKET_TABS}
                packageCard={pageModel.packageCard}
            ></TourPackageSection>

            <TourInfoSection
                tour={tour}
                goodToKnowGroups={pageModel.goodToKnowGroups}
            ></TourInfoSection>

            <TourExploreSection sections={EXPLORE_SECTIONS}></TourExploreSection>
        </div>
    )
}
