import React from 'react'
import { Icon } from '../../icon/icon'
import { Resizer } from '../../resizer/resizer'

export type SpecificitiesProps = {
  children?: React.ReactNode,
  list: { icon: string, text: string }[],
  segments?: Itinerary.Segment[]
}
export type SpecificitiesComponent = (props: SpecificitiesProps) => JSX.Element

export const Specificities: SpecificitiesComponent = ({ list, children }) => (
  <Resizer.Consumer>{resize => <ul style={{
    paddingLeft: '0',
    listStyleType: 'none', lineHeight: resize(6, 'height'), marginTop: resize(1.8),
    marginBottom: '0', fontSize: resize(3, 'height')
  }}>
    {list.map(({ icon, text }, i) => <li key={`specificity-${i}`}>
      <Icon style={{ marginRight: resize(1.5) }} highlighted name={icon} tooltip={<span>{text}</span>} /> {text}</li>)}
    {children}
  </ul>}</Resizer.Consumer>
)
