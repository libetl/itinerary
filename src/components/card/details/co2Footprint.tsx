import React from 'react'
import { Box } from '../../box/box'
import { Icon } from '../../icon/icon'
import { diffDates } from '../datetime/DateTimeConverter';
import { FlightCO2Calculator } from './flightCo2Calculator';
import { colorGrayscale4, colorFootprint } from '../../colors/colors';
import { Translator } from '../../translator/translator'
import { Resizer } from '../../resizer/resizer'

type CO2FootprintComponent = ({ segments, type, cardTripType }: {
  segments?: Itinerary.Segment[],
  type?: Itinerary.ProductType,
  cardTripType?: Itinerary.CardTripType
}) => JSX.Element

const footprintOf: (segments: Itinerary.Segment[], type?: Itinerary.ProductType,
  cardTripType?: Itinerary.CardTripType) => JSX.Element = (segments, type, cardTripType) => {
    if (type === 'FLIGHT' && cardTripType) {
      const value = segments
        .filter(segment => segment.origin && segment.origin.coordinates &&
          segment.destination && segment.destination.coordinates &&
          segment.supplier && segment.supplier.classCode)
        .map(segment => FlightCO2Calculator.calculate(
          segment.origin!.coordinates!,
          segment.destination!.coordinates!,
          cardTripType,
          segment.supplier!.classCode!))
        .reduce((acc, value) => acc + value, 0)
      return <span style={{ fontWeight: 'bold', color: value === 0 ? colorGrayscale4 : colorFootprint }}>{
        value === 0 ? 'unknown' : `${`${value}`.substring(0,
          Math.min(`${value}`.length,
            `${value}`.indexOf('.') === -1 ? `${value}`.length : `${value}`.indexOf('.') + 4))}t`}</span>
    }
    return <span style={{ fontWeight: 'bold', color: colorGrayscale4 }}>unknown</span>
  }

export const CO2Footprint: CO2FootprintComponent = ({ segments, type, cardTripType }) =>
  (!segments || !segments[0].start || !segments.slice(-1)[0]) ||
    diffDates(segments.slice(-1)[0].end!.date, segments[0].start.date) < 0 ? <span /> :
    <Resizer.Consumer>{resize => <Translator.Consumer>{translate => <Box.Row additionalStyle={{ fontSize: resize(3, 'height'), lineHeight: resize(6, 'height') }}>
      <Box.Column width={resize(3)}>
        <Icon style={{ marginRight: resize(1.5) }} highlighted name={'eco'} />
      </Box.Column>
      <Box.Column additionalStyle={{ lineHeight: resize(4, 'height') }}>
        <span>{translate("Total CO2 footprint")}: {footprintOf(segments, type, cardTripType)}<br />
          <span style={{ color: colorGrayscale4, fontSize: resize(3, 'height') }}>{translate("Based on the transport mode you are using")}</span></span>
      </Box.Column>
    </Box.Row>}</Translator.Consumer>}</Resizer.Consumer>

