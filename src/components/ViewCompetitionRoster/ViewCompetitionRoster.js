import React, { Component } from 'react';
import axios from 'axios';
import ViewEditShooter from '../ViewEditShooter/ViewEditShooter'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import SettingsIcon from'@material-ui/icons/Settings';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
import Avatar from '@material-ui/core/Avatar'
// import classes from '*.module.scss';


const styles = theme => ({  

  roster: {
    // backgroundColor: 'red',
    width: '30%',
    minWidth: 100,
    height: '61vh',
    overflowY: 'scroll',
    float: 'left',
    marginLeft: '20%',
    marginTop: '4%',
    borderStyle: 'solid',
    padding: '20px',
    fontFamily: 'Roboto, sans-serif'

  },
  
  searchField: {
    height: '5vh',
    fontFamily: 'Roboto, sans-serif'

  },
 
  
});

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
    const { classes } = this.props;

    const list = this.state.shooters.filter(shooter => this.state.input.toUpperCase() === '' || shooter.last_name.toUpperCase().includes(this.state.input.toUpperCase()) || shooter.first_name.toUpperCase().includes(this.state.input.toUpperCase()))
        .map((shooter, index) => <ListItem  key={index}>{shooter.first_name} {shooter.last_name} <IconButton  onClick={()=>{this.editShooter(shooter.id)}}><SettingsIcon></SettingsIcon></IconButton></ListItem>);

    return (<div className={classes.root}> 
      <div className={classes.editForm}>
            <ViewEditShooter selectedShooter={this.state.selectedShooter} />
            </div>
            <div className={classes.roster}>

      <TextField className={classes.searchField} variant="outlined" placeholder="Search by name"
       value={this.state.input} type="text" onChange={this.onFilterChange}/>
   
        <List>
          Competition Roster
      {list}
      </List>
      </div>
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


export default withStyles(styles) (CompetitionRoster);