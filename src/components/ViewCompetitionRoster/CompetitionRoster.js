import React, { Component } from 'react';
import axios from 'axios';
import ViewEditShooter from '../ViewEditShooter/ViewEditShooter'

class CompetitionRoster extends Component {
  constructor(props){
    super(props);
    this.state = {
      shooters: []
      
    }
    
  }


  getShooters(){
    axios({
      method: 'GET',
      url: '/api/competition/shooter'
    }).then((response) => {
      let shooters;


      if(response.data){
        shooters= response.data
      } else {
        shooters = []
      }
      this.setState({
      shooters:shooters
      }) 
   })
  }

  editShooter = () => {
    console.log('button working');

    axios({
      method: 'GET',
      url: '/api/competition/shooter/:id'
    })
    
  }



  componentDidMount(){
    this.getShooters();
    console.log(this.state.shooters);
    
  }

  render() {
    return (
<div>
  <table>
    <thead>
      <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Handicap</th>
        <th>Edit</th>
      </tr>
    </thead>
    <tbody>
      {this.state.shooters.map((person) => {
        return(<tr key={person.id}>
        <td>{person.first_name}</td>
        <td>{person.last_name}</td>
        <td>{person.handicap}</td>
        <td><button onClick={this.editShooter}>Edit</button></td>
        </tr>)
      })}
    </tbody>
  </table>
  <ViewEditShooter />
</div>    
)
  }
}


export default CompetitionRoster;