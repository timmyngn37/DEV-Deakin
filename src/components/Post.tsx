import { useState } from 'react'
import { z } from 'zod'
import QuestionPost from './QuestionPost'
import ArticlePost from './ArticlePost'

// Validation schema using zod
const postSchema = z.object({
    postType: z.enum(['question', 'article']),
    title: z.string().min(1, 'Title is required'),
    description: z.string().optional(),
    abstract: z.string().optional(),
    articleText: z.string().optional(),
    tags: z.string().optional(),
}).superRefine((data, ctx) => {
    // description only required when postType is 'question'
    if (data.postType === 'question' && !data.description?.trim()) {
        ctx.addIssue({
            code: 'custom',
            message: 'Description is required',
            path: ['description'],
        })
    }
    // abstract & articleText only required when postType is 'article'
    if (data.postType === 'article') {
        if (!data.abstract?.trim()) {
            ctx.addIssue({
                code: 'custom',
                message: 'Abstract is required',
                path: ['abstract'],
            })
        } else if (data.abstract.includes('\n')) {
            ctx.addIssue({
                code: 'custom',
                message: 'Abstract must be a single paragraph (no line breaks)',
                path: ['abstract'],
            })
        }
        if (!data.articleText?.trim()) {
            ctx.addIssue({
                code: 'custom',
                message: 'Article text is required',
                path: ['articleText'],
            })
        }
    }
    // tags: optional, but if provided, max 3 tags
    if (data.tags && data.tags.trim().length > 0) {
        const tagList = data.tags.split(',').map((t) => t.trim()).filter(Boolean)
        if (tagList.length > 3) {
            ctx.addIssue({
                code: 'custom',
                message: 'Please add up to 3 tags only',
                path: ['tags'],
            })
        }
    }
})

// Function to handle post submission and validation
function handlePost(
    postType: 'question' | 'article',
    title: string,
    description: string,
    abstract: string,
    articleText: string,
    tags: string,
    setErrors: (errors: Record<string, string>) => void
) {
    const result = postSchema.safeParse({
        postType,
        title,
        description,
        abstract,
        articleText,
        tags,
    })
    // If validation fails, set the errors state with the validation messages
    if (!result.success) {
        const fieldErrors: Record<string, string> = {}
        result.error.issues.forEach((issue) => {
            const field = issue.path[0] as string
            fieldErrors[field] = issue.message
        })
        setErrors(fieldErrors)
        return
    }
    // If validation passes, clear the errors and proceed with post submission logic
    setErrors({})
    alert('Post Received')
}

function Post() {
    // State variables
    const [postType, setPostType] = useState<'question' | 'article'>('question')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [abstract, setAbstract] = useState('')
    const [articleText, setArticleText] = useState('')
    const [tags, setTags] = useState('')
    const [errors, setErrors] = useState<Record<string, string>>({})
    return (
        <div className="post-page">
            {/* Header */}
            <div className="post-header">New Post</div>
            {/* Post type selector */}
            <div className="post-type">
                <span>Select Post Type:</span>
                <label>
                    <input
                        type="radio"
                        name="postType"
                        checked={postType === 'question'}
                        onChange={() => setPostType('question')}
                    />
                    <span>Question</span>
                </label>
                <label>
                    <input
                        type="radio"
                        name="postType"
                        checked={postType === 'article'}
                        onChange={() => setPostType('article')}
                    />
                    <span>Article</span>
                </label>
            </div>
            {/* Section header */}
            <div className="post-header">What do you want to ask or share
            </div>

            <div className="post-content">
                {/* Title */}
                <div className="form-field">
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder={
                    postType === 'question'
                        ? 'Start your question with how, what, why, etc.'
                        : 'Enter a descriptive title'
                    }
                    className="form-control"
                />
                {errors.title && (
                    <p className="form-error">{errors.title}</p>
                )}
                </div>
                {/* Conditional rendering based on postType */}
                {postType === 'question' ? (
                    <QuestionPost
                        description={description}
                        setDescription={setDescription}
                        error={errors.description}
                    />
                ) : (
                    <ArticlePost
                        abstract={abstract}
                        setAbstract={setAbstract}
                        articleText={articleText}
                        setArticleText={setArticleText}
                        abstractError={errors.abstract}
                        articleTextError={errors.articleText}
                    />
                )}
                {/* Tags*/}
                <div className="form-field">
                <label htmlFor="tags">Tags</label>
                <input
                    type="text"
                    id="tags"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder={`Please add up to 3 tags to describe what your ${postType} is about e.g., Java`}
                    className="form-control"
                />
                {errors.tags && (
                    <p className="form-error">{errors.tags}</p>
                )}
                </div>
                {/* Post button */}
                <div className="post-actions">
                    <button
                        type="button"
                        onClick={() => handlePost(postType, title, description, abstract, articleText, tags, setErrors)}
                        className="button-primary"
                    >
                        Post
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Post