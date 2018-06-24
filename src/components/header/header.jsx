import React, { Fragment } from 'react';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import styled, { css } from 'react-emotion'
import logo from '../../fv_we.svg';
import { DEVICES } from '../../constants'


const theme = createMuiTheme({
  overrides: {
    // Name of the component ⚛️ / style sheet
    MuiDrawer: {
      // Name of the rule
      paperAnchorLeft: {
        // Some CSS
        top: 48
      },
    },
  },
});

const StyledHeader = styled('header') `
    background-color: #222;
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: nowrap;
    padding: 0.2rem 1rem;
    color: white;
    border-top: 2px solid white;
    position: fixed;
    left: 0;
    right: 0;
    border-bottom: 3px solid white;
`
const StyledList = styled('div')(({ viewportWidth }) => {
  const small = viewportWidth <= DEVICES.tablet
  return {
    width: small ? 270 : 'auto',
    height: '100%',
    // backgroundColor: small ? '#000' : 'transparent',
    lineHeight: '2.5rem',
    display: 'flex',
    flexDirection: small ? 'column' : 'row',
    fontSize: '1.8rem',
    a: {
      color: small ? '#000' : '#fff',
      paddingLeft: 10,
    }
  }
})

const StyledH1 = styled('h1')(props => ({
  fontSize: '1.8rem',
  fontWeight: 400
}))

const styles = {
  button: {
    color: '#cc2f2f'
  },
  paperAnchorLeft: {
    top: 50
  }
};

class HeaderComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sandwich: false,
      open: false,
      filter: props.filter
    };
  }

  toggleDrawer = (open) => () => {
    this.setState({
      open
    });
  };

  categoryHandler(item) { 
    this.props.setPage(2)
    this.props.filterElements(item)
  }

  render() {
    const categoryHandler = this.categoryHandler.bind(this)
    const { classes, filterElements, filter, viewportWidth, categories, setPage, page } = this.props;
    const toggleDrawer = this.toggleDrawer.bind(this)

    const sideList = (
      <StyledList viewportWidth={viewportWidth}>
        <a href="#" onClick={() => setPage(1)} className={`${page == 1 ? 'selected' : ''}`}>HOME</a>
        {categories.map((item) =>
          <a key={item} href="#" className={`${page == 2 && item === filter? 'selected' : ''}`} onClick={() => categoryHandler(item)}> {item.toUpperCase()}</a>
        )}
        <Divider />
        <a href="/portfolio_francesco_vertucci.pdf">BIOGRAPHY</a>
      </StyledList >
    );

    return (
      <StyledHeader >
        <StyledH1 onClick={() => setPage(1)}>
          {/*<img src={logo} className="header-logo" alt="logo" />*/}
          FRANCESCO VERTUCCI
          </StyledH1>
        {
          viewportWidth <= DEVICES.tablet ?
            <MuiThemeProvider theme={theme}>
              <Fragment>
                <Button className={classes.button} onClick={toggleDrawer(true)}>Menu</Button>
                <Drawer open={this.state.open} onClose={toggleDrawer(false)} >
                  <div
                    tabIndex={0}
                    role="button"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                  >
                    {sideList}
                  </div>
                </Drawer>
              </Fragment>
            </MuiThemeProvider>
            : sideList
        }
      </StyledHeader>
    )
  }
}

export const Header = withStyles(styles)(HeaderComponent)
