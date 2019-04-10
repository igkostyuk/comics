import React, { Component } from 'react';
import './App.css';

import { getComicsList } from './api';
import Comics from './Comics';

const Title = ({ title }) => <h2>{title}</h2>;
const Image = ({ path, extension, alt }) => (
  <img src={`${path}.${extension}`} alt={alt} />
);

class App extends Component {
  state = {
    list: [],
  };
  async componentDidMount() {
    const list = await getComicsList();
    this.setState({ list });
  }
  render() {
    const { list } = this.state;
    return (
      <div className="App">
        {list.map(comics => (
          <Comics
            key={comics.id}
            title={<Title title={comics.title} />}
            image={<Image {...comics.thumbnail} />}
          />
        ))}
      </div>
    );
  }
}

export default App;
