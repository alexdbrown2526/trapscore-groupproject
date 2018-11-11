import React, {Component} from 'react'
import axios from 'axios'


class ShooterRegistration extends Component {
    constructor(props){
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            phone: Number,
            handicap: Number,
            ataNumber: Number

        }
    }

    registerShooter = (event) => {
        event.preventDefault();

        const body = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            phone: this.state.phone,
            handicap: this.state.handicap,
            ataNumber: this.state.ataNumber
        }

        axios({
            method: 'POST',
            url: '/api/competition/shooter',
            data: body
        }).then((response) => {
            this.setState({
            firstName: '',
            lastName: '',
            email: '',
            phone: Number,
            handicap: Number,
            ataNumber: Number

                
            })
                
            
        })
    }

    handleChangeFor = propertyName => (event) => {
        this.setState({
           [propertyName]: event.target.value
        });

    }

    


    render(){
        return(
            <div>
                <form onSubmit={this.registerShooter}>
            <h1>Shooter Registration</h1>
            <div>
               First Name: <input 
               type="text"
               name="firstName"
               value={this.state.firstName}
               onChange={this.handleChangeFor('firstName')} 
               />
                </div>
            <div>
                Last Name: <input
                type="text"
                name="lastName"
                value={this.state.lastName}
                onChange={this.handleChangeFor('lastName')}
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
                name="ataNumber"
                value={this.state.ataNumber}
                onChange={this.handleChangeFor('ataNumber')}
                />
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