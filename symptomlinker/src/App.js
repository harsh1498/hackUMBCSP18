import React, { Component } from 'react';
import './App.css';
import Search from './Components/Search';

class App extends Component {
  render() {
    return (
      <div className="App">
	    <div class="jumbotron">
	      <h1 class="display-4">Symptoms Linker</h1>
	      <p class="lead">This is a simple web application which provides real time health analysis based off of your symptoms</p>
	      <p>Built on React.js, Flask, and Scikit</p>
	    </div>
	    <div className="SearchComponent">
	    	<Search heading="Choose Symptoms:"/>
	    </div>
      </div>
    );
  }
}

export default App;
