import React, { Component } from 'react';
import './App.css';
import Search from './Components/Search';

class App extends Component {
  render() {
    return (
      <div className="App">
	    My App
	    <Search test="Hello World"/>
      </div>
    );
  }
}

export default App;
