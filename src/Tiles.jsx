import React from 'react';
import Gallery from 'react-photo-gallery';
import Measure from 'react-measure';



export default class Tiles extends React.Component {
  constructor() {
    super();
    this.state = { width: -1 };
  }
  render() {
    const { width } = this.state;
    const { images } = this.props;
    let columns = 1;

    return (
      <Measure bounds onResize={(contentRect) => this.setState({ width: contentRect.bounds.width })}>
        {
          ({ measureRef }) => {
            if (width < 1) {
              return <div ref={measureRef}></div>;
            }
            if (width >= 480) {
              columns = 2;
            }
            if (width >= 900) {
              columns = 2;
            }
            if (width >= 1024) {
              columns = 2;
            }
            if (width >= 1200) {
              columns = 3;
            }
            if (width >= 1800) {
              columns = 4;
            }
            return <div ref={measureRef}><Gallery photos={images} columns={columns} /></div>
          }
        }
      </Measure>
    );
  }
}