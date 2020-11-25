import React, { Component }  from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import * as FaIcons from 'react-icons/fa';
import SpeakerList from "../Speaker/View/SpeakerList";


export default class Speaker extends Component{
  render() {
  return (
    <Router>
       <div className="container">
        <h3 className="text-center h1 mt-3">Speaker List</h3>
        <a href="speaker/create" className="btn btn-success m-4 p-3 text-dark font-weight-bold"> <FaIcons.FaPlus /> Add Speaker</a>
          <SpeakerList/>
      </div>
    </Router>
  )
  }
}
