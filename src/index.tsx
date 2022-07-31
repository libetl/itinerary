import { Card } from './components/card/card';
import { Itinerary } from './components/itinerary'

export { Card } from './components/card/card'
export { Itinerary } from './components/itinerary'

(globalThis as any).Itinerary = Itinerary;
(globalThis as any).Card = Card;