import React, {
  Component
} from 'react';
import logo from './logo.svg';
import CenteredGrid from './grid'
import './App.css';
import { images } from './files'
import Tiles from './Tiles'
import Header from './components/header/header.jsx'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filter: 'illustrations'
    }
  }
  filterElements(filter) {
    this.setState({
      filter
    })
  }

  render() {
    const { filter } = this.state
    const filterElements = this.filterElements.bind(this)
    return (
      <div className="App" >
        <Header filter={filter} filterElements={filterElements} />
        <section className="App-content">
          <Tiles images={images.filter((image) =>
            image.section == filter
          )} />
        </section>
      </div>
    );
  }
}

export default App;