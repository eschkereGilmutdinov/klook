export default function TourExploreSection({ sections }) {
    return (
        <section className="explore-more tour-explore-section">
            <h2 className="tour-explore-title">Explore more on Klook</h2>

            <div className="first-ativities">
                {sections.map((section) => (
                    <div className="tour-explore-group" key={section.title}>
                        <h3 className="tour-explore-group-title">{section.title}</h3>

                        <ul className={section.listClassName}>
                            {section.items.map((item, index) => (
                                <li key={item}>
                                    <span>{index + 1}</span>
                                    <p>{item}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    )
}
