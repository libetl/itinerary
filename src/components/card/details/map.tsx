import React, { Component } from 'react'
import { colorBorder } from '../../colors/colors'
import { Resizer } from '../../resizer/resizer'

const colors = ['black', 'brown', 'green', 'purple', 'blue', 'gray', 'orange', 'red', 'white']

const aLetter: (index?: number) => string = index => String.fromCharCode('A'.charCodeAt(0) + (index || 0))
const bLetter: (index?: number) => string = index => String.fromCharCode('A'.charCodeAt(0) + (index || 0) + 1)

type MapProps = {
  a: Itinerary.Coords,
  b: Itinerary.Coords,
  index?: number,
  widthFunction?: (() => number | undefined),
  ratio?: number,
  description?: string,
  googleMapsApiKey: string,
}
export class Map extends Component<MapProps, { width: number }> {
  resizeListener: () => void
  constructor(props: MapProps) {
    super(props);
    this.state = { width: 500 }
    this.resizeListener = () => {
      this.updateHeight()
    }
    window.addEventListener('resize', this.resizeListener)
  }

  componentDidMount() {
    this.updateHeight()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeListener)
  }

  updateHeight() {
    this.setState({ width: this.props.widthFunction && this.props.widthFunction() || 500 })
  }

  render() {
    const { widthFunction, index, a, b, ratio, description, googleMapsApiKey } = this.props
    const width = (widthFunction && widthFunction() || 500) * 0.8
    return (<Resizer.Consumer>{resize => <img style={{ border: `solid ${resize(0.2)} ${colorBorder}`, display: 'inline-block' }}
      width={Math.floor(width)} height={Math.floor(width / (ratio || 1.33))}
      src={`https://maps.googleapis.com/maps/api/staticmap?size=${Math.floor(width)}x${
        Math.floor(width / (ratio || 1.33))}&key=${googleMapsApiKey}&markers=color:${
        colors[(index || 0) % colors.length]}|label:${
        aLetter(index)}|${a.longitude},${
        a.latitude}&markers=color:${colors[((index || 0) + 1) % colors.length]}|label:${bLetter(index)}|${b.longitude},${
        b.latitude}&path=color:blue%7Cweight:5%7Cgeodesic:true%7C${a.longitude},${
        a.latitude}%7C${b.longitude},${b.latitude}`} alt={description || `flight path for segment #${index}`} />}</Resizer.Consumer>)
  }
}
