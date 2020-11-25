import React, { Component }  from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import * as FaIcons from 'react-icons/fa';
import SessionList from "../Session/View/SessionList";


export default class Session extends Component{
  render() {
  return (
    <Router>
       <div className="container">
        <h3 className="text-center h1 mt-3">Session List</h3>
        <a href="session/create" className="btn btn-success m-4 p-3 text-dark font-weight-bold"> <FaIcons.FaPlus />  Add New Session</a>
          <SessionList/>
      </div>
    </Router>
  )
  }
}
