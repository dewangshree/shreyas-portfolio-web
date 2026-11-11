import { useEffect, type ReactNode } from 'react'
import { readingMinutes, type Article, type ArticleBlock } from '../../data/articles'

/** Renders `inline code` spans inside plain text. */
function renderInline(text: string): ReactNode[] {
  return text.split(/(`[^`]+`)/).map((part, index) =>
    part.startsWith('`') && part.endsWith('`') ? <code key={index}>{part.slice(1, -1)}</code> : part,
  )
}

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case 'h2': return <h2>{block.text}</h2>
    case 'p': return <p>{renderInline(block.text)}</p>
    case 'list': return <ul>{block.items.map((item) => <li key={item}>{renderInline(item)}</li>)}</ul>
    case 'callout': return <aside className="article-callout"><p>{renderInline(block.text)}</p></aside>
    case 'code': return <figure className="article-code">{block.caption && <figcaption>{block.caption}</figcaption>}<pre><code>{block.code}</code></pre></figure>
  }
}

export function ArticlePage({ article }: { article: Article }) {
  useEffect(() => {
    const previousTitle = document.title
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    const previousDescription = description?.content
    document.title = `${article.title} | Shreyas Vikrant Dewangswami`
    if (description) description.content = article.summary
    return () => {
      document.title = previousTitle
      if (description && previousDescription !== undefined) description.content = previousDescription
    }
  }, [article])

  return (
    <article className="section article-page" id="top" aria-labelledby="article-title">
      <a className="article-back" href="/#writing"><span aria-hidden="true">←</span> All writing</a>
      <header className="article-header">
        <p className="eyebrow">{article.category}</p>
        <h1 id="article-title">{article.title}</h1>
        <p className="article-summary">{article.summary}</p>
        <p className="article-meta">
          <span>Shreyas Vikrant Dewangswami</span>
          <span>{readingMinutes(article)} min read</span>
        </p>
        <ul className="tag-list" aria-label="Topics">{article.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
      </header>
      <div className="article-body">{article.body.map((block, index) => <Block key={index} block={block} />)}</div>
      <footer className="article-end">
        <p>Thanks for reading. If you are working on something similar, I would be glad to talk about it.</p>
        <div className="button-row">
          <a className="button button-primary" href="/#contact">Get in touch</a>
          <a className="button button-secondary" href="/#writing">More writing</a>
        </div>
      </footer>
    </article>
  )
}
