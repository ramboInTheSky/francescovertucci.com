import React, {
  Component
} from 'react';
import './App.css';
import { images } from './files'
import Tiles from './Tiles'
import { Header } from './components/header'
import styled, { css } from 'react-emotion'
import Measure from 'react-measure';

const containerClass = css`
  text-align: center;
`
const MainSectionNode = styled('section') `
  padding-top: 50px;
`

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
      filter: 'illustrations',
      width: -1,
      categories: Object.keys(getCategories())
    }
  }

  filterElements(filter) {
    this.setState({
      filter
    })
  }

  render() {
    const { filter, width, categories } = this.state
    const filterElements = this.filterElements.bind(this)
    return (
      <Measure bounds onResize={(contentRect) => this.setState({ width: contentRect.bounds.width })}>
        {
          ({ measureRef }) =>
            <div className={containerClass} ref={measureRef}>
              <Header viewportWidth={width} filter={filter} categories={categories} filterElements={filterElements} />
              <MainSectionNode>
                <Tiles viewportWidth={width} images={images.filter((image) =>
                  image.category === filter
                )} />
              </MainSectionNode>
            </div>
        }
      </Measure>
    );
  }
}

export default App;