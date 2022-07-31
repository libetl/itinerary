import React from 'react'
import { Box } from '../../box/box'
import { Icon } from '../../icon/icon'
import { dateAsText, diffDates } from './DateTimeConverter';
import { Translator } from '../../translator/translator'
import { Resizer } from '../../resizer/resizer'

type ArrivesOnComponent = ({ segments, buildRow }: {
  segments?: Itinerary.Segment[],
  buildRow?: boolean
}) => JSX.Element

const arrives: (segments: Itinerary.Segment[], translate: Itinerary.TranslateFunction) => string =
  (segments, translate) =>
    `${diffDates(segments.slice(-1)[0].end!.date, segments[0].start!.date) === 1 ?
      ' ' + translate("the next day") + ' ' :
      `${diffDates(segments.slice(-1)[0].end!.date, segments[0].start!.date)} `
      + translate("days after") + ' ' + translate("on") + ' '}
  ${dateAsText(segments.slice(-1)[0].end!.date)}`

export const ArrivesOn: ArrivesOnComponent = ({ segments, buildRow }) =>
  (!segments || !segments[0].start || !segments.slice(-1)[0]) ||
    diffDates(segments.slice(-1)[0].end!.date, segments[0].start.date) <= 0 ? <span /> :
    buildRow ?
      <Resizer.Consumer>{resize => <Translator.Consumer>{translate =>
        <Box.Row additionalStyle={{ fontSize: resize(3, 'height'), lineHeight: resize(6, 'height') }}>
          <Box.Column width={resize(3)}>
            <Icon style={{ marginRight: resize(1.5) }} highlighted name={'nights_stay'} />
          </Box.Column>
          <Box.Column>
            {translate("Arrives")} {arrives(segments, translate)}
          </Box.Column>
        </Box.Row>}</Translator.Consumer>}</Resizer.Consumer> :
      <Resizer.Consumer>{resize => <Translator.Consumer>{translate =>
        <span><Icon style={{ marginRight: resize(1.5) }}
          highlighted name={'nights_stay'} />
          {translate("Arrives")} {arrives(segments, translate)}
        </span>}</Translator.Consumer>}</Resizer.Consumer>

