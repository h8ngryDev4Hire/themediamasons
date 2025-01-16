// Global window event declarations
declare global {
  interface WindowEventMap {
    openContactForm: CustomEvent;
    closeContactForm: CustomEvent;
  }
}

export * as Core from './core'
export * as Routes from './routes'
export * as Sanity from './sanity'
export * as UserContent from './user-content'
