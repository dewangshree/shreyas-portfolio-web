import type { Quote } from '../types/quote'

export async function getQuoteOfTheDay(signal?: AbortSignal): Promise<Quote> {
  const response = await fetch('/api/quotes/today', { signal })

  if (!response.ok) {
    throw new Error(`Quote request failed with status ${response.status}`)
  }

  return response.json() as Promise<Quote>
}
