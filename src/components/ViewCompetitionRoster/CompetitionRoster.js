import React, { Component } from 'react';
import axios from 'axios';
import ViewEditShooter from '../ViewEditShooter/ViewEditShooter'

class CompetitionRoster extends Component {
  constructor(props){
    super(props);
    this.state = {
      shooters: [],
      selectedShooter: {}
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

  editShooter = (id) => {
    console.log('button working');

    axios({
      method: 'GET',
      url: `/api/competition/shooter/${id}`
    }).then((response) => {
      console.log(response);
      
      this.setState({
        ...this.state,
        selectedShooter:response.data[0]
      })

    }) 
  }

  handleChangeFor = propertyName => (event) => {
    this.setState({
       [propertyName]: event.target.value
    });

}
    
  



  componentDidMount(){
    this.getShooters();
    console.log(this.state.shooters);
    
  }

  render() {
    return (
<div>
  <h2>Competition Roster</h2>
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
        <td><button onClick={()=>{this.editShooter(person.id)}}>Edit</button></td>
        </tr>)
      })}
    </tbody>
  </table>
  
  <ViewEditShooter selectedShooter={this.state.selectedShooter}
  onChange={()=>{this.state.handleChangeFor();}}
  />
</div>    
)
  }
}


export default CompetitionRoster;