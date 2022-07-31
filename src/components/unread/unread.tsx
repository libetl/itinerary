import React from 'react'
import { colorOrangeMed } from '../colors/colors'
import { Resizer } from '../resizer/resizer'

export const Unread: ({ count }: { count: number }) => JSX.Element = ({ count }) => count === 0 ? <span /> :
  <Resizer.Consumer>{resize => <div style={
    {
      position: 'absolute', zIndex: 1, marginTop: resize(-1), marginLeft: resize(2.5),
      backgroundColor: colorOrangeMed, color: 'white', textAlign: 'center', borderRadius: '100%',
      fontSize: resize(3, 'height'), width: resize(4), height: resize(4, 'height')
    }}>{count}</div>}</Resizer.Consumer>
