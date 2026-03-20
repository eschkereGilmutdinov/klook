export default function TourPackageSection({ dateTabs, offers, packageCard, packageTabs, ticketTabs }) {
    return (
        <section>
            {offers.length > 0 && (
                <div className="offers">
                    <div className="text">Offers for you</div>

                    <div className="offers-list">
                        {offers.map((offer) => (
                            <div className="tag-content" key={offer.join('-')}>
                                {offer.map((offerPart) => (
                                    <span className="offer-badge" key={offerPart}>{offerPart}</span>
                                ))}
                                <svg width="20" height="20" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                                    <path d="M17 8L35 24L26 32L17 40" stroke="currentColor" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="package-options">
                <h2 className="package-title">Package options</h2>

                <div className="tabs">
                    {packageTabs.map((tab) => (
                        <div className={tab.isActive ? 'tab-main' : 'tab'} key={tab.id}>
                            {tab.label}
                            {tab.badge && <div className="discount-tag">{tab.badge}</div>}
                        </div>
                    ))}
                </div>

                <div className="date-tab">
                    {dateTabs.map((tab) => (
                        <div className={tab.isActive ? 'tab tour-tab-active' : 'tab'} key={tab.id}>
                            <span>{tab.label}</span>
                        </div>
                    ))}

                    <div className="tab-all-dates">
                        <span className="tab-all-dates-icon"><svg width="16" height="16" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                            <rect x="6" y="10" width="36" height="32" rx="3" stroke="currentColor" strokeWidth="3.6"></rect>
                            <path d="M16 6V14" stroke="currentColor" strokeWidth="3.6" strokeLinecap="round"></path>
                            <path d="M32 6V14" stroke="currentColor" strokeWidth="3.6" strokeLinecap="round"></path>
                            <path d="M6 20H42" stroke="currentColor" strokeWidth="3.6"></path>
                        </svg></span>
                        <span>All dates</span>
                    </div>
                </div>

                <div className="ticket-tabs">
                    {ticketTabs.map((tab) => (
                        <div className={tab.isActive ? 'tab active-ticket-tab' : 'tab'} key={tab.id}>{tab.label}</div>
                    ))}
                </div>

                <div className="admission-ticket">
                    <div className="title">
                        <h2 className="section-heading">Admission ticket</h2>
                    </div>

                    <div className="admission-ticket-card tour-card-rounded">
                        <div className="title-card">
                            <div className="title-card-text">{packageCard.title}</div>
                        </div>

                        <div className="tags-box">
                            {packageCard.tags.map((tag) => (
                                <div className="tag" key={tag}>{tag}</div>
                            ))}
                        </div>

                        <div className="daily-slots">
                            <svg width="16" height="16" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                                <circle cx="24" cy="24" r="21" fill="transparent" stroke="currentColor" strokeWidth="3.6"></circle>
                                <path d="M15 24L21.364 30.364L32.6777 19.0503" stroke="currentColor" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                            {packageCard.availabilityText}
                        </div>

                        <div className="card-footer">
                            <div className="package-details">
                                <span className="package-details-link">{packageCard.detailsLabel}</span>
                                <svg width="20" height="20" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                                    <path d="M17 8L35 24L26 32L17 40" stroke="currentColor" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                            </div>

                            <div className="card-price">
                                {packageCard.pricePrefix && <span className="card-price-prefix">{packageCard.pricePrefix}</span>}
                                <b className="card-price-value">{packageCard.price}</b>
                                <button type="button">{packageCard.actionLabel}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
