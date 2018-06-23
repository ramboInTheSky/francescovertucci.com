import React from 'react';
import Gallery from 'react-photo-gallery';
import { DEVICES } from './constants'

const determineColumns = (width) => {
  let columns
  if (width <= DEVICES.mobile) {
    return 1;
  }
  if (width <= DEVICES.tablet) {
    return 1;
  }
  if (width <= DEVICES.desktop) {
    return 2;
  }
  if (width <= DEVICES.retina) {
    return 3;
  }
  if (width <= DEVICES.projector) {
    return 4;
  }
}

export default class Tiles extends React.Component {
  constructor() {
    super();
    this.state = { columns: 4 };
  }

  gotoImg(e, item) {
    document.location = item.photo.src
  }

  render() {
    const { images, viewportWidth } = this.props;
    const columns = determineColumns(viewportWidth)
    return <Gallery photos={images} columns={columns} onClick={this.gotoImg.bind(this)} />
  }

}