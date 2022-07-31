import React from 'react'
import { diffDates } from '../datetime/DateTimeConverter';
import { colorSlateDark, blackFont } from '../../colors/colors'
import { Translator } from '../../translator/translator'
import { Resizer } from '../../resizer/resizer';

type TitleProps = {
  forcedSupplierName?: string, origin?: Itinerary.Location, destination: Itinerary.Location,
  startDate?: Itinerary.Date, endDate?: Itinerary.Date, nights?: boolean
}
type TitleComponent = (props: TitleProps) => JSX.Element
export const Title: TitleComponent = ({ origin, destination, forcedSupplierName, startDate, endDate, nights }) => (
  <Resizer.Consumer>{resize => <Translator.Consumer>{translate => <p style={{ margin: 0 }}>
    {forcedSupplierName ? <b>{forcedSupplierName}</b> :
      <span style={{ color: blackFont, fontSize: resize(3, 'height') }}>
        <b>{origin &&
          <span>{origin.cityName || origin.name}&nbsp;<span>{origin.code && `(${origin.code})`}</span>
            &nbsp;{translate("to")} </span>}
          {destination.cityName || destination.name}</b>
        <span>{destination.code && ` (${destination.code})`}
        </span>
      </span>}
    {startDate && endDate && <span style={{ color: colorSlateDark, fontSize: resize(3, 'height') }}>
      &nbsp;({nights ? diffDates(endDate, startDate) + ' ' + translate("night(s)") :
        (diffDates(endDate, startDate) + 1) + translate(' days(s)')})
    </span>}
  </p>}</Translator.Consumer>}</Resizer.Consumer>
)
