import type { Quote } from '../types/quote'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') ?? ''

export async function getQuoteOfTheDay(signal?: AbortSignal): Promise<Quote> {
  const response = await fetch(`${apiBaseUrl}/api/quotes/today`, { signal })

  if (!response.ok) {
    throw new Error(`Quote request failed with status ${response.status}`)
  }

  return response.json() as Promise<Quote>
}
