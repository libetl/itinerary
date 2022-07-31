import React from 'react'
import { Box } from '../../box/box'
import { Icon } from '../../icon/icon'
import { colorGrayscale4 } from '../../colors/colors'
import { Translator } from '../../translator/translator'
import { Resizer } from '../../resizer/resizer'

type CheckinInstructionComponent = ({ checkinInstruction }: {
  checkinInstruction?: Itinerary.CheckinInstruction
}) => JSX.Element

export const CheckinInstruction: CheckinInstructionComponent = ({ checkinInstruction }) =>
  !checkinInstruction || !checkinInstruction.text ? <span /> : (
    <Resizer.Consumer>{resize => <Translator.Consumer>{translate => <div>
      <Box.Head additionalStyle={{ fontSize: resize(3, 'height'), lineHeight: resize(6, 'height') }}>
        <Box.Column width={resize(6)} additionalStyle={{ marginRight: resize(2) }}>
          <Icon style={{ marginRight: resize(1.5) }} name={'doorbell'} />
        </Box.Column>
        <Box.Column>
          {translate("Checkin instruction")}
        </Box.Column>
      </Box.Head>
      <Box.Row additionalStyle={{
        fontSize: resize(3, 'height'), lineHeight: resize(6, 'height'), paddingBottom: resize(3)
      }}>
        <Box.Column width={resize(3)}>
          &nbsp;
      </Box.Column>
        <Box.Column additionalStyle={{
          color: colorGrayscale4, fontSize: resize(3, 'height'),
          lineHeight: resize(4, 'height'), textAlign: 'justify'
        }}>
          {checkinInstruction.text}
        </Box.Column>
      </Box.Row>
    </div>}</Translator.Consumer>}</Resizer.Consumer>)
