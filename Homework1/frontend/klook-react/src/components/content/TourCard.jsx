import { useNavigate } from "react-router-dom";

function formatReviewsCount(count) {
    if (typeof count !== "number") {
        return null;
    }

    return count.toLocaleString("en-US");
}

function getSafeImageUrl(url) {
    let normalizedUrl = url.startsWith("/") ? url : `/${url}`;

    if (!/\.[a-zA-Z0-9]+$/.test(normalizedUrl)) {
        normalizedUrl = `${normalizedUrl}.jpg`;
    }

    return normalizedUrl;
}

export default function TourCard({ tour }) {
    const navigate = useNavigate();
    const tourPath = `/tour/${tour?.id}`;
    const hasRating = typeof tour?.rating?.score === "number";
    const reviewsCount = formatReviewsCount(tour?.rating?.reviews_count);
    const bookedText = tour?.rating?.booked_count_text;
    const primaryBadges = tour?.badges?.primary ?? [];
    const promoBadges = tour?.badges?.promotional ?? [];

    return (
        <article
            className="card"
            onClick={() => navigate(tourPath)}
            onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    navigate(tourPath);
                }
            }}
            role="link"
            tabIndex={0}
        >
            <button
                className="interesting"
                type="button"
                aria-label="Add to favorites"
                onClick={(event) => event.stopPropagation()}
            >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 21s-6.7-4.2-9.2-8.1C1.2 10.2 2 6.8 4.9 5.3c2.2-1.2 4.7-.4 6.1 1.2 1.4-1.6 3.9-2.4 6.1-1.2 2.9 1.5 3.7 4.9 2.1 7.6C18.7 16.8 12 21 12 21z" stroke="#fff" strokeWidth="1.8" />
                </svg>
            </button>

            <div className="media">
                <img src={getSafeImageUrl(tour?.image?.url)} alt={tour?.title ?? "Tour"} loading="lazy" />
            </div>

            <div className="card-body">
                <div className="meta-line">{[tour?.category, tour?.location].filter(Boolean).join(" • ")}</div>
                <div className="card-title">{tour?.title}</div>

                {primaryBadges.length > 0 && (
                    <div className="badges">
                        {primaryBadges.map((badge) => (
                            <span className="badge" key={badge}>{badge}</span>
                        ))}
                    </div>
                )}

                {(hasRating || bookedText) && (
                    <div className="rating">
                        {hasRating && <span className="star">★ {tour.rating.score.toFixed(1)}</span>}
                        {reviewsCount && <span>({reviewsCount})</span>}
                        {hasRating && bookedText && <span>•</span>}
                        {bookedText && <span className="booked">{bookedText}</span>}
                    </div>
                )}

                <div className="bottom-area">
                    <div className="price">
                        <span className="price-display">{tour?.price?.display_text}</span>
                        {tour?.price?.original_text && (
                            <span className="price-original">{tour.price.original_text}</span>
                        )}
                    </div>

                    {promoBadges.length > 0 && (
                        <div className="promo">
                            {promoBadges.map((badge, index) => (
                                <span className="promoww" key={`${badge}-${index}`}>{badge}</span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </article>
    );
}
