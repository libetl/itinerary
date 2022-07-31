import React from 'react'
import { Box } from '../../box/box'
import { Icon } from '../../icon/icon'
import { colorGrayscale4 } from '../../colors/colors'
import { Resizer } from '../../resizer/resizer'

type FareAndSalesConditionsComponent = ({ fareAndSalesConditions }: {
  fareAndSalesConditions?: Itinerary.FareAndSalesConditions
}) => JSX.Element

export const FareAndSalesConditions: FareAndSalesConditionsComponent = ({ fareAndSalesConditions }) =>
  !fareAndSalesConditions ? <span /> : (
    <Resizer.Consumer>{resize => <Box.Main onlyInternalLayout={true} openAfterLoad={fareAndSalesConditions.openAfterLoad}>
      <Box.Head additionalStyle={{ fontSize: resize(3, 'height'), lineHeight: resize(6, 'height') }}>
        <Box.Column width={resize(3)}>
          <Icon style={{ marginRight: resize(1.5) }} name={'info'} />
        </Box.Column>
        <Box.Column>
          {fareAndSalesConditions.title}
        </Box.Column>
      </Box.Head>
        <Box.Details>
          <Box.Row additionalStyle={{ fontSize: resize(3, 'height'), lineHeight: resize(6, 'height'), paddingBottom: resize(3) }}>
            <Box.Column width={resize(3)}>
              &nbsp;
      </Box.Column>
            <Box.Column additionalStyle={{
              color: colorGrayscale4, fontSize: resize(3, 'height'),
              lineHeight: resize(4, 'height'), textAlign: 'justify'
            }}>
              {fareAndSalesConditions.text}
            </Box.Column>
          </Box.Row>
        </Box.Details>
    </Box.Main>}</Resizer.Consumer>)

