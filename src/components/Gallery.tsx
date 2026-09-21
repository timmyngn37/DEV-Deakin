interface IGalleryPic {
    src: string
    alt: string
}

const galleryPics: IGalleryPic[] = [
    { src: 'images/pic1.png', alt: 'maimai gameplay' },
    { src: 'images/pic2.png', alt: 'maimai with spectators' },
    { src: 'images/pic3.png', alt: 'Deakin University' },
    { src: 'images/pic4.png', alt: 'my cat pic' },
]

function Gallery() {
    return (
        <div id="photo" className="section">
            <h2 className="section-title">
                <span className="accent">$</span> open gallery/
            </h2>
            <div className="content-grid">
                {galleryPics.map((pic) => (
                    <img
                        key={pic.src}
                        src={pic.src}
                        alt={pic.alt}
                        className="gallery-image"
                    />
                ))}
            </div>
        </div>
    )
}

export default Gallery