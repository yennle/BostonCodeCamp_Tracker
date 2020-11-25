import React, { Component }  from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import * as FaIcons from 'react-icons/fa';
import TimeslotList from "../Timeslot/View/TimeslotList";


export default class Timeslot extends Component{
  render() {
  return (
    <Router>
       <div className="container">
        <h3 className="text-center h1 mt-3">Time Slot List</h3>
        
          <TimeslotList/>
      </div>
    </Router>
  )
  }
}
