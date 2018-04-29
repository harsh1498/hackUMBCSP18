import React, { Component } from 'react';

var userSyms = {};

class Search extends Component {
  constructor(props){
   super(props);
   this.state = {data:{},userSyms:''};
  }

  componentDidMount() {
  fetch("http://localhost:5000/symptoms").then(results => {
	  return results.json();
       }).then(data => {
       var page = document.getElementById('symptomsList');
       var symptoms = data['symptoms'];
       var issue = data['issue'];
       var i = 0; 
       for(var symptom in symptoms){
         var checkBox = document.createElement("INPUT");
	 var label = document.createElement("LABEL");
	 label.innerHTML = symptoms[symptom];
	 checkBox.setAttribute('type','checkbox');
	 checkBox.setAttribute('id',symptom);
	 checkBox.setAttribute('class','checkmark')
	 checkBox.setAttribute('value',symptoms[symptom]);
	 checkBox.addEventListener('click',function() {
         if (Object.keys(userSyms).length == 6){
	 fetch("http://localhost:5000/symptoms",{ method:'post',body:JSON.stringify(userSyms)}).then(res => res.text()).then(response => document.getElementById('results').innerHTML = response)} 
         else if(this.checked){
	  userSyms[this.id] = this.value;
	 } else{
	  delete userSyms[this.id];
	 }
	 }
	 ); 

	 page.appendChild(checkBox); 
	 page.appendChild(label);
	 if(i%2 != 0){
	 page.appendChild(document.createElement("BR"));
	}
	 i += 1;
        };
        });	  
       }
  render() {
    return (
      <div className="Search" id="search">
	<div id="choose">
	<h6>Choose your Symptoms **requires 7 to activate**</h6>
	<ul id='symptomsList'></ul>
	</div>
	<div className="container" id="results">
	<h6>Results Will Appear Here:</h6>
	</div>
      </div>
    );
  }
}

export default Search;
