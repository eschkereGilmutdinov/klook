export default function TourHighlightsSection({ highlights, modalHighlights, isModalOpen, onOpenModal, onCloseModal }) {
    return (
        <section>
            <div className="highlights">
                <ul>
                    {highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                    ))}
                </ul>

                <div
                    className="see-more"
                    onClick={onOpenModal}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault()
                            onOpenModal()
                        }
                    }}
                    role="button"
                    tabIndex={0}
                >
                    See more 
                    
                    <svg width="20" height="20" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                        <path d="M17 8L35 24L26 32L17 40" stroke="#212121" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                </div>
            </div>

            <div className="modal-overlay" style={{ display: isModalOpen ? 'flex' : 'none' }}>
                <div className="modal">
                    <button className="close-btn" onClick={onCloseModal} type="button">×</button>
                    <h2>Highlights</h2>

                    <ul>
                        {modalHighlights.map((highlight) => (
                            <li key={highlight}>{highlight}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )
}
