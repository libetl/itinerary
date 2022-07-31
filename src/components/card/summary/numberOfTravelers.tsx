import React from 'react'
import { Icon } from '../../icon/icon'
import { colorGrayscale4 } from '../../colors/colors'
import { Resizer } from '../../resizer/resizer'

export type NumberOfTravelersProps = {
  number: number
}
export type NumberOfTravelersComponent = (props: NumberOfTravelersProps) => JSX.Element

export const NumberOfTravelers: NumberOfTravelersComponent = ({ number }) => number <= 0 ? <span /> : (
  <Resizer.Consumer>{resize => <span
    style={{
      color: colorGrayscale4, fontSize: resize(3, 'height')
    }}><Icon style={{ marginRight: resize(1.5) }} name={'group'} />x{number}</span>}</Resizer.Consumer>)
