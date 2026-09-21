type Props = Readonly<{
  abstract: string
  setAbstract: (value: string) => void
  articleText: string
  setArticleText: (value: string) => void
  abstractError?: string
  articleTextError?: string
}>

function ArticlePost({ abstract, setAbstract, articleText, setArticleText, abstractError, articleTextError }: Props) {
  return (
    <>
      <div className="form-field">
        <label htmlFor="abstract">Abstract</label>
        <textarea
          id="abstract"
          value={abstract}
          onChange={(e) => setAbstract(e.target.value)}
          placeholder="Enter a 1-paragraph abstract"
          rows={3}
          className="form-control"
        />
        {abstractError && <p className="form-error">{abstractError}</p>}
      </div>
      <div className="form-field">
        <label htmlFor="articleText">Article Text</label>
        <textarea
          id="articleText"
          value={articleText}
          onChange={(e) => setArticleText(e.target.value)}
          placeholder="Enter the full article text"
          rows={8}
          className="form-control"
        />
        {articleTextError && <p className="form-error">{articleTextError}</p>}
      </div>
    </>
  )
}

export default ArticlePost