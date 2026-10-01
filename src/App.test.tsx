import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'

const quote = { text: 'Simplicity is the soul of efficiency.', author: 'Austin Freeman', date: '2026-09-30', source: 'curated' }

describe('portfolio', () => {
  beforeEach(() => vi.restoreAllMocks())

  it('renders the full name', () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => quote }))
    render(<App />)
    expect(screen.getByRole('heading', { name: 'Shreyas Vikrant Dewangswami' })).toBeInTheDocument()
  })

  it('renders the project cards', () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => quote }))
    render(<App />)
    expect(screen.getByRole('heading', { name: 'Developer Portfolio' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Task Management System' })).toBeInTheDocument()
  })

  it('shows a loading state while the quote is requested', () => {
    vi.stubGlobal('fetch', vi.fn().mockReturnValue(new Promise(() => {})))
    render(<App />)
    expect(screen.getByText("Loading today's quote…")).toBeInTheDocument()
  })

  it('renders a successful quote response', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => quote }))
    render(<App />)
    expect((await screen.findByRole('blockquote')).textContent).toContain(quote.text)
    expect(screen.getByText('— Austin Freeman')).toBeInTheDocument()
  })

  it('shows an error when the quote API fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')))
    render(<App />)
    expect(await screen.findByText("Unable to load today's quote.")).toBeInTheDocument()
  })

  it('retries the quote API request', async () => {
    const fetchMock = vi.fn().mockRejectedValueOnce(new Error('offline')).mockResolvedValueOnce({ ok: true, json: async () => quote })
    vi.stubGlobal('fetch', fetchMock)
    render(<App />)
    expect(await screen.findByText("Unable to load today's quote.")).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Retry' }))
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2))
    expect((await screen.findByRole('blockquote')).textContent).toContain(quote.text)
  })
})
