import { useCallback, useEffect, useState } from 'react'
import { getQuoteOfTheDay } from '../../services/quoteApi'
import type { Quote } from '../../types/quote'

type LoadState = 'loading' | 'success' | 'error'

export function QuoteOfTheDay() {
  const [state, setState] = useState<LoadState>('loading')
  const [quote, setQuote] = useState<Quote | null>(null)

  const loadQuote = useCallback(async () => {
    setState('loading')
    try {
      setQuote(await getQuoteOfTheDay())
      setState('success')
    } catch {
      setQuote(null)
      setState('error')
    }
  }, [])

  useEffect(() => { void loadQuote() }, [loadQuote])

  return <section className="section section-muted" id="quote" aria-labelledby="quote-title"><div className="section-heading"><p className="eyebrow">Quote of the Day</p><h2 id="quote-title">A small idea for the day.</h2></div><div className="quote-card card" aria-live="polite">{state === 'loading' && <p>Loading today&apos;s quote…</p>}{state === 'error' && <><p>Unable to load today&apos;s quote.</p><button className="button button-secondary" type="button" onClick={() => void loadQuote()}>Retry</button></>}{state === 'success' && quote && <><blockquote>“{quote.text}”</blockquote><p className="quote-author">— {quote.author}</p><p className="quote-date">UTC date: {quote.date}</p></>}</div></section>
}
