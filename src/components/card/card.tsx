import React from 'react'
import { Box } from '../box/box'
import { Translator, translatorBuilder } from '../translator/translator'
import { Resizer, inFontSize, inViewportHeight } from '../resizer/resizer'
import { DateTime } from './datetime/datetime'
import { Icon } from '../icon/icon'
import { Duration } from './summary/duration'
import { Segment } from './details/segment'
import { Specificities } from './summary/specificities'
import { Title } from './summary/title'
import { TravelTime } from './summary/travelTime'
import { NumberOfTravelers } from './summary/numberOfTravelers'
import { ArrivesOn } from './datetime/arrivesOn';
import { CO2Footprint } from './details/co2Footprint';
import { CheckinInstruction } from './details/checkinInstruction';
import { FareAndSalesConditions } from './details/fareAndSalesConditions';
import { Travelers } from './details/travelers'

type CardComponent = (props: Itinerary.Item) => JSX.Element
export const Card: CardComponent = ({
  productType, linkedTo, segments, specificity, openAfterLoad, checkinInstruction,
  fareAndSalesConditions, travelers, headOvalBorder, firstOne, lastOne, hasParent,
   tripType, googleMapsApiKey, translate, resizeInFontSize, supplierLogoFunction }) => (
    <Resizer.Provider value={resizeInFontSize ? inFontSize : inViewportHeight}>
      <Resizer.Consumer>{resize =>
        <Translator.Provider value={translatorBuilder(translate)}>
          <Translator.Consumer>{translate =>
            <Box.Main openAfterLoad={openAfterLoad}
              headOvalBorder={headOvalBorder}
              firstOne={firstOne} lastOne={lastOne}
              hasParent={hasParent}>
              <Box.Head additionalStyle={{ paddingTop: resize(3) }}>
                <Box.Column width={resize(3)}>
                  <Icon name={productType == 'HOTEL' ? 'hotels' :
                    productType === 'TRAIN' ? 'train' :
                      productType === 'CAR' ? 'cars' :
                        productType === 'FLIGHT' ? 'flights' :
                          productType === 'INSURANCE' ? 'shield' :
                            productType === 'GROUND' ? 'cabin' : 'luggagealt'}
                    style={{ fontSize: resize(4) }} />
                </Box.Column>
                <Box.Column>
                  <Title
                    forcedSupplierName={
                      !productType ? '<' + translate("Empty details") + '>' :
                        productType === 'INSURANCE' ?
                          (linkedTo || '').charAt(0).toUpperCase() + (linkedTo || '').substring(1).toLowerCase() +
                          ' ' + translate("Trip Protection") :
                          productType === 'GROUND' && segments && segments[0].supplier ?
                            segments[0].supplier.name :
                            productType === 'CAR' && segments && segments[0].supplier ?
                              segments[0].supplier.vehicle : undefined}
                    origin={segments && segments[0].origin}
                    destination={segments && segments.slice(-1)[0].destination || { code: '' }}
                    startDate={productType !== 'HOTEL' && productType !== 'CAR' ? undefined : segments && segments[0].start && segments[0].start.date}
                    endDate={productType !== 'HOTEL' && productType !== 'CAR' ? undefined : (segments && segments.slice(-1)[0].end || { date: undefined }).date}
                    nights={productType === 'HOTEL'} />
                </Box.Column>
              </Box.Head>
              {productType !== 'INSURANCE' && <Box.Row>
                <Box.Column width={resize(3)}>
                  &nbsp;
            </Box.Column>
                <Box.Column>
                  {productType === 'HOTEL' && <span>{segments && segments[0].supplier ? segments[0].supplier.name : ""}</span>}
                  {productType === 'CAR' && <span>{segments && segments[0].origin && segments[0].origin.name || ""} </span>}
                  {(productType === 'FLIGHT' || productType === 'TRAIN' || productType === 'GROUND') &&
                    <DateTime date={segments && segments[0].start && segments[0].start.date} />}
                  {productType && productType !== 'GROUND' && <Duration onlyTime={productType === 'FLIGHT' || productType === 'TRAIN'}
                                                                        outputDiff={productType !== 'HOTEL' && productType !== 'CAR'}
                                                                        start={segments && segments[0].start} end={segments && segments.slice(-1)[0].end} />}
                  {(productType === 'FLIGHT' || productType === 'TRAIN') && <TravelTime
                    start={segments && segments[0].start} end={segments && segments.slice(-1)[0].end}
                    stops={!segments ? 0 : segments.length - segments.filter(s => !s.origin).length} />}
                  <Specificities list={specificity ?? []} segments={segments}>
                    {segments && productType !== 'GROUND' &&
                      productType !== 'HOTEL' && productType !== 'CAR' && <li><ArrivesOn segments={segments} /></li>}
                    {!productType && <li>&lt;{translate("You need to specify a card type")}&gt;</li>}
                  </Specificities>
                </Box.Column>
                <Box.Column additionalStyle={{
                  alignSelf: 'end', flexGrow: 1, textAlign: 'right',
                  marginBottom: 0, marginTop: 'auto', minWidth: resize(7.8)
                }}>
                  {productType !== 'CAR' && productType !== 'GROUND' && <NumberOfTravelers number={(travelers ?? []).length} />}
                </Box.Column>
              </Box.Row>}
              {productType && productType !== 'GROUND' && 
                <Box.Details>
                  <hr style={{ width: '95%', margin: `${resize(0.5)} auto 0 auto` }} />
                  {productType === 'INSURANCE' &&
                    <Box.Row><Box.Column width={resize(3)}>&nbsp;</Box.Column>
                      <Box.Column><Specificities list={specificity ?? []} segments={segments}></Specificities>
                      </Box.Column></Box.Row>}
                  {(segments ?? []).map((segment, i) =>
                    <Segment index={(segments ?? []).filter(s => s.origin).indexOf(segment)} key={'segment-' + i}
                             segment={segment} type={productType} googleMapsApiKey={googleMapsApiKey} 
                             supplierLogoFunction={supplierLogoFunction}/>)}
                  {segments && productType !== 'HOTEL' && productType !== 'CAR' && <ArrivesOn segments={segments} buildRow={true} />}
                  {segments && productType !== 'HOTEL' && productType !== 'CAR' &&
                    <CO2Footprint segments={segments} type={productType} cardTripType={tripType} />}
                  {productType === 'HOTEL' && <CheckinInstruction checkinInstruction={checkinInstruction} />}
                  <FareAndSalesConditions
                    fareAndSalesConditions={fareAndSalesConditions} />
                  <Travelers travelers={travelers ?? []} />
                </Box.Details>}
            </Box.Main>
          }</Translator.Consumer>
        </Translator.Provider>
      }</Resizer.Consumer>
    </Resizer.Provider>
  )
