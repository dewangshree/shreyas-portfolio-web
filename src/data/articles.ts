/**
 * Articles shown in the Writing section and on /writing/<slug>.
 * Inline `code` in text blocks is rendered as <code>.
 */
export type ArticleBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'code'; code: string; caption?: string }
  | { type: 'callout'; text: string }

export type Article = {
  slug: string
  title: string
  category: string
  summary: string
  tags: string[]
  body: ArticleBlock[]
}

export const articles: Article[] = [
  {
    slug: 'react-ui-that-feels-professional',
    title: 'What Makes a React UI Feel Professional',
    category: 'Frontend',
    summary: 'Design tokens, honest component states, accessible interactions and respectful motion: the decisions behind the interface of this portfolio, with the actual code.',
    tags: ['React', 'TypeScript', 'CSS', 'Design Systems', 'Accessibility'],
    body: [
      { type: 'p', text: 'Two React apps can use the same components and the same libraries, and one still feels noticeably more polished. In my experience the difference is rarely the framework. It comes from a handful of decisions most users never see directly: how colours are defined, what a component shows while it waits, where keyboard focus goes, and how the layout behaves on a small screen.' },
      { type: 'p', text: 'This portfolio is built with React and TypeScript, so instead of general advice, here are the decisions I made while building it and the code behind each one.' },

      { type: 'h2', text: '1. Design tokens before components' },
      { type: 'p', text: 'The first thing I wrote was not a component. It was a set of colour tokens as CSS custom properties. Components never use a raw hex value; they ask for a role, like `--heading`, `--copy` or `--accent`.' },
      { type: 'code', caption: 'styles/index.css (shortened)', code: `:root {
  --page-bg: #f7f9fc;  --card-bg: #fff;
  --heading: #10243d;  --copy: #4b5d72;
  --accent: #1261ad;   --border: #d6e0eb;
}
:root[data-theme='dark'] {
  --page-bg: #081525;  --card-bg: #122b45;
  --heading: #f4f8fc;  --copy: #b4c4d6;
  --accent: #55a8f4;   --border: #284765;
}

.card { background: var(--card-bg); border: 1px solid var(--border); }` },
      { type: 'p', text: 'The payoff is that dark mode is not a feature I had to build into every component. Switching theme changes one attribute on the root element, and every card, button and tag follows. It also keeps the design consistent: when there are only a few named colours, it is hard to accidentally introduce a ninth shade of blue.' },

      { type: 'h2', text: '2. No flash of the wrong theme' },
      { type: 'p', text: 'A common bug with theme toggles: the page loads light, React starts, reads the saved preference, and then switches to dark. For a split second the user sees a white flash. It looks small, but it is exactly the kind of detail that makes an app feel unfinished.' },
      { type: 'p', text: 'The fix is to decide the theme before React runs at all, with a tiny inline script in `index.html`. React then reads the theme from the DOM instead of deciding it.' },
      { type: 'code', caption: 'index.html: runs before the React bundle loads', code: `<script>
  try {
    const theme = localStorage.getItem('portfolio-theme') || 'dark'
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
  } catch { /* storage can be blocked in private mode */ }
</script>` },
      { type: 'p', text: 'Setting `color-scheme` as well matters: it makes native parts of the page, like scrollbars and form controls, match the theme too.' },

      { type: 'h2', text: '3. Every async component has more than one state' },
      { type: 'p', text: 'Most UI that feels broken is UI that only designed the happy path. The Quote of the Day card calls my ASP.NET Core API, so it has three real states: loading, success and error. Each one is designed, and the error state has a way out, a Retry button, instead of a dead end.' },
      { type: 'p', text: 'In TypeScript I like modelling this as a discriminated union. It makes impossible combinations, like "loading and also has an error", impossible to write.' },
      { type: 'code', code: `type QuoteState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'success'; quote: Quote }

function QuoteCard({ state, onRetry }: { state: QuoteState; onRetry: () => void }) {
  switch (state.status) {
    case 'loading': return <p>Loading today's quote…</p>
    case 'error':   return <><p>Unable to load today's quote.</p><button onClick={onRetry}>Retry</button></>
    case 'success': return <blockquote>{state.quote.text}</blockquote>
  }
}` },
      { type: 'p', text: 'The card also has a fixed place in the layout in every state, so nothing below it jumps when the data arrives. Layout shift is one of the fastest ways to make a page feel cheap.' },
      { type: 'callout', text: 'Before calling a component done, I ask: what does it show while loading, when it fails, and when there is nothing to show? If the answer is "a blank space", it is not done.' },

      { type: 'h2', text: '4. Keep content out of the markup' },
      { type: 'p', text: 'The projects, interview answers and these articles are typed data arrays, and the components only decide how they look. Adding a project means adding an object, not copying a block of JSX and hoping the classes match.' },
      { type: 'code', code: `type Project = {
  name: string
  description: string
  technologies: Technology[]
  githubUrl?: string
  liveUrl?: string
}

{projects.map((project) => <ProjectCard key={project.name} project={project} />)}` },
      { type: 'p', text: 'This is the same separation of concerns I use on the backend, applied to the UI. It also makes the design more consistent, because every card goes through the same component and gets the same spacing, hover state and button order.' },

      { type: 'h2', text: '5. Accessibility is part of the design, not a final check' },
      { type: 'p', text: 'A professional interface works for people who do not use a mouse. A few rules I follow in every component:' },
      { type: 'list', items: [
        'Use the real element. A button is a `<button>`, a link is an `<a>`, a list is a `<ul>`. You get keyboard support and screen reader semantics for free.',
        'Announce async changes. The quote card uses `aria-live="polite"`, so a screen reader reads the quote once it loads.',
        'Manage focus in dialogs. When the "Schedule a conversation" dialog opens, focus moves to its close button; Escape closes it; and focus returns to the button that opened it, so keyboard users do not lose their place.',
        'Describe state. The theme toggle uses `aria-pressed` and a label that says what it will do: "Switch to light mode".',
        'Always show a visible focus outline. I style `:focus-visible` with the accent colour instead of removing it.',
      ] },

      { type: 'h2', text: '6. Motion that respects the user' },
      { type: 'p', text: 'Sections fade in as you scroll, using a small `useScrollReveal` hook built on `IntersectionObserver`. Animation adds polish, but some people get motion sickness from it, and operating systems let them turn it off. The hook checks that setting first and simply shows the content when motion is reduced.' },
      { type: 'code', code: `export function useScrollReveal() {
  const prefersReducedMotion =
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  const [isVisible, setIsVisible] = useState(
    () => prefersReducedMotion || !('IntersectionObserver' in window),
  )
  // ...observe the element and reveal it once it scrolls into view
}` },
      { type: 'p', text: 'The same rule applies in CSS: all keyframe animations live inside `@media (prefers-reduced-motion: no-preference)`, so they only run for people who are fine with them.' },

      { type: 'h2', text: '7. Responsive by content, not by device' },
      { type: 'p', text: 'Instead of designing separate layouts for "mobile" and "desktop", I let sizes scale between limits. Headings use `clamp()`, grids use `minmax(0, 1fr)` so long words cannot push a column wider than the screen, and only a couple of breakpoints change the layout itself.' },
      { type: 'code', code: `h2 { font-size: clamp(1.75rem, 3.5vw, 2.45rem); }

.project-grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
@media (max-width: 640px) {
  .project-grid { grid-template-columns: 1fr; }
}` },

      { type: 'h2', text: 'My checklist before a UI ships' },
      { type: 'list', items: [
        'Colours come from tokens, and the screen works in both light and dark themes.',
        'Every async view has a designed loading, error and empty state, without layout shift.',
        'Content lives in typed data; components only handle presentation.',
        'Everything works with a keyboard, focus is visible, and dialogs return focus.',
        'Animations are skipped when the user prefers reduced motion.',
        'Nothing scrolls sideways at 320px wide.',
      ] },
      { type: 'p', text: 'None of these are big features. They are small, deliberate decisions, and together they are what makes an interface feel like a product someone cared about rather than a page that happens to work.' },
    ],
  },
  {
    slug: 'aspnet-core-apis-easy-to-change',
    title: 'Building ASP.NET Core APIs That Stay Easy to Change',
    category: '.NET',
    summary: 'Thin controllers, DTOs instead of entities, predictable errors, careful EF Core queries and safe migrations: the habits that keep a .NET backend maintainable as it grows.',
    tags: ['.NET', 'ASP.NET Core', 'C#', 'EF Core', 'PostgreSQL', 'REST APIs'],
    body: [
      { type: 'p', text: 'Getting an ASP.NET Core endpoint to return data takes a few minutes. Keeping that API easy to change after it has thirty endpoints, a few real users and a frontend team depending on it is the actual work. Building services like the Quote of the Day API behind this portfolio and the TaskFlow employee management system, I kept running into the same lessons.' },
      { type: 'p', text: 'These are the habits I now apply from the first endpoint, each with the code that goes with it.' },

      { type: 'h2', text: '1. Keep controllers thin' },
      { type: 'p', text: 'A controller\'s job is HTTP: read the request, call something that does the work, and turn the result into a status code. When business rules and database queries live in the controller, they cannot be reused or tested without spinning up the web layer.' },
      { type: 'code', code: `[ApiController]
[Route("api/employees")]
public class EmployeesController(IEmployeeService employees) : ControllerBase
{
    [HttpGet("{id:int}")]
    public async Task<ActionResult<EmployeeDto>> Get(int id, CancellationToken ct)
    {
        var employee = await employees.GetAsync(id, ct);
        return employee is null ? NotFound() : Ok(employee);
    }
}` },
      { type: 'p', text: 'Two small details here are worth the habit. The route constraint `{id:int}` rejects bad input before my code runs. And passing the `CancellationToken` through means that if the browser cancels the request, the database query is cancelled too, instead of running for nobody.' },

      { type: 'h2', text: '2. Return DTOs, never entities' },
      { type: 'p', text: 'Returning EF Core entities straight from an API is tempting because it is less code. It also means every database column becomes part of your public contract, navigation properties can cause circular serialization, and a sensitive field added later leaks automatically.' },
      { type: 'p', text: 'A DTO is the shape the client actually needs. Projecting into it with `Select` has a second benefit: EF Core only queries the columns the DTO uses.' },
      { type: 'code', code: `public record EmployeeDto(int Id, string FullName, string Department);

public Task<EmployeeDto?> GetAsync(int id, CancellationToken ct) =>
    db.Employees
      .AsNoTracking()
      .Where(e => e.Id == id)
      .Select(e => new EmployeeDto(e.Id, e.FullName, e.Department.Name))
      .FirstOrDefaultAsync(ct);` },
      { type: 'p', text: '`AsNoTracking()` tells EF Core not to track these objects for changes, which is cheaper for read-only queries. And because the department name is selected inside the projection, it is fetched with a join in the same query, avoiding the classic N+1 problem of one extra query per row.' },

      { type: 'h2', text: '3. Validate at the edge' },
      { type: 'p', text: 'Invalid data should be rejected before it reaches business logic. With `[ApiController]`, ASP.NET Core validates request models automatically and returns a `400 Bad Request` with the field errors, without a single `if` in my action.' },
      { type: 'code', code: `public record CreateEmployeeRequest(
    [Required, StringLength(100)] string FullName,
    [Required, EmailAddress] string Email,
    [Range(1, int.MaxValue)] int DepartmentId);` },
      { type: 'p', text: 'Request models are separate from response DTOs on purpose. What a client may send and what it gets back are rarely the same shape. An `Id` or `CreatedAt` should never be accepted from the client.' },

      { type: 'h2', text: '4. Make errors predictable' },
      { type: 'p', text: 'A React frontend has to show something useful when the API fails. That is much easier when every error has the same shape. ASP.NET Core supports the standard Problem Details format (RFC 9457), and enabling it takes a few lines.' },
      { type: 'code', caption: 'Program.cs', code: `builder.Services.AddProblemDetails();

var app = builder.Build();
app.UseExceptionHandler();   // unhandled exceptions -> 500 Problem Details
app.UseStatusCodePages();    // empty 404/401 responses -> Problem Details` },
      { type: 'p', text: 'Now validation errors, missing resources and unexpected exceptions all return JSON with a `status`, `title` and `detail`, and stack traces never reach the client in production. The frontend needs one error handler instead of one per endpoint.' },
      { type: 'callout', text: 'A good API error answers three questions for the caller: what went wrong, is it my fault or the server\'s, and can I fix it by changing my request?' },

      { type: 'h2', text: '5. Treat configuration as environment-specific' },
      { type: 'p', text: 'Connection strings and secrets do not belong in `appsettings.json` in source control. Locally I use User Secrets; in containers and on Azure, environment variables. ASP.NET Core reads both through the same configuration API, so the code does not change between environments.' },
      { type: 'code', code: `// Program.cs reads the same key everywhere
var connection = builder.Configuration.GetConnectionString("Default");
builder.Services.AddDbContext<AppDbContext>(o => o.UseNpgsql(connection));

// Local:   dotnet user-secrets set "ConnectionStrings:Default" "Host=localhost;..."
// Docker:  ConnectionStrings__Default=Host=db;...` },
      { type: 'p', text: 'The same idea applies to CORS: the allowed frontend origin comes from configuration, so the React app on `localhost:5173` and the production domain are both allowed without hard-coding either.' },

      { type: 'h2', text: '6. Respect dependency injection lifetimes' },
      { type: 'p', text: 'One bug taught me to pay attention to service lifetimes. `DbContext` is registered as scoped: one instance per request. Injecting it, directly or indirectly, into a singleton means one context gets shared across every request, which leads to threading errors and stale data. A simple rule covers most cases:' },
      { type: 'list', items: [
        'Scoped for anything that touches the database or per-request state, including my services.',
        'Singleton only for stateless, thread-safe things like configuration wrappers or caches.',
        'A singleton must never depend on a scoped service.',
      ] },

      { type: 'h2', text: '7. Review every migration before it runs' },
      { type: 'p', text: 'EF Core migrations are generated code, and generated code can be wrong. Renaming a property can produce a drop column and an add column, which silently deletes data. I read every migration before committing it, and in a pipeline I apply an idempotent SQL script rather than letting the app migrate itself on startup.' },
      { type: 'code', code: `dotnet ef migrations add AddLeaveRequests
# read the generated Up() and Down() before committing

dotnet ef migrations script --idempotent -o migrate.sql
# the pipeline applies migrate.sql; safe to run more than once` },

      { type: 'h2', text: 'What I took away' },
      { type: 'list', items: [
        'Controllers handle HTTP; services handle the work.',
        'APIs return DTOs, projected in the query, never raw entities.',
        'Validation happens at the edge, with separate request and response models.',
        'Every error uses Problem Details, so the frontend handles errors one way.',
        'Configuration and secrets come from the environment, not source control.',
        'Lifetimes are deliberate, and migrations are reviewed like any other code.',
      ] },
      { type: 'p', text: 'None of this is about cleverness. A backend that is easy to change is one where each piece has a clear job, so the next feature, or the next developer, can find the right place to work without breaking something else.' },
    ],
  },
  {
    slug: 'flaky-playwright-tests',
    title: 'Flaky Playwright Tests Are Telling You Something',
    category: 'Testing',
    summary: 'What I learned making end-to-end tests reliable across a React frontend, an ASP.NET Core API and a PostgreSQL database, both locally and in CI.',
    tags: ['Playwright', 'E2E Testing', 'React', 'ASP.NET Core', 'CI/CD'],
    body: [
      { type: 'p', text: 'During my internship I have been writing real-browser end-to-end tests with Playwright for a full-stack business application: React and TypeScript on the frontend, an ASP.NET Core API behind it, and PostgreSQL underneath. The first version of the suite had a familiar problem. Tests passed on my machine, then failed in the pipeline. Re-run, and they passed again.' },
      { type: 'p', text: 'It is tempting to call that "flaky" and add a retry. What I learned is that a flaky test is almost never random. It is a test making an assumption about timing, data or environment that is only sometimes true. Here are the five fixes that made the biggest difference.' },

      { type: 'h2', text: '1. Stop sleeping, start asserting' },
      { type: 'p', text: 'My earliest tests waited with fixed delays. Two seconds is plenty on a fast laptop and not enough on a busy CI runner, so the same test both wastes time and fails.' },
      { type: 'code', caption: 'Before: guessing how long the UI needs', code: `await page.getByRole('button', { name: 'Save' }).click()
await page.waitForTimeout(2000)
expect(await page.locator('.toast').textContent()).toContain('Saved')` },
      { type: 'p', text: 'Playwright\'s web-first assertions retry automatically until the condition is true or the timeout runs out. The test now waits exactly as long as it needs to, and no longer.' },
      { type: 'code', caption: 'After: describing the outcome and letting Playwright wait', code: `await page.getByRole('button', { name: 'Save' }).click()
await expect(page.getByRole('status')).toHaveText(/Saved/)` },

      { type: 'h2', text: '2. Wait for the request that matters' },
      { type: 'p', text: 'Some failures happened because the UI updated optimistically before the API had finished writing to the database. The next step then read stale data. When a test depends on the backend having done its job, wait for that response explicitly, and check its status while you are there.' },
      { type: 'code', code: `const saved = page.waitForResponse(
  (res) => res.url().includes('/api/employees') && res.request().method() === 'POST',
)
await page.getByRole('button', { name: 'Add employee' }).click()
expect((await saved).status()).toBe(201)` },
      { type: 'p', text: 'Starting the wait before the click matters. If you start it after, a fast response can arrive before you are listening, and the test hangs until it times out.' },

      { type: 'h2', text: '3. Give every test its own data' },
      { type: 'p', text: 'The hardest failures to explain came from tests sharing one database. One test renamed a record that another test was looking for. Run them in a different order, or in parallel workers, and the results changed.' },
      { type: 'p', text: 'The fix was to make each test create the data it needs through the API, with a unique name, instead of relying on seed data or on a previous test. Setting up through the API is also much faster than clicking through the UI for every precondition.' },
      { type: 'code', code: `test('manager can approve a leave request', async ({ page, request }) => {
  const name = \`E2E Leave \${Date.now()}\`
  const res = await request.post('/api/leave-requests', { data: { name, days: 2 } })
  expect(res.ok()).toBeTruthy()

  await page.goto('/leave-requests')
  const row = page.getByRole('row', { name: new RegExp(name) })
  await row.getByRole('button', { name: 'Approve' }).click()
  await expect(row).toContainText('Approved')
})` },
      { type: 'callout', text: 'Rule I follow now: a test should pass when run alone, when run first, when run last and when run in parallel. If it cannot, it is depending on something it does not own.' },

      { type: 'h2', text: '4. Select elements the way a user finds them' },
      { type: 'p', text: 'Selectors like `.btn-primary > span` broke whenever someone changed styling, even though nothing a user would notice had changed. Role and label locators such as `getByRole` and `getByLabel` survive refactors and have a useful side effect: if a test cannot find a button by its accessible name, a screen reader user probably cannot either. The tests quietly pushed the frontend towards better accessibility.' },

      { type: 'h2', text: '5. Debug CI with traces, not guesses' },
      { type: 'p', text: 'A CI runner is a different machine: fewer CPU cores, a fresh database, no browser cache. Instead of trying to reproduce failures by hand, I configured Playwright to record a trace when a test is retried, and uploaded the report as a pipeline artifact.' },
      { type: 'code', caption: 'playwright.config.ts', code: `export default defineConfig({
  retries: process.env.CI ? 2 : 0,
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
})` },
      { type: 'p', text: 'Opening the trace shows every action, network call, console message and a DOM snapshot at each step. Most "random" failures became obvious within minutes. Retries stay on in CI, but a test that only passes on retry is reported as flaky, and I treat that as a bug to fix rather than a pass.' },

      { type: 'h2', text: 'What I took away' },
      { type: 'list', items: [
        'Assert on outcomes instead of waiting on time.',
        'Wait for the API response when the next step depends on the database.',
        'Each test owns its data and never depends on test order.',
        'Use role and label locators; they double as an accessibility check.',
        'Record traces in CI so failures can be read, not guessed at.',
      ] },
      { type: 'p', text: 'The bigger lesson for me was about the whole stack. Making the tests reliable meant understanding how the React state, the API and the database interact, and that understanding has made me a better developer on all three layers, not just a better test writer.' },
    ],
  },
]

export const findArticle = (slug: string) => articles.find((article) => article.slug === slug)

export const articlePath = (slug: string) => `/writing/${slug}`

export const readingMinutes = (article: Article) => {
  const words = article.body
    .flatMap((block) => (block.type === 'list' ? block.items : block.type === 'code' ? [block.code] : [block.text]))
    .join(' ')
    .split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}
