import React from 'react'
import { diffDateTimes, diffDates, datetimeAsText, dateAsText, timeAsText } from './DateTimeConverter';

export type DateTimeProps = {
  date?: Itinerary.Date, time?: Itinerary.Time,
  diffDate?: Itinerary.Date, diffTime?: Itinerary.Time, additionalStyles?: any,
  timezone?: string,
  diffTimezone?: string,
  diffPlusOneDay?: boolean
  dontDisplayYears?: boolean
}
export type DateTimeComponent = (props: DateTimeProps) => JSX.Element

export const DateTime: DateTimeComponent =
  ({ diffDate, diffTime, diffPlusOneDay, date, time, diffTimezone, timezone, dontDisplayYears, additionalStyles }) =>
    (<span style={additionalStyles}>{
      (date && time && diffDate && diffTime) ?
        diffDateTimes(date, diffDate, time, diffTime, timezone, diffTimezone, diffPlusOneDay) :
        (date && diffDate) ?
          diffDates(date, diffDate, diffPlusOneDay) :
          (date && time) ?
            datetimeAsText(date, time, timezone) :
            date ? dateAsText(date, undefined, dontDisplayYears) :
              time ? timeAsText(time, timezone, diffTimezone) : ''}</span>)
