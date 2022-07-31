import React from 'react'
import { DateTime } from '../datetime/datetime'
import { colorSlateMed } from '../../colors/colors'
import { Translator } from '../../translator/translator'
import { Resizer } from '../../resizer/resizer'

export type TravelTimeProps = {
  start?: Itinerary.DateTime,
  end?: Itinerary.DateTime,
  stops?: number
}
export type TravelTimeComponent = (props: TravelTimeProps) => JSX.Element

export const TravelTime: TravelTimeComponent = ({ start, end, stops }) => (
  <Resizer.Consumer>{resize => <Translator.Consumer>{translate =>
    <p style={{ color: colorSlateMed, fontSize: resize(3, 'height') }}>
      {translate("Travel time")} : {start && end &&
        <DateTime date={end.date} time={end.time} timezone={end.timezone}
          diffDate={start.date} diffTime={start.time}
          diffTimezone={start.timezone} />}&nbsp;{stops && `(${stops} ` + translate("stop(s)") + ')'}</p>
  }</Translator.Consumer>}</Resizer.Consumer>
)
