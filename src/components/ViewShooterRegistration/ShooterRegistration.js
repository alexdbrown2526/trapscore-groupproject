import React, {Component} from 'react'
import axios from 'axios'
import Checkbox from '@material-ui/core/Checkbox'


class ShooterRegistration extends Component {
    constructor(props){
        super(props);

        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            phone: Number,
            handicap: Number,
            ata_number: Number,
            checkedSingles: false,
            checkedDoubles: false,
            checkedHandicap: false
            

        }
    }

    registerShooter = (event) => {
        event.preventDefault();

        const body = this.state;

        axios({
            method: 'POST',
            url: '/api/competition/shooter',
            data: body
        }).then((response) => {
            this.setState({
            first_name: '',
            last_name: '',
            email: '',
            phone: Number,
            handicap: Number,
            ata_number: Number,
            checkedSingles: false,
            checkedDoubles: false,
            checkedHandicap: false
            })
                
            
        })
    }

    handleChangeFor = propertyName => (event) => {
        this.setState({
            ...this.state,
           [propertyName]: event.target.value
        });
    }

    handleChangeCheckBox = propertyName => (event) => {
        this.setState({
            ...this.state,
            [propertyName]: event.target.checked
        
        })
    }

    


    render(){
        return(
            <div>
                <form onSubmit={this.registerShooter}>
            <h1>Shooter Registration</h1>
            <div>
               First Name: <input 
               type="text"
               name="first_name"
               value={this.state.first_name}
               onChange={this.handleChangeFor('first_name')} 
               />
                </div>
            <div>
                Last Name: <input
                type="text"
                name="last_name"
                value={this.state.last_name}
                onChange={this.handleChangeFor('last_name')}
                />
            </div>
            <div>
                E-mail: <input
                type="text"
                name="email"
                value={this.state.email}
                onChange={this.handleChangeFor('email')}
                />
            </div>
            <div>
                Phone: <input
                type="number"
                name="phone"
                value={this.state.phone}
                onChange={this.handleChangeFor('phone')}
                />
            </div>
            <div>
                Handicap (yds): <input
                type="number"
                name="handicap"
                value={this.state.handicap}
                onChange={this.handleChangeFor('handicap')}
                />
            </div>
            <div>
                ATA #: <input
                type="number"
                name="ata_number"
                value={this.state.ata_number}
                onChange={this.handleChangeFor('ata_number')}
                />
            </div>
            <div>
                <ul>
                    <li>
                        Singles
                        <Checkbox
                        value="checkedSingles"
                        checked={this.state.checkedSingles}
                        onChange={this.handleChangeCheckBox('checkedSingles')} />
                    </li>
                    <li>
                        Doubles
                        <Checkbox
                        value="checkedDoubles"
                        checked={this.state.checkedDoubles}
                        onChange={this.handleChangeCheckBox('checkedDoubles')} />
                    </li>
                    <li>
                        Handicap
                        <Checkbox
                        value="checkedHandicap"
                        checked={this.state.checkedHandicap}
                        onChange={this.handleChangeCheckBox('checkedHandicap')} />
                    </li>
                </ul>
            </div>
            <div>
            <input
              type="submit"
              name="submit"
              value="Register"
            />
          </div>
            </form>



            </div>
        )
    }
}



export default ShooterRegistration;