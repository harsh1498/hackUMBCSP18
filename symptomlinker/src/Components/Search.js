import React, { Component } from 'react';


class Search extends Component {
  constructor(){
    super();
    this.state = {name:"",};
  }	
  componentDidMount() {
    fetch('http://localhost:5000/test').then(resp => resp.json()).then(data=>{
   let name = data.hey;
   this.setState({name:name});
   console.log(this.state.name);
  });
}
  render() {
    return (
      <div className="Search" id="search">
	    {this.state.name}
      </div>
    );
  }
}

export default Search;
