import React, { Component } from 'react';
import axios from 'axios';
import ViewEditShooter from '../ViewEditShooter/ViewEditShooter'

class CompetitionRoster extends Component {
  constructor(props){
    super(props);
    this.state = {
      shooters: [],
      selectedShooter: {},
      // filteredArray: [],
      input: ''
    }
    
  }
//GET all shooters associated with the current competition
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

  //GET an individual shooters information

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
      ...this.state,
      selectedShooter: {
        ...this.state.selectedShooter,
        [propertyName]: event.target.value
      }
    });

}

 onFilterChange = (event) => {
   console.log(event.target.value);
    this.setState({
      input: event.target.value
   })
 }
    
  componentDidMount(){
    this.getShooters();
    console.log(this.state.shooters);
    
  }

  //Able to filter roster by search field. Select a user and edit their information

  render() {
    // const list = this.state.shooters.filter(shooter => {
    //   const fullName = `${shooter.first_name} + ' ' + ${shooter.last_name}` 
    //   this.state.input === '' || fullName.includes(this.state.input)
    //     .map((shooter, index) => {
    //       return <li key={index}>{fullName} <button onClick={()=>{this.editShooter(shooter.id)}}>Edit</button></li>;
    //     });
    // })

    const list = this.state.shooters.filter(shooter => this.state.input === '' || shooter.first_name.includes(this.state.input))
        .map((shooter, index) => <li key={index}>{shooter.first_name} {shooter.last_name}</li>);

    return (<div>
      <input value={this.state.input} type="text" onChange={this.onFilterChange}/>
        <ul>
      {list}
      </ul>
      <ViewEditShooter selectedShooter={this.state.selectedShooter} />
      </div>)
    
    

    // return (
      // 
      
      
  //  <div>
     
  // <h2>Competition Roster</h2>
  // <div>
  //   <input type="text" id="filter" placeholder="Search" value={this.state.input}
  //   onChange={this.onFilterChange} />
  // </div><div>
  // {/* <ul>{list}</ul> */}
  // {/* </div> */}
  {/* <table>
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
  </table> */}
  
  // <ViewEditShooter selectedShooter={this.state.selectedShooter}
  // />
// </div>    
// )
  }
}


export default CompetitionRoster;