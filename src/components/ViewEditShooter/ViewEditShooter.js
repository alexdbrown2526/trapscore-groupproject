import React, {Component} from 'react'
import axios from 'axios'


class ViewEditShooter extends Component {
    constructor(props){
        super(props);
        this.state = {
            first_name:'Joe'
        }
    }
    render(){
        return(
            <div>
                <ul>
                    <li>
                        {this.state.first_name}
                    </li>
                    <li>
                        {this.state.last_name}
                    </li>
                    <li>
                        {this.state.email}
                    </li>
                    <li>
                        {this.state.phone}
                    </li>
                    <li>
                        {this.state.handicap}
                    </li>
                    <li>
                        {this.state.ata_number}
                    </li>
                </ul>
            </div>
        )
    }
}

export default ViewEditShooter