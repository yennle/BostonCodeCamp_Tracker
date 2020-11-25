import React, { Component } from 'react';
import axios from 'axios';
import * as FaIcons from 'react-icons/fa';
import { Tooltip , OverlayTrigger} from 'react-bootstrap';

// import { Link } from 'react-router-dom';
const editTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    Edit room
  </Tooltip>
);
const deleteTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    Delete room
  </Tooltip>
);

const Room = props => (
  <tr>
    <td>{props.room.name}</td>
    <td>{props.room.capacity}</td>
    <td>
      {/* Edit Button */}
      <OverlayTrigger
      placement="left"
      delay={{ show: 150, hide: 300 }}
      overlay={editTooltip}
      >
        <a className="btn btn-warning "  href={"/room/edit/"+props.room._id}><FaIcons.FaPen/></a> 
      </OverlayTrigger>

      {/* Delete Button */}
      <OverlayTrigger
      placement="right"
      delay={{ show: 150, hide: 300 }}
      overlay={deleteTooltip}
      >
        <a className="btn btn-danger ml-4" href="#" onClick={() => { props.deleteRoom(props.room._id) }}><FaIcons.FaTrash/></a>
        {/* <a className="btn btn-danger ml-4" href="#" onClick={handleShow}><FaIcons.FaTrash/></a> */}
      </OverlayTrigger>
    </td>
  </tr>
)

export default class RoomList extends Component {
  constructor(props) {
    super(props);

    this.deleteRoom = this.deleteRoom.bind(this)

    this.state = {rooms: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/rooms/')
      .then(response => {
        this.setState({ rooms: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteRoom(id) {
    axios.delete('http://localhost:5000/api/rooms/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      rooms: this.state.rooms.filter(el => el._id !== id)
    })
  }

  roomList() {
    return this.state.rooms.map(currentroom => {
      return <Room room={currentroom} deleteRoom={this.deleteRoom} key={currentroom._id}/>;
    })
  }

  render() {
    return (
      <div>
        
        <table className="table text-center table-dark">
          <thead className="thead-dark ">
            <tr>
              <th>Room Name</th>
              <th>Capacity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.roomList() }
          </tbody>
        </table>
      </div>
    )
  }
}