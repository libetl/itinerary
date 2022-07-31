import React, { Component, createRef } from 'react'
import { Tooltip } from '../box/tooltip'
import { colorFootprint, colorOrangeMed, colorGrayscale4 } from '../colors/colors';
import { Resizer } from '../resizer/resizer';


export class Icon extends Component<{ style?: any, highlighted?: boolean, name: string, tooltip?: React.ReactNode }> {
  iconRef: React.RefObject<HTMLElement>;
  constructor(props: { style?: any, highlighted?: boolean, name: string, tooltip?: React.ReactNode }) {
    super(props);
    this.iconRef = createRef();
  }

  render() {
    return <Resizer.Consumer>{resize => {
      const { style, highlighted, name, tooltip } = this.props;
      const consolidatedStyle = name === 'check' && highlighted ?
        Object.assign({}, style, {
          color: 'white', backgroundColor: colorFootprint, borderRadius: '50%',
          width: resize(3.5), height: resize(3.5, 'height'), fontSize: resize(3, 'height'),
          paddingLeft: resize(0.2), paddingTop: resize(1.5), position: 'relative',
          top: resize(0.5), lineHeight: resize(4, 'height')
        }) :
        name === 'eco' ?
          Object.assign({}, style, { color: colorFootprint }) :
          Object.assign({}, style, {
            color: highlighted ? colorOrangeMed : colorGrayscale4
          })
      return (<span ref={this.iconRef} style={consolidatedStyle}>
        <span className="material-icons" style={{width: 24}}>{`${name.toLowerCase()}`}</span>
        {tooltip && <Tooltip pointedItem={this.iconRef}>{tooltip}</Tooltip>}
      </span>)
    }}</Resizer.Consumer>
  }
}
