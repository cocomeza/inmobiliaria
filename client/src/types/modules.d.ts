// Declaraciones de módulos para TypeScript
declare module 'aos' {
  interface AosOptions {
    offset?: number
    delay?: number
    duration?: number
    easing?: string
    once?: boolean
    mirror?: boolean
    anchorPlacement?: string
  }

  const aos: {
    init: (options?: AosOptions) => void
    refresh: () => void
    refreshHard: () => void
  }

  export = aos
}

declare module 'leaflet' {
  export * from 'leaflet'
}