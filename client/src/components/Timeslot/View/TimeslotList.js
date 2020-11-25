import React, { Component} from 'react';
import axios from 'axios';
import * as FaIcons from 'react-icons/fa';
import './Table.css';
import { Tooltip , OverlayTrigger} from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone,PaginationTotalStandalone } from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search} from 'react-bootstrap-table2-toolkit';


const { SearchBar} = Search;


const editTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    Edit 
  </Tooltip>
);
const deleteTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    Delete 
  </Tooltip>
);
const Timeslot = props => (
  <tr>
    <td>{props.timeslot.name}</td>
    <td>{props.timeslot.start}</td>
    <td>{props.timeslot.end}</td>
    <td>
      {/* Edit Button */}
      <OverlayTrigger
      placement="left"
      delay={{ show: 150, hide: 300 }}
      overlay={editTooltip}
      >
        <a className="btn btn-warning "  href={"/timeslot/edit/"+props.timeslot._id}><FaIcons.FaPen/></a> 
      </OverlayTrigger>

      {/* Delete Button */}
      <OverlayTrigger
      placement="right"
      delay={{ show: 150, hide: 300 }}
      overlay={deleteTooltip}
      >
        <a className="btn btn-danger ml-4" onClick={() => { props.deleteTimeslot(props.timeslot._id) }}><FaIcons.FaTrash/></a>
      </OverlayTrigger>
   </td>
  </tr>
)
const NoDataIndication = () => (
  <div className="spinner">
    <div className="rect1" />
    <div className="rect2" />
    <div className="rect3" />
    <div className="rect4" />
    <div className="rect5" />
  </div>
);

// const [show, setShow] = useState(false);
export default class TimeslotList extends Component {
  
  constructor(props) {
    super(props);

    this.deleteTimeslot = this.deleteTimeslot.bind(this)

    this.state = {
      seen: false,
      timeslots: []
    };
  }
  columns = [{
    dataField: 'name',
    text: 'Time Slot Name',
    sort: true,
  }, {
    dataField: 'start',
    text: 'Start Time',
    sort: true
  }, {
    dataField: 'end',
    text: 'End Time',
    sort: true
  }
  ,
  {
    dataField: 'action',
    text: 'Actions',
    formatter: (cellContent, row) => {
      return (
        <div>
           <OverlayTrigger
      placement="left"
      delay={{ show: 150, hide: 300 }}
      overlay={editTooltip}
      >
        <a className="btn-action btn-edit btn btn-warning "  href={"/timeslot/edit/"+row._id}><FaIcons.FaPen/></a> 
      </OverlayTrigger>

      {/* Delete Button */}
      <OverlayTrigger
      placement="right"
      delay={{ show: 150, hide: 300 }}
      overlay={deleteTooltip}
      >
        <a className="btn-action btn-delete btn btn-danger ml-4" onClick={() => { this.confirm(row._id) }}><FaIcons.FaTrash/></a>
        
      </OverlayTrigger>
      </div>
       
      );
    },
  }
  ];
  componentDidMount() {
    axios.get('http://localhost:5000/api/timeslots/')
      .then(response => {
        this.setState({ timeslots: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteTimeslot(id) {
    axios.delete('http://localhost:5000/api/timeslots/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      timeslots: this.state.timeslots.filter(el => el._id !== id)
    })
  }

  timeslotList() {
    return this.state.timeslots.map(currenttimeslot => {
      return <Timeslot timeslot={currenttimeslot} deleteTimeslot={this.deleteTimeslot} key={currenttimeslot._id}/>;
    })
  }
  confirm = (id) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="confirm">
            <h2>Confirmation</h2>
            <hr/>
            <p className="text-center h3 mt-4">You want to delete this time slot?</p>
            <div className="text-center mt-4">
              <button className="btn btn-confirm btn-action btn-lg btn-dark m-4" onClick={onClose}>No</button>
              <button className="btn btn-confirm btn-action btn-lg btn-danger m-4" onClick={() => {
                  this.deleteTimeslot(id) 
                  onClose()
              }}>Yes, Delete it!</button>
            </div>
            
          </div>
        )
      }
    })
  };
  
  render() {
    const options = {
      custom: true,
      sizePerPage: 5,
      alwaysShowAllBtns:true,
      paginationSize: 2,
      pageStartIndex: 1,
      firstPageText: 'First',
      prePageText: 'Back',
      nextPageText: 'Next',
      lastPageText: 'Last',
      nextPageTitle: 'First page',
      prePageTitle: 'Pre page',
      firstPageTitle: 'Next page',
      lastPageTitle: 'Last page',
      withFirstAndLast:false,
      showTotal: true,
      totalSize: this.state.timeslots.length
    };
    const contentTable = ({ paginationProps, paginationTableProps }) => (
      <div>
        <ToolkitProvider
          keyField="_id"
          columns={ this.columns }
          data={ this.state.timeslots }
          search
          bootstrap4
        >
          {
            toolkitprops => (
              <div>
                <div className="row my-4">
                  <div className="col-4 text-center ">
                    <a href="timeslot/create" className="add-btn btn mx-auto"> <FaIcons.FaPlus /> Add New Time Slot</a>
                  </div>
                  <div className="col-8">
                  <SearchBar 
                  placeholder="Search for time slots . . .  "
                { ...toolkitprops.searchProps } />
                  </div>
                </div>
                
                <BootstrapTable
                  classes ="table-dark"
                  hover
                  noDataIndication={ () => <NoDataIndication /> }
                  { ...toolkitprops.baseProps }
                  { ...paginationTableProps }
                />
              </div>
            )
          }
        </ToolkitProvider>
        <PaginationTotalStandalone
          { ...paginationProps }
        />
        <PaginationListStandalone 
          { ...paginationProps } 
        />
      </div>
    );
    return (
      <div className="text-center ml-5">
        <PaginationProvider
          pagination={
            paginationFactory(options)
          }
        >
          { contentTable }
        </PaginationProvider>
      </div>
    )
  }
}