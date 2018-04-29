import React, { Component } from 'react';
import './App.css';
import Search from './Components/Search';

class App extends Component {
  render() {
    return (
      <div className="App">
	    <div className="AppHeader">
	    	<h1>Symptoms Linker</h1>
	    </div>
	    <div className="SearchComponent">
	    	<Search heading="Choose Symptoms:"/>
	    </div>
      </div>
    );
  }
}

export default App;
