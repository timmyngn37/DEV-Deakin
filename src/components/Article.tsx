import type { IContent } from '../types'
import ContentCard from './ContentCard'

const articles: IContent[] = [
    {
        image: "images/article1.png",
        name: "maimai bg",
        title: "How maimai inspires me?",
        description: "Welcome to maimai!",
        rating: 3.67,
        author: "Timmy",
    },
    {
        image: "images/article2.png",
        name: "IT Student Academy",
        title: "Welcome to the IT Student Academy~",
        description: "Thank you :)",
        rating: 5.00,
        author: "Aaron",
    },
    {
        image: "images/article3.png",
        name: "Mathematics Yearbook 2025",
        title: "Mathematics Yearbook 2025 is soon to be published",
        description: "Exploring relations from Peirce's theory of sign",
        rating: 4.99,
        author: "Julien and Simon",
    }
]

function Article() {
    return (
        <div id="articles" className="section">
            <h2 className="section-title">
                <span className="accent">$</span> read articles/
            </h2>
            <div className="content-grid">
                {articles.map((article) => (
                    <ContentCard
                        key={article.title}
                        image={article.image}
                        name={article.name}
                        title={article.title}
                        description={article.description}
                        rating={article.rating}
                        author={article.author}
                    />
                ))}
            </div>
        </div>
    )
}

export default Article