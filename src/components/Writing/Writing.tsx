import { articlePath, articles, readingMinutes } from '../../data/articles'
import { useScrollReveal } from '../../hooks/useScrollReveal'

export function Writing() {
  const { isVisible, revealRef } = useScrollReveal()
  return (
    <section className={`section reveal ${isVisible ? 'is-visible' : ''}`} id="writing" aria-labelledby="writing-title" ref={revealRef}>
      <div className="section-heading">
        <p className="eyebrow">Writing</p>
        <h2 id="writing-title">Notes from the work.</h2>
      </div>
      <p className="prose">Short, practical articles on what I learn while building, testing and shipping software, from frontend and APIs to databases and pipelines. New writing will appear here.</p>
      <ul className="writing-list">
        {articles.map((article) => (
          <li key={article.slug}>
            <a className="writing-item" href={articlePath(article.slug)}>
              <span className="writing-category">{article.category}</span>
              <div className="writing-main">
                <h3>{article.title}</h3>
                <p className="writing-summary">{article.summary}</p>
              </div>
              <div className="writing-meta">
                <span>{readingMinutes(article)} min read</span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
