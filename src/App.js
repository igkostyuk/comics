import React, { Component } from 'react';
import './App.scss';
import loader from './GravityAnimating.svg';

import { getComicsList, setComicsSearchParams } from './api';
import Comics from './Comics';
import InputWrapper from './InputWrapper';

const Title = ({ title }) => <h2>{title}</h2>;
const Image = ({ path, extension, alt }) => (
  <img src={`${path}.${extension}`} alt={alt} />
);
class App extends Component {
  state = {
    list: [],
    isLoading: true,
    searchParams: { orderBy: 'modified' },
  };
  togglePopup = e => {
    console.log(e.target);
  };
  async componentDidMount() {
    const list = await getComicsList();
    this.setState({ list, isLoading: false });
  }
  setComicsLParams = async searchParams => {
    this.setState({ searchParams, isLoading: true });
    setComicsSearchParams(searchParams);
    const list = await getComicsList();
    await this.setState({ list, isLoading: false });
  };
  render() {
    const { list, isLoading } = this.state;
    return (
      <div className="App">
        <nav>
          <InputWrapper handleSubmit={this.setComicsLParams} />
        </nav>
        {isLoading ? (
          <img src={loader} className="App-logo" alt="logo" />
        ) : (
          <main onClick={this.togglePopup}>
            {list.map(comics => (
              <Comics
                key={comics.id}
                title={<Title title={comics.title} />}
                image={<Image {...comics.thumbnail} alt={comics.title} />}
              />
            ))}
          </main>
        )}
      </div>
    );
  }
}

export default App;
