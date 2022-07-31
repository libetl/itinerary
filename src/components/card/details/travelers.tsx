import React, { Component, createRef } from 'react'
import { Box } from '../../box/box'
import { Icon } from '../../icon/icon'
import { Tooltip } from '../../box/tooltip';
import { colorBalloonZoomedIn, colorBalloonZoomedOut, colorBalloonFont, colorBalloonBorder } from '../../colors/colors';
import { Resizer } from '../../resizer/resizer'

export class Travelers extends Component<{ travelers: Itinerary.Traveler[] }, { activated: boolean[] }> {
  buttonRefs: React.RefObject<HTMLAnchorElement>[]
  constructor(props: { travelers: Itinerary.Traveler[] }) {
    super(props);
    this.buttonRefs = props.travelers.map(() => createRef());
    this.state = { activated: props.travelers.map(() => false) }
  }
  render() {
    const { travelers } = this.props;
    return (!travelers.length ? <span /> :
      <Resizer.Consumer>{resize =>
        <Box.Row additionalStyle={{ minHeight: resize(9, 'height') }}>
          <Box.Column width={resize(3)}>
            <Icon style={{ marginRight: resize(1.5) }} name={'group'} />
          </Box.Column>
          <Box.Column additionalStyle={{ lineHeight: resize(4, 'height') }}>
            {travelers.map((traveler, i) => <span key={`traveler-${i}`}>
              <a ref={this.buttonRefs[i]} key={'traveler-' + i}
                onMouseEnter={e => {
                  this.setState({ activated: this.state.activated.map((_, j) => j === i) });
                  (e.target as HTMLAnchorElement).style.border = `solid ${resize(0.6)} ${colorBalloonBorder}`;
                  (e.target as HTMLAnchorElement).style.fontSize = resize(3.5);
                  (e.target as HTMLAnchorElement).style.padding = resize(2);
                  (e.target as HTMLAnchorElement).style.left = resize(-1);
                  (e.target as HTMLAnchorElement).style.zIndex = `${travelers.length + 1}`;
                  (e.target as HTMLAnchorElement).style.backgroundColor = colorBalloonZoomedIn;
                }}
                onMouseLeave={e => {
                  this.setState({ activated: this.state.activated.map(() => false) });
                  (e.target as HTMLAnchorElement).style.border = `solid ${resize(0.3)} ${colorBalloonBorder}`;
                  (e.target as HTMLAnchorElement).style.fontSize = resize(2.5);
                  (e.target as HTMLAnchorElement).style.padding = resize(1);
                  (e.target as HTMLAnchorElement).style.left = '0';
                  (e.target as HTMLAnchorElement).style.zIndex = `${i + 1}`;
                  (e.target as HTMLAnchorElement).style.backgroundColor = colorBalloonZoomedOut;
                }}
                style={{
                  position: 'relative',
                  fontSize: resize(2.5),
                  padding: resize(1),
                  backgroundColor: colorBalloonZoomedOut,
                  color: colorBalloonFont,
                  marginLeft: i == 0 ? '0' : resize(-1),
                  border: `${resize(0.3)} solid ${colorBalloonBorder}`,
                  borderRadius: '50%',
                  zIndex: i + 1,
                  transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  textDecoration: 'none'
                }}>{
                  traveler.firstName[0].toUpperCase() + traveler.lastName[0].toUpperCase()}
              </a>
              <Tooltip topShift={true} forcedLeftShift={this.state.activated[i] ? resize(5) : resize(2)}
                forcedZIndex={this.state.activated[i] ? i + 10 : 0} pointedItem={this.buttonRefs[i]}>
                {traveler.firstName + ' ' + traveler.lastName}</Tooltip></span>)}
          </Box.Column>
        </Box.Row>}</Resizer.Consumer>)
  }
}
