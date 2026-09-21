import type { IContent } from '../types'

function ContentCard({
    image,
    name,
    title,
    description,
    rating,
    author,
}: Readonly<IContent>) {
    return (
        <div className="content-card">
            <img
                src={image}
                alt={name}
                className="content-card-image"
            />

            <h3 className="content-card-title">
                {title}
            </h3>

            <p className="content-card-description">
                {description}
            </p>

            <div className="content-card-meta">
                <span>
                    <span className="accent">★</span> {rating.toFixed(2)}
                </span>
                <span>{author}</span>
            </div>
        </div>
    )
}

export default ContentCard