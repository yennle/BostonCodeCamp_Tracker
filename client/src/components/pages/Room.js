import React, { Component }  from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import * as FaIcons from 'react-icons/fa';
import RoomList from "../Room/View/RoomList";


export default class Room extends Component{
  render() {
  return (
    <Router>
       <div className="container ">
        <h3 className="text-center h1 mt-3">Room List</h3>
        <a href="room/create" className="btn btn-success m-4 p-3 text-dark font-weight-bold"> <FaIcons.FaPlus /> Add New Room</a>
    
        
          <RoomList/>
      </div>
    </Router>
  )
  }
}
