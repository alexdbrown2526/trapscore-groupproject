import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { List, ListItem, ListItemText } from "@material-ui/core/";
import axios from "axios";
import EditCompetition from '../CompetitionAdmin/EditCompetition';

const styles = {
  userDetail: {
    padding: 24,
    width: "100%"
  },
  contestDetail: {
    paddingLeft: 24,
    width: "100%"
  },
  list: {
    width: 240
  }
};

class SelectCompetition extends Component {
  state = {
    isVisible: false,
    isLogged: false,
    isEdit: false,
    competitions: [],
    competitionToEdit: Number
  };

  componentDidMount() {
    axios({
      method: "GET",
      url: "/api/competition"
    }).then(response => {
      this.setState({
        ...this.state,
        competitions: response.data
      });
    });
  }

  handleChangeFor = propertyName => event => {
    this.setState({
      ...this.state,
      [propertyName]: event.target.value
    });
  };

  addNewCompetition = event => {
    event.preventDefault();
    
    axios({
      method: "POST",
      url: "/api/competition"
    }).then(response => {
      console.log(response.data[0].id);
      this.editCompetition(response.data[0].id);
    });
  };

  editCompetition = id => {
    console.log(id);
    this.setState({
      ...this.state,
      competitionToEdit: id,
      isVisible: !this.state.isVisible,
    });
  };

  handleLogOut = event => {
    event.preventDefault();
    this.setState({
      ...this.state,
      isLogged: !this.state.isLogged
    });
  };

  render() {
    const { classes } = this.props;
    let displayItem;
    let viewItem;
    let editItem;
    if (this.state.isVisible) {
      displayItem =   <EditCompetition edit={this.state.competitionToEdit} />
    }
    if (this.state.isLogged) {
      viewItem = this.props.history.push("/home");
    }
    if (this.state.isEdit) {
      editItem =  <EditCompetition edit={this.state.competitionToEdit} />
    }
    return (
      <div className={classes.list}>
        <h1>Select Competition</h1>

        <List>
          {this.state.competitions.map(comp => {
            return <ListItem key={comp.id} value={comp.id}>
                <button
                  onClick={() => this.editCompetition(comp.id)}
                >
                  Edit
                </button>
                {comp.name}
              </ListItem>;
          })}
        </List>

        <button onClick={this.addNewCompetition}>Add Competition</button>
        <button onClick={this.handleLogOut}>Log Out</button>
        {displayItem}
        {viewItem}
        {editItem}
      </div>
    );
  }
}

SelectCompetition.propTypes = {
  classes: PropTypes.object.isRequired
};

const Comp = withStyles(styles)(SelectCompetition);

const mapStateToProps = reduxState => ({
  reduxState
});
export default connect(mapStateToProps)(Comp);