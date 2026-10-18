const notionUrl = 'https://app.notion.com/p/Daily-Work-Log-3f85610e36078134ad8cd52ec8857b5e'

export function Journey() {
  return <div className="card journey-card" aria-labelledby="journey-title">
      <div>
        <p className="eyebrow">Current internship work</p>
        <h2 id="journey-title">What I&apos;m Working On</h2>
        <p>Currently working on full-stack business applications, with a focus on frontend development, REST API integration, and real-browser end-to-end testing using Playwright. Gaining hands-on experience with React, TypeScript, ASP.NET Core, and PostgreSQL.</p>
        <ul className="tag-list journey-tech-list" aria-label="Technologies in use"><li>React</li><li>TypeScript</li><li>ASP.NET Core</li><li>PostgreSQL</li><li>Playwright</li></ul>
        <div className="journey-log"><p className="journey-log-label">Explore My Detailed Work Log</p><p>Daily engineering activities, technical challenges, and ongoing learning.</p><a className="button button-primary" href={notionUrl} target="_blank" rel="noopener noreferrer">View My Work Log <span aria-hidden="true">↗</span></a></div>
      </div>
    </div>
}
