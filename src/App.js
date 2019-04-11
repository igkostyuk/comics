import React, { Component } from 'react';
import './App.scss';
import loader from './GravityAnimating.svg';

import { getComicsList, setComicsSearchParams } from './api';

import Popup from './Popup';
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
    showPopup: false,
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
  onClick = e => {
    const title = e.target.alt;
    const targetComics = this.state.list.find(comics => comics.title === title);
    this.togglePopup(targetComics);
  };
  togglePopup = (targetComics = {}) => {
    this.setState({
      showPopup: !this.state.showPopup,
      targetComics,
    });
  };
  render() {
    const { list, isLoading, targetComics, showPopup } = this.state;
    return (
      <div className="App">
        <nav>
          <InputWrapper handleSubmit={this.setComicsLParams} />
        </nav>
        {isLoading ? (
          <img src={loader} className="App-logo" alt="logo" />
        ) : (
          <main onClick={this.onClick}>
            {list.map(comics => (
              <Comics
                key={comics.id}
                title={<Title title={comics.title} />}
                image={<Image {...comics.thumbnail} alt={comics.title} />}
              />
            ))}
          </main>
        )}
        {showPopup ? (
          <Popup
            text="Close Me"
            closePopup={this.togglePopup}
            comics={targetComics}
            title={<Title title={targetComics.title} />}
            image={
              <Image {...targetComics.thumbnail} alt={targetComics.title} />
            }
          />
        ) : null}
      </div>
    );
  }
}

export default App;
