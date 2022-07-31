import { createContext } from 'react'

export const inViewportHeight: Itinerary.ResizerFunction = ((value) => `${value}vh`)
export const inFontSize: Itinerary.ResizerFunction =
  ((value, type) => `${value / (type === 'height' ? 3.0 : 3.0)}rem`)

export const Resizer = createContext<Itinerary.ResizerFunction>(inViewportHeight)

