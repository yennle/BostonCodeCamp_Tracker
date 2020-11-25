import './App.css';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter as Router, Switch,Route} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"

import Session from './components/pages/Session';
import Timeslot from './components/pages/Timeslot';
import Speaker from './components/pages/Speaker';
import Room from './components/pages/Room';

import CreateSpeaker from "./components/Speaker/Create/CreateSpeaker";
import EditSpeaker from "./components/Speaker/Update/EditSpeaker";

import CreateRoom from "./components/Room/Create/CreateRoom";
import EditRoom from "./components/Room/Update/EditRoom";

import CreateTimeslot from "./components/Timeslot/Create/CreateTimeslot";
import EditTimeslot from "./components/Timeslot/Update/EditTimeslot";

import CreateSession from "./components/Session/Create/CreateSession";
import EditSession from "./components/Session/Update/EditSession";



function App() {
  return (
    <>
      <Router>
        <div className="row base">
          <div className="col-2 m-3 d-none  d-lg-block">
          <Navbar/>
          </div>
          <div className="col-9 m-4 ">
          <Switch>
          <Route path='/session' exact component={Session} />
          <Route path='/' exact component={Session} />
          <Route path="/session/create"  component={CreateSession} />
          <Route path="/session/edit/:id"  component={EditSession} />
          

          <Route path='/speaker' exact component={Speaker} />
          <Route path="/speaker/create" exact component={CreateSpeaker} />
          <Route path="/speaker/edit/:id"  component={EditSpeaker} />

          <Route path='/room' exact component={Room} />
          <Route path="/room/create"  component={CreateRoom} />
          <Route path="/room/edit/:id"  component={EditRoom} />

          <Route path='/timeslot'exact component={Timeslot} />
          <Route path="/timeslot/create"  component={CreateTimeslot} />
          <Route path="/timeslot/edit/:id"  component={EditTimeslot} />
        </Switch>
          </div>
        </div>
      </Router>
    </>
    


 );
  ///TESTING
  
}

export default App;
