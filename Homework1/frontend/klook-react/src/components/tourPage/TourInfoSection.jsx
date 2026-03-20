import ImagePlaceholder from './ImagePlaceholder'

export default function TourInfoSection({ goodToKnowGroups, tour }) {
    return (
        <section>
            {goodToKnowGroups.length > 0 && (
                <div className="good-to-know">
                    <h2 className="good-to-know-title section-title">Good to know</h2>

                    <div className="info">
                        {goodToKnowGroups.map((group, index) => (
                            <div className="info-group" key={`${group.title ?? 'group'}-${index}`}>
                                {group.title && <h3>{group.title}</h3>}

                                <ul>
                                    {group.items.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="map tour-location-section">
                <h2 className="map-title section-title">Location</h2>
                <ImagePlaceholder
                    alt={`${tour?.name ?? 'Tour'} location`}
                    className="tour-location-image"
                    label={tour?.location ?? 'Location image'}
                    src={tour?.location_image}
                ></ImagePlaceholder>
            </div>

            {tour?.faqs?.length > 0 && (
                <div className="faqs">
                    <h2 className="faqs-title section-title">FAQs</h2>

                    <div className="questions">
                        {tour.faqs.map((question, index) => {
                            const questionClassName = [
                                'question',
                                index === 0 ? 'question-first' : '',
                                index === tour.faqs.length - 1 ? 'question-last' : '',
                            ].filter(Boolean).join(' ')

                            return (
                                <div className={questionClassName} key={question}>
                                    <span>{question}</span>
                                    <svg width="16" height="16" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                                        <path d="M10 17L24 32L31 24.5L38 17" stroke="#212121" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                </div>
                            )
                        })}
                    </div>

                    <div className="help-center">Help Center</div>
                </div>
            )}
        </section>
    )
}
