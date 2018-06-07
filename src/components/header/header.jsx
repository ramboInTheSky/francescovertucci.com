import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Measure from 'react-measure';


const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
};

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sandwich: false,
      open: false,
      width: -1,
      filter: props.filter
    };
  }

  toggleDrawer = (open) => () => {
    this.setState({
      open
    });
  };



  render() {
    const { classes, filterElements, filter } = this.props;
    const { width } = this.state;
    const toggleDrawer = this.toggleDrawer.bind(this)

    const sideList = (
      <div className={classes.list}>
        {/*<List></List>
        <Divider />
        <List></List>*/}
      </div>
    );

    const fullList = (
      <div className={classes.fullList}>
        {/*<List></List>
        <Divider />
        <List></List>*/}
      </div>
    );

    return (

      <Measure bounds onResize={(contentRect) => this.setState({ width: contentRect.bounds.width })}>
        {
          ({ measureRef }) => {
            if (width < 1) {
              return <div ref={measureRef}></div>;
            }
            if (width <= 480) {
              return (
                <header className="App-header" ref={measureRef}>
                  <h1 className="App-title" > Francesco Vertucci</h1>
                  <Button onClick={toggleDrawer(true)}>Menu</Button>
                  <Drawer open={this.state.open} onClose={toggleDrawer(false)}>
                    <div
                      tabIndex={0}
                      role="button"
                      onClick={toggleDrawer(false)}
                      onKeyDown={toggleDrawer(false)}
                    >
                      {sideList}
                    </div>
                  </Drawer>
                </header>
              )
            }
            if (width > 480) {
              return (

                <header className="App-header" ref={measureRef}>
                  <h1 className="App-title" > Francesco Vertucci</h1>
                  <a href="#" className="link"> Read Bio</a>
                  <a href="#" className=
                    {`link ${filter == 'illustrations' ? 'selected' : ''}`} onClick={() => filterElements('illustrations')}> Illustrations</a>
                  <a href="#" className=
                    {`link ${filter == 'performances' ? 'selected' : ''}`} onClick={() => filterElements('performances')}> Performances</a>
                  <a href="#" className=
                    {`link ${filter == 'art' ? 'selected' : ''}`} onClick={() => filterElements('art')}> Art Installations</a>
                </header>
              )
            }

          }
        }

      </Measure>

    );
  }
}

export default withStyles(styles)(Header);