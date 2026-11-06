import { useEffect, useRef, useState } from 'react'
import { interviewQuestions as questions, updatedOn, type InterviewLink, type InterviewQA } from '../../data/interview'
import { useScrollReveal } from '../../hooks/useScrollReveal'

type Message = { key: string; from: 'recruiter' | 'shreyas'; text: string; link?: InterviewLink }

const greeting: Message = { key: 'hello', from: 'shreyas', text: "Hi, I'm Shreyas 👋 Pick any question below and I'll answer it like a real interview." }
const updatedLabel = new Date(`${updatedOn}T00:00:00`).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })

const prefersReducedMotion = () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

export function Interview() {
  const { isVisible, revealRef } = useScrollReveal()
  const [messages, setMessages] = useState<Message[]>([greeting])
  const [asked, setAsked] = useState<string[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const chatRef = useRef<HTMLDivElement>(null)
  const timers = useRef<number[]>([])
  const counter = useRef(0)

  const isFinished = asked.length === questions.length && !isTyping

  useEffect(() => () => timers.current.forEach(clearTimeout), [])
  useEffect(() => { const chat = chatRef.current; if (chat) chat.scrollTop = chat.scrollHeight }, [messages, isTyping])

  const converse = (question: string, reply: string, link?: InterviewLink, answeredId?: string) => {
    const id = ++counter.current
    if (answeredId) setAsked((current) => (current.includes(answeredId) ? current : [...current, answeredId]))
    setMessages((current) => [...current, { key: `q-${id}`, from: 'recruiter', text: question }])
    setIsTyping(true)
    const delay = prefersReducedMotion() ? 0 : Math.min(1800, 600 + reply.length * 3)
    timers.current.push(window.setTimeout(() => {
      setMessages((current) => [...current, { key: `a-${id}`, from: 'shreyas', text: reply, link }])
      setIsTyping(false)
    }, delay))
  }

  const askPrepared = (qa: InterviewQA) => {
    if (isTyping || asked.includes(qa.id)) return
    converse(qa.question, qa.answer, qa.link, qa.id)
  }

  const restart = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
    setMessages([greeting])
    setAsked([])
    setIsTyping(false)
  }

  return (
    <section className={`section reveal ${isVisible ? 'is-visible' : ''}`} id="interview" aria-labelledby="interview-title" ref={revealRef}>
      <div className="section-heading">
        <p className="eyebrow">Interview me</p>
        <h2 id="interview-title">Skip the first round.</h2>
      </div>
      <p className="prose">Ask me the questions you'd ask in a first interview. Answers come straight from my real work.</p>

      <div className="card interview-panel">
        <div className="interview-bar">
          <span className="interview-live"><span className="interview-live-dot" aria-hidden="true" />Live interview</span>
          <span className="interview-who">
            <img src="/images/profile.jpg" alt="" width="28" height="28" />
            Shreyas Dewangswami
          </span>
          <span className="interview-count" aria-live="polite">{asked.length}/{questions.length} answered</span>
        </div>

        <div className="interview-chat" ref={chatRef} role="log" aria-live="polite" aria-label="Interview conversation">
          {messages.map((message) => (
            <div className={`interview-msg interview-msg--${message.from}`} key={message.key}>
              {message.from === 'shreyas' && <img className="interview-avatar" src="/images/profile.jpg" alt="" width="32" height="32" />}
              <div className="interview-bubble">
                <span className="interview-sender">{message.from === 'shreyas' ? 'Shreyas' : 'You'}</span>
                <p>{message.text}</p>
                {message.link && (
                  <a className="interview-link" href={message.link.href} {...(message.link.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                    {message.link.label} →
                  </a>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="interview-msg interview-msg--shreyas">
              <img className="interview-avatar" src="/images/profile.jpg" alt="" width="32" height="32" />
              <div className="interview-bubble interview-typing" aria-label="Shreyas is typing">
                <span /><span /><span />
              </div>
            </div>
          )}

          {isFinished && (
            <div className="interview-msg interview-msg--shreyas">
              <img className="interview-avatar" src="/images/profile.jpg" alt="" width="32" height="32" />
              <div className="interview-bubble">
                <span className="interview-sender">Shreyas</span>
                <p>That's the full round. Want the real interview? I'd love to talk.</p>
                <a className="interview-link" href="#contact">Let's schedule it →</a>
              </div>
            </div>
          )}
        </div>

        <div className="interview-questions">
          <p className="interview-prompt">{isFinished ? 'All questions answered.' : 'Ask a question:'}</p>
          <div className="interview-chip-row">
            {questions.map((qa) => {
              const done = asked.includes(qa.id)
              return (
                <button key={qa.id} type="button" className={`interview-chip ${done ? 'is-done' : ''}`} onClick={() => askPrepared(qa)} disabled={done || isTyping} aria-pressed={done}>
                  {done && <span aria-hidden="true">✓ </span>}{qa.question}
                </button>
              )
            })}
          </div>

          <div className="interview-footer">
            <span className="interview-updated">Answers updated {updatedLabel}</span>
            {messages.length > 1 && <button type="button" className="interview-restart" onClick={restart}>↺ Start over</button>}
          </div>
        </div>
      </div>
    </section>
  )
}
