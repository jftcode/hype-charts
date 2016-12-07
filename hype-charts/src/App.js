import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import tracks from '../../tracks';

const listItems = tracks.tracks.map((track) =>
  <div key={track.mediaid}>
    <h3>{track.artist} - {track.title}</h3>
    <h5>{track.dateposted}</h5>
  </div>
);

class App extends Component {

  render() {
    return (
      <div className="App">
        <div>{listItems}</div>
      </div>
    );
  }
}

export default App;
