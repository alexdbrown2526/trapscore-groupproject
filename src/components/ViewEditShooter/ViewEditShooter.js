import React, {Component} from 'react'
import axios from 'axios'


class ViewEditShooter extends Component {
        constructor(props){
        super(props);
        this.state = {
            firstName: '',
            
         }
     }

   

    updateUser = (id) => {
        console.log('update button working');
        axios({
            method: 'PUT',
            url: `/api/competition/shooter/${id}`,
            // data: updatedUserInfo

        })
        
    }

    handleChangeFor = propertyName => (event) => {
        this.setState({
            // ...this.state,
           firstName: event.target.value
        });

    }

    // componentDidMount(){
    //     this.setState({
    //         ...this.props.selectedShooter
    //     })
    // }


    render(){
        return(
            <div>
                <form className="form">
				<input className="textfield"
					type="text"
					name='searchText'
					value={this.props.selectedShooter.first_name}
					onChange={this.handleChangeFor('firstName')}
				 />
                 <input className="textfield"
					type="text"
					name='searchText'
					value={this.props.selectedShooter.last_name}
					onChange={this.handleChangeFor('lastName')}
				 />
                 <input className="textfield"
					type="text"
					name='searchText'
					value={this.props.selectedShooter.email}
					onChange={this.handleChangeFor('email')}
				 />
                 <input className="textfield"
					type="text"
					name='searchText'
					value={this.props.selectedShooter.phone}
					onChange={this.handleChangeFor('phone')}
				 />
                 <input className="textfield"
					type="text"
					name='searchText'
					value={this.props.selectedShooter.handicap}
					onChange={this.handleChangeFor('handicap')}
				 />
                 <input className="textfield"
					type="text"
					name='searchText'
					value={this.props.selectedShooter.ata_number}
					onChange={this.handleChangeFor('ata_number')}
				 />
                 </form>
                {/* // <ul>
                //     <li>
                //         {JSON.stringify(this.props.selectedShooter[0])}
                //         {this.props.selectedShooter.first_name}
                //     </li>
                //     <li>
                //         {this.props.selectedShooter.last_name}
                //     </li>
                //     <li>
                //         {this.props.selectedShooter.email}
                //     </li>
                //     <li>
                //         {this.props.selectedShooter.phone}
                //     </li>
                //     <li>
                //         {this.props.selectedShooter.handicap}
                //     </li>
                //     <li>
                //         {this.props.selectedShooter.ata_number}
                //     </li>
                // </ul> */}
                <button onClick={this.updateUser}>Save Changes</button>
            </div>
        )
    }
}

export default ViewEditShooter