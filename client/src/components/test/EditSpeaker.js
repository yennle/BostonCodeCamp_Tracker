import React, { Component } from 'react';
import axios from 'axios';

export default class EditSpeaker extends Component {
    constructor(props) {
        super(props);
    
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangeDayPhone = this.onChangeDayPhone.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
          name: '',
          email: '',
          phone: '',
          dayphone: '',
        }
      }
      componentDidMount() {
        axios.get('http://localhost:5000/api/speakers/'+this.props.match.params.id)
          .then(response => {
              this.setState({
                name: response.data.name,
                email: response.data.email,
                phone: response.data.phone,
                dayphone: response.data.dayphone,
              })
          })
          .catch(function (error) {
            console.log(error);
          })
    
      }
    
      onChangeName(e) {
        this.setState({
          name: e.target.value
        })
      }
    
      onChangeEmail(e) {
        this.setState({
          email: e.target.value
        })
      }
    
      onChangePhone(e) {
        this.setState({
          phone: e.target.value
        })
      }
    
      onChangeDayPhone(e) {
        this.setState({
          dayphone: e.target.value
        })
      }
    
      onSubmit(e) {
        e.preventDefault();
    
        const speaker = {
          name: this.state.name,
          email: this.state.email,
          phone: this.state.phone,
          dayphone: this.state.dayphone
        }
    
        console.log(speaker);
    
        axios.put('http://localhost:5000/api/speakers/'+this.props.match.params.id, speaker)
          .then(res => console.log(res.data));
    
        window.location = '/speaker';
      }
    render(){
        return(
          <div>
          <a href="/speaker" className="btn btn-info">View All Speaker</a>
          <div className='w-50 mx-auto mt-5'>
                <h3>Edit Speaker</h3>
                <form onSubmit={this.onSubmit}>
                <div className="form-group"> 
                    <label>Name: </label>
                    <input  type="text"
                        required
                        className="form-control"
                        value={this.state.name}
                        onChange={this.onChangeName}
                        />
                </div>
                <div className="form-group"> 
                    <label>Email: </label>
                    <input  type="email"
                        required
                        className="form-control"
                        value={this.state.email}
                        onChange={this.onChangeEmail}
                        />
                </div>
                <div className="form-group"> 
                    <label>Phone: </label>
                    <input  type="tel"
                        required
                        className="form-control"
                        value={this.state.phone}
                        onChange={this.onChangePhone}
                        />
                </div>
                <div className="form-group"> 
                    <label>Day Phone: </label>
                    <input  type="tel"
                        className="form-control"
                        value={this.state.dayphone}
                        onChange={this.onChangeDayPhone}
                        />
                </div>
                <div className="form-group">
                    <input type="submit" value="Update Speaker" className="btn btn-primary" />
                </div>
                </form>
            </div>
          </div>
        )
    }

}