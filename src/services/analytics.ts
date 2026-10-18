type Umami = { track: (eventName: string, data?: Record<string, string>) => void }

declare global { interface Window { umami?: Umami } }

/** Sends only project interaction names when an Umami site has been configured. */
export function trackProjectInteraction(project: string, destination: 'card' | 'github' | 'live') {
  window.umami?.track('project-click', { project, destination })
}
