import React from 'react'
import { Box } from '../../box/box'
import { DateTime } from '../datetime/datetime'
import { Icon } from '../../icon/icon'
import { Map } from './map'
import { diffDates } from '../datetime/DateTimeConverter';
import { colorGrayscale4, colorOrangeMed, layoverGrey, translucidBlack } from '../../colors/colors'
import { Translator } from '../../translator/translator'
import { Resizer } from '../../resizer/resizer'

type MapRowComponent = ({ index, segment, parentRef, googleMapsApiKey }: {
  index?: number, segment: Itinerary.Segment,
  parentRef?: React.RefObject<any>,
  googleMapsApiKey: string
}) => JSX.Element
type SegmentComponent = (props: SegmentProps) => JSX.Element
type SegmentProps = {
  index?: number, segment: Itinerary.Segment, type?: Itinerary.ProductType,
  detailsRef?: React.RefObject<any>, googleMapsApiKey?: string,
  supplierLogoFunction?: Itinerary.SupplierLogoFunction
}
type PlaceComponent = ({ place, dateTime, daysAfter, type }: {
  place?: Itinerary.Location, dateTime?: Itinerary.DateTime,
  daysAfter?: number, type?: Itinerary.ProductType,
  kind: 'START' | 'END'
}) => JSX.Element
type DurationComponent = ({ start, end, type }: {
  start: Itinerary.DateTime, end: Itinerary.DateTime, type?: Itinerary.ProductType,
  place?: Itinerary.Location
}) => JSX.Element
type LayoverComponent = ({ segment }: {
  segment: Itinerary.Segment
}) => JSX.Element
type SupplierInformationComponent = ({ details, type, supplierLogoFunction }: {
  details: Itinerary.SupplierInformation,
  type?: Itinerary.ProductType,
  supplierLogoFunction?: Itinerary.SupplierLogoFunction
}) => JSX.Element

const background = (height: string) => ({
  background:
    'linear-gradient(to bottom,transparent,transparent 50%,' + translucidBlack + ' 50%,' + translucidBlack + ')',
  backgroundSize: `2px ${height}`,
  backgroundRepeat: 'repeat-y'
})

const Place: PlaceComponent = ({ kind, type, place, dateTime, daysAfter }) =>
  <Resizer.Consumer>{resize =>
    <Translator.Consumer>{translate => <div>
      <Box.Row notPadded={true} additionalStyle={{
        fontSize: resize(3, 'height'), lineHeight: resize(9, 'height')
      }}>
        <Box.Column width={resize(1)} additionalStyle={{
          color: colorGrayscale4,
          marginLeft: resize(6.2)
        }}>&#9679;</Box.Column>
        <Box.Column>
          <div style={{ display: 'flex' }}>
            <div style={{
              width: (type === 'HOTEL' || type === 'CAR') ? resize(25) : resize(15),
              whiteSpace: 'nowrap'
            }}>
              <DateTime
                date={(type === 'HOTEL' || type === 'CAR') && dateTime?.date ? dateTime.date : undefined}
                time={type === 'HOTEL' || type === 'CAR' ? undefined : dateTime?.time} />
              {type !== 'HOTEL' && type !== 'CAR' && daysAfter && daysAfter > 0 ? <sup style={{
                color: colorOrangeMed,
                top: resize(-2),
                left: resize(-0.5),
                position: 'relative',
                width: 0,
                fontSize: resize(3, 'height'), fontWeight: 'bold'
              }}>+{daysAfter}</sup> : <span />}
            </div>
            {type !== 'HOTEL' && type !== 'CAR' && <div style={{ width: resize(2) }}></div>}
            {type !== 'HOTEL' && type !== 'CAR' && <div style={{ flexGrow: 1 }} className="truncate"
            >&nbsp;{place && place.cityName}, {place && place.name}</div>}
            {type !== 'HOTEL' && type !== 'CAR' && <div>{
              place && place.code && ` (${place && place.code})`}</div>}
            {(type === 'HOTEL' || type === 'CAR') && dateTime && dateTime.time &&
              <span>{kind === 'START' ? translate('from') : translate('until')} <DateTime time={dateTime.time} /></span>}
          </div>
        </Box.Column>
      </Box.Row>{
        kind === 'END' && (type === 'CAR' || type === 'HOTEL') && place?.address &&
        <Box.Row notPadded={true} additionalStyle={{ fontSize: resize(3, 'height'), lineHeight: resize(9, 'height') }}>
          <Box.Column width={resize(1)} additionalStyle={{
            color: colorGrayscale4,
            marginLeft: resize(6.2)
          }}>
            {type === 'HOTEL' && <Icon name={'location_on'} />}
          </Box.Column>
          <Box.Column>
            <div style={{ color: colorGrayscale4, lineHeight: resize(3, 'height'), fontSize: resize(3, 'height') }}>
              <br />{place.address}
            </div>
          </Box.Column>
        </Box.Row>}</div>}</Translator.Consumer>}</Resizer.Consumer>

const Duration: DurationComponent = ({ start, end, place, type }) => (
  <Resizer.Consumer>{resize => <Translator.Consumer>{translate => <Box.Row additionalStyle={{
    height: type === 'CAR' ? resize(12) : resize(6), paddingLeft: resize(7, 'height')
  }} notPadded={true}>
    <Box.Column additionalStyle={Object.assign({
      marginTop: resize(-4.5), marginBottom: resize(-4)
    }, background(resize(1.5, 'height')))}>
    </Box.Column>
    <Box.Column width={resize(1)} additionalStyle={{
      color: colorGrayscale4, alignSelf: 'center', fontSize: resize(3, 'height')
    }}>
      {type === 'CAR' && <div style={{
        color: colorGrayscale4, lineHeight: resize(3, 'height'), fontSize: resize(3, 'height'),
        marginTop: resize(6), marginBottom: '0'
      }}>
        <br />{place && place.address}
      </div>}
      <div style={type === 'CAR' ? { marginBottom: resize(6) } : {}}>
        {translate("Duration")}: <DateTime date={end.date} time={end.time} timezone={end.timezone}
          diffDate={start.date} diffTime={start.time} diffTimezone={start.timezone}
          diffPlusOneDay={type === 'CAR'} />
        {diffDates(end.date, start.date) !== 0 && type !== 'CAR' && type !== 'HOTEL' &&
          <span style={{ color: 'black' }}>
            <Icon style={{ marginLeft: resize(1.5), marginRight: resize(1.5) }}
              highlighted name={'nights_stay'} />{translate("Overnight")}
          </span>}</div>
    </Box.Column>
    <Box.Column>
    </Box.Column>
  </Box.Row>}</Translator.Consumer>}</Resizer.Consumer>)

const Layover: LayoverComponent = ({ segment }) => (
  !segment.destination ? <span /> : <Resizer.Consumer>{resize =>
    <Translator.Consumer>{translate => <Box.Row notPadded={true} additionalStyle={{
      backgroundColor: layoverGrey, fontSize: resize(3, 'height'), paddingTop: resize(3), paddingBottom: resize(3),
      marginLeft: resize(0.4)
    }}>
      <Box.Column width={resize(5.2)}>
        <Icon name='update' />
      </Box.Column>
      <Box.Column>
        {segment.end && segment.start &&
          <DateTime date={segment.end.date} diffDate={segment.start.date}
            time={segment.end.time} diffTime={segment.start.time}
            timezone={segment.end.timezone} diffTimezone={segment.start.timezone} />
        } {translate("layover in")} {segment.destination && segment.destination.cityName} {
          segment.destination && segment.destination.code && ` (${segment.destination && segment.destination.code})`
        }
      </Box.Column>
    </Box.Row>}</Translator.Consumer>}</Resizer.Consumer >)

const SupplierInformationView: SupplierInformationComponent = ({ details, type, supplierLogoFunction }) => (
  <Resizer.Consumer>{resize => <Translator.Consumer>{translate => <Box.Row notPadded={true} additionalStyle={{
    color: colorGrayscale4, alignSelf: 'center', fontSize: resize(3, 'height')
  }}>
    <Box.Column width={resize(6.2)} additionalStyle={{ marginRight: resize(2) }}>
      {details.code && <img src={supplierLogoFunction?.(type, details.code) ?? ""}
        alt={details.name} style={{ width: resize(3), height: resize(3, 'height') }} />}
    </Box.Column>
    <Box.Column>
      {[`${details.name} ${details.vendorTransitNumber || ''} ${details.operatingCompany ? ' ' + translate("operated by") + ' ' + details.operatingCompany : ''}`, details.cabinClass, details.vehicle]
        .concat(details.additionalFeatures ?? []).filter(e => e).join(' | ')}
      {(details.amenities ?? []).length > 0 && <br />}
      {(details.amenities ?? []).map((amenity, i) => <Icon style={{ marginRight: resize(3) }} key={i} name={amenity.icon} tooltip={<div>{amenity.text}</div>} />)}
    </Box.Column>
  </Box.Row>}</Translator.Consumer>}</Resizer.Consumer>)

const MapRow: MapRowComponent = ({ googleMapsApiKey, index, segment }) => (
  <Resizer.Consumer>{resize => 
    <Box.Details>
      <Box.Row notPadded={true}>
        <Box.Column width={resize(1)} additionalStyle={{
          color: colorGrayscale4,
          marginLeft: resize(6.2),
          alignItems: 'center',
          display: 'flex'
        }}>
          <Icon name={'map'} />
        </Box.Column>
        <Box.Column additionalStyle={{ width: '100%', overflow: 'hidden' }}>
          <Box.DetailsContext.Consumer>{detailsContext => <Map index={index}
            googleMapsApiKey={googleMapsApiKey}
            description={segment.origin && segment.destination &&
              `${segment.origin.cityName} to ${segment.destination.cityName}`}
            ratio={3} widthFunction={() => detailsContext.currentWidth?.[0] ?? 300}
            a={segment.origin!.coordinates!} b={segment.destination!.coordinates!} />}</Box.DetailsContext.Consumer></Box.Column></Box.Row>
    </Box.Details>}</Resizer.Consumer>)

export const Segment: SegmentComponent = ({ index, segment, type, detailsRef, googleMapsApiKey, supplierLogoFunction }) =>
(segment.origin || type === 'HOTEL' || type === 'CAR' ? <span>
  <Place kind='START' type={type} place={segment.origin || segment.destination} dateTime={segment.start} />
  {segment.start && segment.end &&
    <Duration start={segment.start} end={segment.end} place={segment.origin || segment.destination} type={type} />}
  <Place kind='END' type={type} place={segment.destination} dateTime={segment.end}
    daysAfter={segment.start && segment.end && diffDates(segment.end.date, segment.start.date)} />
  {segment.supplier && <SupplierInformationView details={segment.supplier} type={type} supplierLogoFunction={supplierLogoFunction} />}
  {type === 'FLIGHT' && googleMapsApiKey && segment?.origin?.coordinates && 
  segment?.destination?.coordinates && <MapRow googleMapsApiKey={googleMapsApiKey} index={index} segment={segment} parentRef={detailsRef} />}
</span> :
  <Layover segment={segment} />)
