import { createContext } from 'react'

export const defaultFunction: Itinerary.TranslateFunction = ((text) => text || '')

export const Translator = createContext<Itinerary.TranslateFunction>(defaultFunction)

export const translatorBuilder = (delegate?: Itinerary.TranslateFunction) => !delegate ? defaultFunction :
  (text?: string) => (delegate((text || '').replace(/[^A-Z]/gi, '_').replace(/_+/g, '_')) || '')
