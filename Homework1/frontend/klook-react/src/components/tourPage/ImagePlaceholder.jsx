import { useMemo, useState } from 'react'

function normalizeImagePath(src) {
    if (!src) {
        return null
    }

    const normalizedPath = src.startsWith('/') ? src : `/${src}`

    return /\.[a-zA-Z0-9]+$/.test(normalizedPath) ? normalizedPath : `${normalizedPath}.jpg`
}

export default function ImagePlaceholder({ alt, className = '', label, onError, src }) {
    const [hasLoadError, setHasLoadError] = useState(false)
    const normalizedPath = useMemo(() => normalizeImagePath(src), [src])

    if (!normalizedPath || hasLoadError) {
        return (
            <div className={`tour-image-fallback ${className}`.trim()} aria-label={alt} role="img">
                <span className="placeholder-label">{label ?? alt}</span>
                <small className="placeholder-path">{src ?? 'Image will be added later'}</small>
            </div>
        )
    }

    return (
        <img
            alt={alt}
            className={className}
            loading="lazy"
            onError={() => {
                setHasLoadError(true)
                onError?.()
            }}
            src={normalizedPath}
        />
    )
}
