import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'

const quote = {
  text: 'Simplicity is the soul of efficiency.',
  author: 'Austin Freeman',
  date: '2026-09-30',
  source: 'curated',
}

describe('portfolio', () => {
  beforeEach(() => vi.restoreAllMocks())

  it(
    'renders the full name',
    async () => {
      vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue({
          ok: true,
          json: async () => quote,
        }),
      )

      render(<App />)

      expect(
        screen.getByRole('heading', {
          name: 'Shreyas Vikrant Dewangswami',
        }),
      ).toBeInTheDocument()

      await screen.findByRole('blockquote')
    },
    15000,
  )

  it(
    'renders the project cards',
    async () => {
      vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue({
          ok: true,
          json: async () => quote,
        }),
      )

      render(<App />)

      expect(
        screen.getByRole('heading', {
          name: 'Developer Portfolio',
        }),
      ).toBeInTheDocument()

      await screen.findByRole('blockquote')
    },
    15000,
  )

  it('shows a loading state while the quote is requested', () => {
    vi.stubGlobal('fetch', vi.fn().mockReturnValue(new Promise(() => {})))

    render(<App />)

    expect(screen.getByText("Loading today's quote…")).toBeInTheDocument()
  })

  it('renders a successful quote response', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => quote,
      }),
    )

    render(<App />)

    expect((await screen.findByRole('blockquote')).textContent).toContain(
      quote.text,
    )

    expect(screen.getByText('— Austin Freeman')).toBeInTheDocument()
  })

  it('shows an error when the quote API fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')))

    render(<App />)

    expect(
      await screen.findByText("Unable to load today's quote."),
    ).toBeInTheDocument()
  })

  it('retries the quote API request', async () => {
    const fetchMock = vi
      .fn()
      .mockRejectedValueOnce(new Error('offline'))
      .mockResolvedValueOnce({
        ok: true,
        json: async () => quote,
      })

    vi.stubGlobal('fetch', fetchMock)

    render(<App />)

    expect(
      await screen.findByText("Unable to load today's quote."),
    ).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Retry' }))

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2))

    expect((await screen.findByRole('blockquote')).textContent).toContain(
      quote.text,
    )
  })

  it('switches between themes and persists the selected theme', () => {
    localStorage.clear()
    document.documentElement.dataset.theme = 'light'
    vi.stubGlobal('fetch', vi.fn().mockReturnValue(new Promise(() => {})))

    render(<App />)

    const toggle = screen.getByRole('button', { name: 'Switch to dark mode' })
    fireEvent.click(toggle)

    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(localStorage.getItem('portfolio-theme')).toBe('dark')
    expect(toggle).toHaveAttribute('aria-pressed', 'true')

    fireEvent.click(toggle)

    expect(document.documentElement.dataset.theme).toBe('light')
    expect(localStorage.getItem('portfolio-theme')).toBe('light')
  })

  it('opens accessible scheduling options and closes them with Escape', () => {
    vi.stubGlobal('fetch', vi.fn().mockReturnValue(new Promise(() => {})))
    render(<App />)

    const scheduleButton = screen.getByRole('button', { name: 'Schedule a Conversation' })
    expect(scheduleButton.closest('#contact')).not.toBeNull()
    expect(screen.getByRole('link', { name: 'Get in Touch' })).toHaveAttribute('href', 'tel:+919902585770')
    expect(screen.getByRole('link', { name: 'Email Me' })).toHaveAttribute('href', 'mailto:shreyasdewangswami17@gmail.com')
    expect(screen.getByRole('link', { name: /View My Work Log/i })).toHaveAttribute('href', 'https://app.notion.com/p/Daily-Work-Log-3f85610e36078134ad8cd52ec8857b5e')

    fireEvent.click(scheduleButton)
    expect(screen.getByRole('dialog', { name: 'Schedule a conversation' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Zoom/i })).toHaveAttribute('target', '_blank')
    expect(screen.getByRole('link', { name: /Zoom/i })).toHaveAttribute('rel', 'noopener noreferrer')

    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('copies the interview email address', async () => {
    vi.stubGlobal('fetch', vi.fn().mockReturnValue(new Promise(() => {})))
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.assign(navigator, { clipboard: { writeText } })
    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: 'Schedule a Conversation' }))
    fireEvent.click(screen.getByRole('button', { name: 'Copy Email' }))

    await waitFor(() => expect(writeText).toHaveBeenCalledWith('shreyasdewangswami17@gmail.com'))
    expect(screen.getByRole('button', { name: 'Copied' })).toBeInTheDocument()
  })
})
