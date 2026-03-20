import { useState } from 'react'
import ImagePlaceholder from './ImagePlaceholder'

function buildImageAlt(tourName, index) {
    return `${tourName} image ${index + 1}`
}

function normalizeImagePath(src) {
    if (!src) {
        return null
    }

    const normalizedPath = src.startsWith('/') ? src : `/${src}`

    return /\.[a-zA-Z0-9]+$/.test(normalizedPath) ? normalizedPath : `${normalizedPath}.jpg`
}

function truncateBreadcrumbLabel(label, maxLength = 42) {
    if (!label || label.length <= maxLength) {
        return label
    }

    return `${label.slice(0, maxLength - 3).trimEnd()}...`
}

export default function TourHeroSection({ breadcrumbs, tour }) {
    const [galleryLoadState, setGalleryLoadState] = useState({
        failedImages: {},
        tourId: tour?.id ?? null,
    })
    const [mainImage, ...galleryImages] = tour?.images ?? []
    const lastBreadcrumbIndex = breadcrumbs.length - 1
    const failedGalleryImages = galleryLoadState.tourId === (tour?.id ?? null)
        ? galleryLoadState.failedImages
        : {}
    const visibleGalleryImages = galleryImages
        .slice(0, 4)
        .filter((image) => !failedGalleryImages[image])
    const visibleGalleryCount = visibleGalleryImages.length
    const hasIncompleteGallery = visibleGalleryImages.length < 4
    const heroBackgroundImage = normalizeImagePath(mainImage)
    const heroContainerStyle = hasIncompleteGallery && heroBackgroundImage
        ? { '--hero-backdrop-image': `url("${heroBackgroundImage}")` }
        : undefined

    function handleGalleryImageError(image) {
        setGalleryLoadState((current) => {
            const nextTourId = tour?.id ?? null
            const failedImages = current.tourId === nextTourId ? current.failedImages : {}

            if (failedImages[image]) {
                return current
            }

            return {
                failedImages: {
                    ...failedImages,
                    [image]: true,
                },
                tourId: nextTourId,
            }
        })
    }

    return (
        <section>
            <div className="experince-items">
                <div className="navigation">
                    {breadcrumbs.map((item, index) => (
                        <span className="breadcrumb-entry" key={`${item}-${index}`}>
                            <span
                                className={index === lastBreadcrumbIndex ? 'breadcrumb-current' : 'breadcrumb-item'}
                                title={index === lastBreadcrumbIndex ? item : undefined}
                            >
                                {index === lastBreadcrumbIndex ? truncateBreadcrumbLabel(item) : item}
                            </span>
                            {index < lastBreadcrumbIndex ? <span className="breadcrumb-separator">&gt;</span> : null}
                        </span>
                    ))}
                </div>
            </div>

            <div className="teamLab"><h1>{tour?.name}</h1></div>

            <div className="reviews-number">
                <div className="left-box">
                    {tour?.rating && (
                        <div className="rating">
                            <span><span className="strong-rating">{tour.rating}</span>/5</span>
                        </div>
                    )}

                    {tour?.reviews_count && <span className="under-line">{tour.reviews_count} reviews</span>}
                    {tour?.booked_count && <span>{tour.booked_count} booked</span>}

                    {tour?.location && (
                        <div className="location">
                            <svg width="16" height="16" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                                <path d="M42 21.0441C42 32.1335 30.6662 40.7078 25.9855 43.776C24.7669 44.5748 23.2331 44.5748 22.0145 43.776C17.3338 40.7078 6 32.1335 6 21.0441C6 11.0786 14.0589 3 24 3C33.9411 3 42 11.0786 42 21.0441Z" fill="transparent" stroke="#212121" strokeWidth="3.6"></path>
                                <circle cx="24" cy="20.5" r="6.5" fill="transparent" stroke="#212121" strokeWidth="3.6"></circle>
                            </svg>
                            <span className="under-line">{tour.location}</span>
                        </div>
                    )}
                </div>

                <div className="right-box">
                    <svg width="16" height="16" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                        <path fillRule="evenodd" clipRule="evenodd" d="M23.9958 43C13.6739 37.0282 3.12109 28.6115 3.00103 17.4814C3.00035 17.4292 3 17.3768 3 17.3244L3.00001 17.3102L3 17.2896C3.01825 11.0513 7.93247 6 13.9918 6C18.4391 6 22.2695 8.72111 24 12.6355C25.7305 8.72111 29.5609 6 34.0082 6C40.0788 6 45 11.0701 45 17.3244C45 17.512 44.9956 17.6984 44.9868 17.8837H44.9918C44.9918 28.9109 34.3769 37.1788 23.9958 43Z" fill="transparent" stroke="#212121" strokeWidth="3.6" strokeLinejoin="round"></path>
                    </svg>
                    <span>Save to wishlist</span>
                </div>
            </div>

            <div
                className={`image-container ${hasIncompleteGallery ? 'image-container--blurred-fill' : ''}`.trim()}
                style={heroContainerStyle}
            >
                <div className="img-main">
                    <ImagePlaceholder
                        alt={buildImageAlt(tour?.name ?? 'Tour', 0)}
                        className="tour-hero-image"
                        label="Main gallery image"
                        src={mainImage}
                    ></ImagePlaceholder>
                </div>

                {visibleGalleryCount > 0 ? (
                    <div className={`sub-image sub-image--count-${visibleGalleryCount}`.trim()}>
                        {visibleGalleryImages.map((image, index) => (
                            <div className="image-container" key={`${image}-${index}`}>
                                <ImagePlaceholder
                                    alt={buildImageAlt(tour?.name ?? 'Tour', index + 1)}
                                    className="tour-gallery-image"
                                    label={`Gallery image ${index + 2}`}
                                    onError={() => handleGalleryImageError(image)}
                                    src={image}
                                ></ImagePlaceholder>
                            </div>
                        ))}
                    </div>
                ) : null}

                <button className="see-all-btn" type="button">
                    <span>Gallery</span>
                </button>
            </div>

            <div className="sticky-price">
                <div className="price-in-page">
                    <div className="price-text">
                        <span className="price-caption">From </span>
                        <span className="price-value">{tour?.price ?? 'Check price'}</span>
                    </div>

                    <button className="select-options" type="button">Select options</button>
                </div>
            </div>
        </section>
    )
}
