import React, { Component }from 'react';
import axios from 'axios';
import * as FaIcons from 'react-icons/fa';
import { Tooltip , OverlayTrigger} from 'react-bootstrap';

// import { Link } from 'react-router-dom';
const editTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    Edit session
  </Tooltip>
);
const deleteTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    Delete session
  </Tooltip>
);


const Session = props => (

  <>
  
  <tr className="m-2">
    <td>{props.session.name}</td>
    <td>{props.session.timeslot}</td>
    <td>{props.session.speaker}</td>
    <td>{props.session.room}</td>
    <td>
      {/* Edit Button */}
      <OverlayTrigger
      placement="left"
      delay={{ show: 150, hide: 300 }}
      overlay={editTooltip}
      >
        <a className="btn btn-warning "  href={"/session/edit/"+props.session._id}><FaIcons.FaPen/></a> 
      </OverlayTrigger>

      {/* Delete Button */}
      <OverlayTrigger
      placement="right"
      delay={{ show: 150, hide: 300 }}
      overlay={deleteTooltip}
      >
        <a className="btn btn-danger ml-4" href="#" onClick={() => { props.deleteSession(props.session._id) }}><FaIcons.FaTrash/></a>
        {/* <a className="btn btn-danger ml-4" href="#" onClick={handleShow}><FaIcons.FaTrash/></a> */}
      </OverlayTrigger>
    </td>
  </tr>

</>

)

class SessionList extends Component {
  
  constructor(props) {
    super(props);
    this.deleteSession = this.deleteSession.bind(this)

    this.state = {sessions: []};
  }
  
  componentDidMount() {
    axios.get('http://localhost:5000/api/sessions/')
      .then(response => {
        this.setState({ sessions: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteSession(id) {
    axios.delete('http://localhost:5000/api/sessions/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      sessions: this.state.sessions.filter(el => el._id !== id)
    })
  }

  sessionList() {
    return this.state.sessions.map(currentsession => {
      return <Session session={currentsession} deleteSession={this.deleteSession} key={currentsession._id}/>;
    })
  }

  render() {
    return (
      <div>
        
        <table className="table text-center table-dark">
          <thead className="thead-dark ">
            <tr>
              <th>Session Name</th>
              <th>Time Slot</th>
              <th>Speaker</th>
              <th>Room</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.sessionList() }
          </tbody>
        </table>
      </div>
    )
  }
}
export default SessionList;