import React, {
  Component
} from 'react';
import './App.css';
import { images } from './files'
import Tiles from './Tiles'
import { Header } from './components/header'
import styled, { css } from 'react-emotion'
import Measure from 'react-measure';
import logo from './fv_we.svg';
import background from './graphic_web_resume.png';
import backgroundPortrait from './graphic_web_portrait.png';

const containerClass = css`
  text-align: center;

`
const MainSectionNode = styled('div') `
    display: flex;
    flex-direction: column;
`

const superLogo = css`
  animation: App-logo-spin infinite 25s;
  margin-top: 20vh;
  height: 220px;
  
`

const backgroundClass = css`
  position: absolute;
  top: 80px;
  left: 0;
  bottom: 0;
  right: 0;
  background-image: url(${background});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`
// background-image: url(${background});
//   background-position: center;
//   background-repeat: no-repeat;
//   background - size: cover;
  
const getCategories = () => {
  return images.reduce((acc, current) => {
    acc[current.category] = false
    return acc
  }, {})
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filter: 'portfolio',
      width: -1,
      height: -1,
      categories: Object.keys(getCategories()),
      page: 1
    }
  }

  filterElements(filter) {
    this.setState({
      filter
    })
  }

  setPage(page) {
    this.setState({ page })
  }

  render() {
    const { filter, width, categories, page } = this.state
    const filterElements = this.filterElements.bind(this)
    const setPage = this.setPage.bind(this)
    return (
      <Measure bounds onResize={(contentRect) => this.setState({ width: contentRect.bounds.width })}>
        {
          ({ measureRef }) =>
            <div className={containerClass} ref={measureRef}>
              <Header viewportWidth={width} filter={filter} categories={categories} filterElements={filterElements} page={page} setPage={setPage} />
              <MainSectionNode>
                {page == 2 ?
                  <Tiles viewportWidth={width} images={images.filter((image) =>
                    image.category === filter
                  )} />
                  :
                  <div className={backgroundClass}>
                    {/*<img src={background} className={backgroundClass} alt="background" />*/}
                    <img src={logo} className={superLogo} alt="logo" />
                  </div>
                }
              </MainSectionNode>
            </div>
        }
      </Measure>
    );
  }
}

export default App;