import React from 'react'
import { DateTime } from '../datetime/datetime'
import { Icon } from '../../icon/icon'
import { diffDates } from '../datetime/DateTimeConverter'
import { colorOrangeMed } from '../../colors/colors'
import { Translator } from '../../translator/translator'
import { Resizer } from '../../resizer/resizer'

export type DurationProps = { onlyTime: boolean, outputDiff?: boolean, start?: Itinerary.DateTime, end?: Itinerary.DateTime }
export type DurationComponent = (props: DurationProps) => JSX.Element

export const Duration: DurationComponent = ({ onlyTime, start, end, outputDiff }) => (
  <Resizer.Consumer>{resize => <Translator.Consumer>{translate => <div>
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div style={{ width: onlyTime ? resize(22) : resize(26), height: resize(6, 'height') }}>{onlyTime ? start &&
        <DateTime time={start.time} /> : start && <DateTime date={start.date} dontDisplayYears={true} />}&nbsp;</div>
      <div style={{ width: resize(6), height: resize(6, 'height') }}><Icon name="arrow_forward" />&nbsp;</div>
      <div style={{ width: resize(22), height: resize(6, 'height'), textAlign: 'left' }}>{onlyTime ? end &&
        <DateTime time={end.time} /> : end && <DateTime date={end.date} dontDisplayYears={true} />}
        {outputDiff && start && end && diffDates(end.date, start.date) > 0 && <sup style={{
          color: colorOrangeMed, position: 'relative', top: resize(-1.5),
          fontSize: resize(3, 'height'), fontWeight: 'bold'
        }}>+<DateTime date={end.date} diffDate={start.date} /></sup>}</div></div>
    {onlyTime && start && start.timezone && end && end.timezone && start.timezone != end.timezone &&
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{
          minWidth: onlyTime ? resize(28) : resize(32),
          fontSize: resize(3, 'height'), wordSpacing: '0', marginTop: resize(0.75)
        }}>{translate("In our timezone")} : </div>
        <div style={{ minWidth: resize(20), textAlign: 'left' }}>
          <DateTime time={end.time} timezone={start.timezone} diffTimezone={end.timezone} />
        </div>
      </div>}
  </div>
  }</Translator.Consumer>}</Resizer.Consumer>
)
