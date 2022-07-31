import React, { Component, createRef } from 'react'
import { colorSlateDark } from '../colors/colors'
import { Resizer } from '../resizer/resizer'

export class Tooltip extends Component<{
  children?: React.ReactNode, forcedLeftShift?: string,
  topShift?: boolean,
  forcedZIndex?: number, pointedItem?: React.RefObject<HTMLElement>
}, { displayed: boolean }> {
  bindDisplay: NodeJS.Timeout;
  bindArrow: NodeJS.Timeout;
  bindHandler: NodeJS.Timeout;
  displayTimeout: NodeJS.Timeout;
  displayRef: React.RefObject<HTMLDivElement>;
  arrowRef: React.RefObject<HTMLDivElement>;
  height?: number;
  width?: number;
  pointedElemWidth?: number;
  pointedElemHeight?: number;
  arrowWidth?: number;
  constructor(props: {
    children?: React.ReactNode, forcedTopShift?: string, forcedLeftShift?: string,
    forcedZIndex?: number, pointedItem?: React.RefObject<HTMLElement>
  }) {
    super(props)
    this.state = { displayed: !props.pointedItem }
    this.mouseOver = this.mouseOver.bind(this)
    this.mouseOut = this.mouseOut.bind(this)
    this.refreshSizes = this.refreshSizes.bind(this)
    this.height = 0
    this.width = 0
    this.arrowWidth = 0
    this.pointedElemWidth = 0
    this.pointedElemHeight = 0
    this.displayRef = createRef()
    this.arrowRef = createRef()
  }
  componentDidMount() {
    this.refreshSizes()
    window.addEventListener('resize', this.refreshSizes)
  }
  refreshSizes() {
    this.bindHandler = setInterval(() => {
      if (!this.props.pointedItem) return clearInterval(this.bindHandler)
      if (this.props.pointedItem.current) {
        this.props.pointedItem.current.addEventListener('mouseover', this.mouseOver)
        this.props.pointedItem.current.addEventListener('mouseout', this.mouseOut)
        const { width, lineHeight } = window.getComputedStyle(this.props.pointedItem.current)
        this.pointedElemWidth = width && parseInt(width) || 0;
        this.pointedElemHeight = lineHeight && parseInt(lineHeight) || 0;
        clearInterval(this.bindHandler)
      }
    }, 100)
    this.bindDisplay = setInterval(() => {
      if (this.displayRef.current) {
        const { height, width } = window.getComputedStyle(this.displayRef.current)
        this.height = height && parseInt(height) || 0;
        this.width = width && parseInt(width) || 0;
        clearInterval(this.bindDisplay)
      }
    }, 100)
    this.bindArrow = setInterval(() => {
      if (this.arrowRef.current) {
        const { width } = window.getComputedStyle(this.arrowRef.current)
        this.arrowWidth = width && parseInt(width) || 0;
        clearInterval(this.bindArrow)
      }
    }, 100)
  }
  componentWillUnmount() {
    clearInterval(this.bindHandler)
    if (this.props.pointedItem && this.props.pointedItem.current) {
      this.props.pointedItem!.current.removeEventListener('mouseover', this.mouseOver)
      this.props.pointedItem!.current.removeEventListener('mouseout', this.mouseOut)
    }
    window.removeEventListener('resize', this.refreshSizes)
  }
  mouseOver() {
    this.displayTimeout = setTimeout(() => this.setState({ displayed: true }), 500)
  }
  mouseOut() {
    clearTimeout(this.displayTimeout)
    this.setState({ displayed: false })
  }
  render() {
    return (<Resizer.Consumer>{resize => <div ref={this.displayRef} style={{
      backgroundColor: colorSlateDark, boxShadow: `0 ${resize(0.3)} ${resize(0.4)} rgba(21, 40, 53, 0.2)`,
      borderRadius: resize(0.3),
      padding: resize(6),
      position: 'absolute',
      top: this.height && this.width && this.arrowWidth ? undefined : -10000,
      marginTop: -(this.height || 0) - (this.props.topShift ? this.pointedElemHeight || 0 : 0),
      marginLeft: -(this.width || 0) / 2,
      display: 'inline',
      color: 'white',
      zIndex: this.state.displayed ? this.props.forcedZIndex || 2 : -1,
      opacity: this.state.displayed ? 1 : 0,
      transition: 'opacity 0.2s ease-out',
      textAlign: 'center'
    }}><div style={{ zIndex: 2 }}>{this.props.children}</div>
      <div ref={this.arrowRef} style={{
        zIndex: 1,
        position: 'absolute',
        width: resize(3), height: resize(3, 'height'),
        marginLeft: '-' + this.props.forcedLeftShift,
        left: (this.width || 0) / 2 - (this.arrowWidth || 0) / 2 - (this.pointedElemWidth || 0) / 2,
        backgroundColor: colorSlateDark, transform: 'rotate(-135deg)',
        boxShadow: `0 ${resize(0.3)} ${resize(0.4)} rgba(21, 40, 53, 0.2)`,
        borderRadius: resize(0.3),
        bottom: resize(-1.5)
      }}>&nbsp;</div>
    </div >}</Resizer.Consumer>)
  }
}
